import React from 'react'
import { JsonView, defaultStyles } from 'react-json-view-lite';

const aIResults = ({aiOutput}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <span className="bg-green-100 p-2 rounded-full mr-3">
        ✨
      </span>
      AI Analysis Results
    </h3>
    
    <div className="bg-gray-50 border rounded-lg p-4 mb-4 max-h-96 overflow-auto">
      <JsonView
        data={aiOutput}
        style={defaultStyles}
        shouldExpandNode={(level) => level < 1}
      />
    </div>

    <div className="flex flex-col sm:flex-row gap-3">
      <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
        <span className="mr-2">👍</span>
        Helpful
      </button>
      <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
        <span className="mr-2">👎</span>
        Not Helpful
      </button>
    </div>
  </div>
  )
}

export default aIResults
