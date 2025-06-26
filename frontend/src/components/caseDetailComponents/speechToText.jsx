import React, { useRef, useState } from "react";

const SpeechInput = ({ onResult }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map(result => result[0].transcript)
        .join("");
      setTranscript(text);
    };

    recognition.onend = () => {
      setListening(false);
      if (transcript.trim()) onResult(transcript);
    };

    recognition.onerror = (event) => {
      alert("Speech recognition error: " + event.error);
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setTranscript(""); // Clear transcript on new listen
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={transcript}
        placeholder="Speak your command"
        readOnly
        className="border px-3 py-2 flex-1"
      />
      <button
        type="button"
        onClick={startListening}
        disabled={listening}
        className="bg-blue-500 text-white px-3 py-2 rounded"
        title="Start Listening"
      >
        🎤
      </button>
      <button
        type="button"
        onClick={stopListening}
        disabled={!listening}
        className="bg-gray-300 px-3 py-2 rounded"
        title="Stop Listening"
      >
        ⏹️
      </button>
      {listening && <span className="text-green-600 ml-2">Listening...</span>}
    </div>
  );
};

export default SpeechInput;
