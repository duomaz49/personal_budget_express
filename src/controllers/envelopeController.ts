import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Envelope } from '../entities/Envelope';

const envelopeRepository = AppDataSource.getRepository(Envelope);

export const getAllEnvelopes = async (req: Request, res: Response): Promise<void> => {
    try {
        const envelopes = await envelopeRepository.find();
        res.json(envelopes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch envelopes', error });
    }
};

export const getEnvelopeById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const envelope = await envelopeRepository.findOneBy({ id: parseInt(id) });

        if (!envelope) {
            res.status(404).json({ message: "Envelope not found" });
            return;
        }

        res.json(envelope);

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch envelope', error });
    }
};

export const createEnvelope = async (req: Request, res: Response): Promise<void> => {
    const { name, balance, limit } = req.body;

    if (!name || balance === undefined || limit === undefined) {
        res.status(400).json({ message: "Name, balance, and limit are required" });
        return;
    }

    try {
        const newEnvelope = envelopeRepository.create({
            name,
            balance,
            limit
        });

        await envelopeRepository.save(newEnvelope);
        res.status(201).json(newEnvelope);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create envelope', error });
    }
};

export const updateEnvelope = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { balance, limit } = req.body;

    try {
        const envelope = await envelopeRepository.findOneBy({ id: parseInt(id) });

        if (!envelope) {
            res.status(404).json({ message: "Envelope not found" });
            return;
        }

        if (balance !== undefined) envelope.balance = balance;
        if (limit !== undefined) envelope.limit = limit;

        await envelopeRepository.save(envelope);
        res.json(envelope);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update envelope', error });
    }
};

export const transferMoneyFromEnvelope = async (req: Request, res: Response): Promise<void> => {
    const { fromId, toId, amount } = req.body;

    if(!fromId || !toId || amount === undefined || amount <= 0){
        res.status(400).json({ message: "fromId, toId, and a positive amount are required" });
        return
    }

    const parsedFromId = parseInt(fromId, 10);
    const parsedToId = parseInt(toId, 10);
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedFromId) || isNaN(parsedToId) || isNaN(parsedAmount)) {
        res.status(400).json({ message: "Invalid input parameters" });
        return;
    }

    try {
        const fromEnvelope = await envelopeRepository.findOneBy({ id: parsedFromId });
        const toEnvelope = await envelopeRepository.findOneBy({ id: parsedToId });

        if (!fromEnvelope) {
            res.status(404).json({ message: "Source envelope not found" });
            return;
        }

        if (!toEnvelope) {
            res.status(404).json({ message: "Target envelope not found" });
            return;
        }

        if(fromEnvelope.balance < parsedAmount){
            res.status(400).json({ message: "Insufficient funds in the source envelope" });
            return;
        }

        fromEnvelope.balance -= parsedAmount;
        toEnvelope.balance += parsedAmount;

        await envelopeRepository.save([fromEnvelope, toEnvelope]);

        res.status(200).json({
            message: "Transfer successful",
            fromEnvelope: { id: fromEnvelope.id, balance: fromEnvelope.balance },
            toEnvelope: { id: toEnvelope.id, balance: toEnvelope.balance },
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to transfer money", error });
    }
};

export const deleteEnvelope = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const envelope = await envelopeRepository.findOneBy({ id: parseInt(id) });

        if (!envelope) {
            res.status(404).json({ message: "Envelope not found" });
            return;
        }

        await envelopeRepository.remove(envelope);
        res.status(204).send(); // Correct status code for successful deletion with no content
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete envelope', error });
    }
};