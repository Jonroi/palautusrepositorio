import express from 'express';
import diagnoseService from '../service/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
  console.log('fetching diagnoses');
});

export default router;
