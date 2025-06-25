import React, { useState } from "react";

const patientInfoCard = ({ caseData, summary, setSummary, onSaveSummary }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary || caseData?.summary || '');

  const handleSave = () => {
    setSummary(editedSummary);
    onSaveSummary(editedSummary);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSummary(summary || caseData?.summary || '');
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-[#754579]">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="bg-purple-100 p-2 rounded-full mr-3">
          👤
        </span>
        Patient Information
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Patient ID</label>
          <p className="text-gray-800 font-semibold">{caseData?.patientId}</p>
        </div>
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-600">Case Summary</label>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center cursor-pointer"
              >
                <span className="mr-1">✏️</span>
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          
          {!isEditing ? (
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded">
              {summary || caseData?.summary || 'No summary available'}
            </p>
          ) : (
            <textarea
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 min-h-[120px] focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Enter case summary..."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default patientInfoCard
