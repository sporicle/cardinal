import React, { useState } from 'react';
import './App.css';

function App() {
  const [view, setView] = useState(1);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [result, setResult] = useState('');

  const generate = () => {
    // Perform any action you want when the "generate" button is clicked
    // Here, we'll just set the result state with a sample value
    setResult('Generated result goes here');
  };

  return (
    <div className="terminal-container">
      <div className="tabs">
        <div className={`tab ${view === 1 ? 'active' : ''}`} onClick={() => setView(1)}>View 1</div>
        <div className={`tab ${view === 2 ? 'active' : ''}`} onClick={() => setView(2)}>View 2</div>
      </div>

      <div className="view-container">
        <div className="view">
          <div className={`view-content ${view === 1 ? 'active' : ''}`}>
            <div className="input-container">
              <label>Text 1:</label>
              <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
            </div>
            <div className="input-container">
              <label>Text 2:</label>
              <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
            </div>
            <div className="input-container">
              <label>Text 3:</label>
              <input type="text" value={input3} onChange={(e) => setInput3(e.target.value)} />
            </div>
            <button onClick={generate}>Generate</button>
          </div>
          <div className={`view-content ${view === 2 ? 'active' : ''}`}>
            <div className="input-container">
              <label>Text 1:</label>
              <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
            </div>
            <div className="input-container">
              <label>Text 2:</label>
              <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
            </div>
            <div className="input-container">
              <label>Text 3:</label>
              <input type="text" value={input3} onChange={(e) => setInput3(e.target.value)} />
            </div>
            <button onClick={generate}>Generate</button>
          </div>
        </div>
      </div>

      <div className="result-container">
        <label>Result:</label>
        <textarea value={result} readOnly />
      </div>
    </div>
  );
}

export default App;
