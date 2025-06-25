const fs = require('fs');
const Case = require('../models/case');
const File = require('../models/file');

// Create a new patient case
exports.createCase = async (req, res) => {
    try {
    const { patientId, summary } = req.body;
    const userId = req.user.id;
    const files = req.files || []; // Get uploaded files

    // Find existing case
    let existingCase = await Case.findOne({ user: userId, patientId });

    if (existingCase) {
      // Update existing case
      existingCase.summary = summary;
      await existingCase.save();
      
      // Add new files to existing case
      const newFiles = await processFiles(files, existingCase._id, userId);
      existingCase.files.push(...newFiles);
      await existingCase.save();

      return res.status(200).json({
        message: 'Patient case updated with files',
        case: existingCase
      });
    } else {
      // Create new case
      const newCase = new Case({
        user: userId,
        patientId,
        summary,
        files: []
      });
      
      // Add files to new case
      const newFiles = await processFiles(files, newCase._id, userId);
      newCase.files = newFiles;
      
      await newCase.save();
      return res.status(201).json({
        message: 'New patient case created with files',
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
        const caseId = req.params.caseId;

        const patientCase = await Case.findOne({ _id: caseId, user: userId }).populate('files');
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

  // Helper function to process uploaded files
  const processFiles= async(files, caseId, userId)=> {
    const fileDocuments = [];
    
    for (const file of files) {
      const newFile = new File({
        case: caseId,
        user: userId,
        type: file.mimetype.startsWith('image') ? 'image' : 'lab', // Detect file type
        path: file.path,
        originalName: file.originalname
      });
      
      await newFile.save();
      fileDocuments.push(newFile._id);
    }
    
    return fileDocuments;
  }
  exports.uploadFile = async (req, res) => {
    try {
      const userId = req.user.id;
      const caseId = req.params.caseId;
      const files = req.files || [];
      
      // Verify case exists and belongs to user
      const existingCase = await Case.findOne({ _id: caseId, user: userId });
      if (!existingCase) {
        return res.status(404).json({ message: 'Case not found or unauthorized' });
      }
      
      // Process and add files
      const newFiles = await processFiles(files, caseId, userId);
      existingCase.files.push(...newFiles);
      await existingCase.save();
      
      res.status(201).json({
        message: 'Files added to case successfully',
        case: existingCase
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

// controllers/fileController.js
exports.deleteFile = async (req, res) => {
  try {
    const { caseId, fileId } = req.params;
    const userId = req.user.id;

    // Find the file
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ message: 'File not found' });

    // Remove file reference from case
    await Case.findByIdAndUpdate(caseId, { $pull: { files: fileId } });

    // Delete the file from disk
    fs.unlink(file.path, (err) => {
      if (err) console.error('File deletion error:', err); // Log but continue
    });

    // Remove file document from DB
    await File.findByIdAndDelete(fileId);

    res.json({ message: 'File deleted successfully', fileId });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting file', error: err.message });
  }
};

