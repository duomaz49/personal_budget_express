import { Router } from 'express';
import { getAllEnvelopes, getEnvelopeById, createEnvelope, updateEnvelope, transferMoneyFromEnvelope,  deleteEnvelope } from '../controllers/envelopeController';

const router = Router();

router.get('/', getAllEnvelopes);
router.get('/:id', getEnvelopeById);
router.post('/', createEnvelope);
router.post('/transfer', transferMoneyFromEnvelope)
router.put('/:id', updateEnvelope);
router.delete('/:id', deleteEnvelope);

export default router;