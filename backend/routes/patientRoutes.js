const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const patientController = require('../controllers/patientController');
const upload = require('../middleware/upload');

// Patient case CRUD
router.post('/case', auth, upload.array('files'), patientController.createCase);
router.get('/cases', auth, patientController.getCases);
router.get('/case/:caseId', auth, patientController.getPatientDetails);

// Update summary of a patient case
router.put('/case/:caseId/summary', auth, patientController.updateCaseSummary);

router.delete('/case/:caseId/files/:fileId', auth, patientController.deleteFile);

// File upload for a case
router.post('/case/:caseId/files', auth, upload.any('files'), patientController.uploadFile);

module.exports = router;
