import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [resume, setResume] = useState({
    name: "John Doe",
    summary: "Experienced developer...",
    experience: "Worked at XYZ...",
    education: "B.Tech in CSE",
    skills: "Python, React"
  });

  const enhance = async (section) => {
    const res = await axios.post('http://localhost:8000/ai-enhance', {
      section,
      content: resume[section]
    });
    setResume({ ...resume, [section]: res.data.enhanced });
  };

  const saveResume = async () => {
    await axios.post('http://localhost:8000/save-resume', {
      resume
    });
    alert('Saved!');
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.json';
    link.click();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Editor</h1>
      {Object.entries(resume).map(([key, value]) => (
        <div key={key} className="mb-4">
          <label className="block font-semibold capitalize">{key}</label>
          <textarea
            className="w-full border p-2"
            value={value}
            onChange={(e) => setResume({ ...resume, [key]: e.target.value })}
          />
          <button
            onClick={() => enhance(key)}
            className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
          >Enhance with AI</button>
        </div>
      ))}
      <button onClick={saveResume} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save Resume</button>
      <button onClick={downloadJSON} className="bg-gray-500 text-white px-4 py-2 rounded">Download JSON</button>
    </div>
  );
}
