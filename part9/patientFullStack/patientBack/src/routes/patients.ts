import express from 'express';
import patientService from '../service/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
  console.log('fetching patients');
});

export default router;
