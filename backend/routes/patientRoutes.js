const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const patientController = require('../controllers/patientController');
const upload = require('../middleware/upload');

// Patient case CRUD
router.post('/case', auth, patientController.createCase);
router.get('/cases', auth, patientController.getCases);
router.get('/case/:patientId', auth, patientController.getPatientDetails);
// router.get('/patient-ids', auth, patientController.getAllPatientIds);

// File upload for a case
router.post('/case/:caseId/files', auth, upload.single('file'), patientController.uploadFile);

module.exports = router;
