import React from 'react'

const errorAlert = ({ error }) => (
  error && (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
      <div className="flex items-center">
        <span className="text-red-500 mr-2">⚠️</span>
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    </div>
  )
);

export default errorAlert
