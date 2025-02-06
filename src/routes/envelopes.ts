import { Router } from 'express';
import { getAllEnvelopes, getEnvelopeById, createEnvelope, updateEnvelope, deleteEnvelope } from '../controllers/envelopeController';

const router = Router();

router.get('/', getAllEnvelopes);
router.get('/:id', getEnvelopeById);
router.post('/', createEnvelope);
router.put('/:id', updateEnvelope);
router.delete('/:id', deleteEnvelope);

export default router;