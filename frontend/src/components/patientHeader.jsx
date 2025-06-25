import React from 'react'

const patientHeader = ({ caseData }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-lg shadow-lg mb-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2">Patient Case Details</h1>
        <p className="text-purple-100">Comprehensive medical case management</p>
      </div>
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
        <div className="text-right">
          <p className="text-sm text-purple-100">Patient ID</p>
          <p className="text-xl font-semibold">{caseData?.patientId || 'Loading...'}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default patientHeader
