const Case = require('../models/case');
const File = require('../models/file');

// Create a new patient case
exports.createCase = async (req, res) => {
    try {
        const { patientId, summary } = req.body;
        const userId = req.user.id;

        //if a case with the same patientId already exists for this user
        let existingCase = await Case.findOne({ user: userId, patientId });

        if (existingCase) {
            // Update the existing case summary
            existingCase.summary = summary;
            await existingCase.save();
            return res.status(200).json({
                message: 'Patient case updated',
                case: existingCase
            });
        } else {
            // Create a new case
            const newCase = new Case({
                user: userId,
                patientId,
                summary,
                files: []
            });
            await newCase.save();
            return res.status(201).json({
                message: 'New patient case created',
                case: newCase
            });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get all cases for the logged-in user
exports.getCases = async (req, res) => {
    try {
        const userId = req.user.id; // Fixed: was req.user.userId
        const cases = await Case.find({ user: userId }).populate('files'); // Fixed: was Case.find({})
        res.json({
            message: 'All cases retrieved successfully',
            cases: cases,
            count: cases.length
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get one patient details by patientId for the logged-in user
exports.getPatientDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const { patientId } = req.params;

        const patientCase = await Case.findOne({ user: userId, patientId }).populate('files');
        if (!patientCase) {
            return res.status(404).json({ message: 'Patient case not found' });
        }
        res.json({
            message: 'Patient details retrieved successfully',
            patient: patientCase
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.uploadFile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware
    const caseId = req.params.caseId; // from route parameter
    const { type } = req.body; // e.g., 'lab', 'image'
    const fileData = req.file; // from multer

    // 1. Check file presence
    if (!fileData) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // 2. Check that the case exists and belongs to the logged-in user
    const foundCase = await Case.findOne({ _id: caseId, user: userId });
    if (!foundCase) {
      return res.status(404).json({ message: 'Case not found or unauthorized' });
    }

    // 3. Create File record in DB
    const newFile = new File({
      case: caseId,
      user: userId,
      type: type || 'other',
      path: fileData.path,
      originalName: fileData.originalname
    });
    await newFile.save();

    // 4. Add file reference to the case's files array
    foundCase.files.push(newFile._id);
    await foundCase.save();

    // 5. Respond with success and file info
    res.status(201).json({
      message: 'File uploaded successfully',
      file: newFile
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};