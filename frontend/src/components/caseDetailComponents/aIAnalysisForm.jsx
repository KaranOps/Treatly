import React from 'react'
import SpeechInput from './speechToText';


const aIAnalysisForm = ({
  command,
  setCommand,
  handleSubmit
}) => (
  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-md p-6 mb-6 border border-purple-200 ">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center ">
      <span className="bg-indigo-100 p-2 rounded-full mr-3">
        🤖
      </span>
      AI Analysis Request
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          AI Command / Prompt (type or speak)
        </label>
        <input
          type="text"
          placeholder="e.g., 'Analyze the latest lab results and provide diagnosis recommendations'"
          value={command}
          onChange={e => setCommand(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <SpeechInput onResult={setCommand} />
        <p className="text-sm text-gray-500 mt-2">
          💡 AI will automatically use the case summary and all uploaded files for analysis
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#754579] to-[#b169b8] hover:from-[#522457] hover:to-[#7e4383] text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] cursor-pointer shadow-lg"
      >
        🔍 Process with AI
      </button>
    </form>
  </div>
);
export default aIAnalysisForm
