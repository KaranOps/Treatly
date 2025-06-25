import React from 'react'

const fileManagement = ({ files, handleFileUpload, handleFileChange, handleDeleteFile, baseURL }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <span className="bg-blue-100 p-2 rounded-full mr-3">
        📁
      </span>
      Medical Files
    </h3>
    
    {/* File List */}
    <div className="mb-6">
      {files.length > 0 ? (
        <div className="grid gap-3">
          {files.map((file) => (
            <div key={file._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📄</span>
                <a
                  href={`${baseURL}/${file.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  {file.originalName}
                </a>
              </div>
              <button
                onClick={(e) => handleDeleteFile(file._id, e)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer transition-colors"
                title="Delete file"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No files uploaded yet</p>
      )}
    </div>

    {/* Upload Form */}
    <form onSubmit={handleFileUpload} className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#754579] transition-colors">
      <div className="text-center">
        <span className="text-4xl mb-4 block">📤</span>
        <h4 className="text-lg font-medium text-gray-700 mb-2">Upload New File</h4>
        <p className="text-gray-500 mb-4">Add medical documents, reports, or images</p>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center ">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          <button
            type="submit"
            className="bg-[#754579] hover:bg-[#3f2441] text-white px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors whitespace-nowrap"
          >
            Add to Case
          </button>
        </div>
      </div>
    </form>
  </div>
  )
}

export default fileManagement
