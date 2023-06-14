import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import './App.css';

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function App() {
  const [view, setView] = useState(1);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [inputB1, setInputB1] = useState('');
  const [inputB2, setInputB2] = useState('');
  const [inputB3, setInputB3] = useState('');
  const [result, setResult] = useState('');

  const generateQuest = async () => {
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "respond with hello world",
        temperature: 0.6,
      });
      var result = completion.data.choices[0].text;
      setResult(result);
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
    }

    // function generatePrompt(animal) {
    //   const capitalizedAnimal =
    //     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    //   return `Suggest three names for an animal that is a superhero.

    // Animal: Cat
    // Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
    // Animal: Dog
    // Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
    // Animal: ${capitalizedAnimal}
    // Names:`;
    // }
  };

  const mintNFT = () => {
    // Perform any action you want when the "generate" button is clicked
    // Here, we'll just set the result state with a sample value
    setResult('Generated result goes here');
  };

  return (
    <div className="terminal-container">
      <div className="tabs">
        <div className={`tab ${view === 1 ? 'active' : ''}`} onClick={() => setView(1)}>Generate Quest</div>
        <div className={`tab ${view === 2 ? 'active' : ''}`} onClick={() => setView(2)}>Mint Item</div>
      </div>

      <div className="view-container">
        <div className="view">
          <div className={`view-content ${view === 1 ? 'active' : ''}`}>
            <div className="input-container">
              <label>Setting:</label>
              <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
            </div>
            <div className="input-container">
              <label>Background:</label>
              <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
            </div>
            <div className="input-container">
              <label>Difficulty:</label>
              <select value={input3} onChange={(e) => setInput3(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="epic">Epic</option>
              </select>
            </div>
            <button onClick={generateQuest}>Generate Quest</button>
          </div>
          <div className={`view-content ${view === 2 ? 'active' : ''}`}>
            <div className="input-container">
              <label>Text 1:</label>
              <input type="text" value={inputB1} onChange={(e) => setInputB1(e.target.value)} />
            </div>
            <div className="input-container">
              <label>Text 2:</label>
              <input type="text" value={inputB2} onChange={(e) => setInputB2(e.target.value)} />
            </div>
            <div className="input-container">
              <label>Text 3:</label>
              <input type="text" value={inputB3} onChange={(e) => setInputB3(e.target.value)} />
            </div>
            <button onClick={mintNFT}>Mint NFT</button>
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
