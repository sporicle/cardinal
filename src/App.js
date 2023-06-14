import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import './App.css';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
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
      console.log(process.env.REACT_APP_OPENAI_KEY);

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

    function generateQuestPrompt(world_setting, quest_giver, difficulty) {
      var example_quest = `{
        "quest_name": "Clear the Slimes",
          "quest_difficulty": "Easy",
            "quest_description": "A pack of slimes has been spotted on the east side of the island. Kill 20 of them and bring back the slime droplets.",
              "quest_reward": {
          "item": {
            "name": "Slime Charm",
              "description": "A small charm shaped in the form of a blue slime creature.",
                "effect": "This charm increases exp gained from killing slimes by 10%",
                  "stats": {
              "str": "0",
                "dex": "0",
                  "luk": "0",
                    "int": "0"
            }
          },
          "resource": {
            "gold": "500"
          }
        }
      }`

      var example_quest2 = `{
        "quest_name": "Revenge of the Lich King",
        "quest_difficulty": "Epic",
        "quest_description": "The Lich King has raised his armies of undead skeletons. Defeat the skeleton guards and battle the lich king.",
        "quest_reward": {
          "item": {
            "name": "Staff of the Lich King",
            "description": "A staff imbued with dark energy. There is a skull at the top of the staff. You occasionally see souls escaping from the staff.",
            "effect": "[Raise Undead] : When you battle, you summon two skeleton minions to join the fray.",
            "stats": {
              "str": "10",
              "dex": "10",
              "luk": "10",
              "int": "30"
            }
          },
          "resource": {
            "gold": "10000"
          }
        }
      }`

      return "Generate a quest being given by a " + quest_giver + ". The setting of the world we are in is " + world_setting + ". The difficulty of the quest should be " + difficulty + ". Generate it in exactly the format of these example quests:"+example_quest+","+example_quest2;
    }
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
              <label>World Setting:</label>
              <textarea className="input-textarea" type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
            </div>
            <div className="input-container">
              <label>Quest Giver:</label>
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
        <textarea className="result-textarea" value={result} readOnly />
      </div>
    </div>
  );
}

export default App;
