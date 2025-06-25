import React from 'react';
import { JsonView, defaultStyles } from 'react-json-view-lite';
import jsPDF from 'jspdf';

const aIResults = ({ aiOutput }) => {

  const handlePDFExport = () => {
  const doc = new jsPDF();
  const jsonString = JSON.stringify(aiOutput, null, 2);
  
  // Add title
  doc.setFontSize(16);
  doc.text('AI Analysis Results', 20, 20);
  
  // Add content 
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(jsonString, 170);
  doc.text(lines, 20, 40);
  
  // Save the PDF
  doc.save('ai-analysis-results.pdf');
};
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
        <span className="bg-purple-100 p-2 rounded-full mr-3">
          ✨
        </span>
        AI Analysis Results
      </h3>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4 max-h-96 overflow-auto">
        <JsonView
          data={aiOutput}
          style={{
            ...defaultStyles,
            container: 'bg-purple-50 font-mono text-sm',
            basicChildStyle: 'padding-left: 1rem',
            label: 'color: #7c3aed; font-weight: bold',
            clickableLabel: 'color: #7c3aed; font-weight: bold; cursor: pointer',
            valueText: 'color: #374151',
            undefinedValue: 'color: #9ca3af',
            nullValue: 'color: #9ca3af',
            booleanValue: 'color: #059669',
            stringValue: 'color: #dc2626',
            numberValue: 'color: #ea580c'
          }}
          shouldExpandNode={(level) => level < 2}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex items-center justify-center bg-green-500 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          <span className="mr-2">👍</span>
          Helpful
        </button>
        <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
          <span className="mr-2">👎</span>
          Not Helpful
        </button>
        <button
          onClick={handlePDFExport}
          className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <span className="mr-2">📄</span>
          Export 
        </button>
      </div>
    </div>
  );
};

export default aIResults;