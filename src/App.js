import React, { useState, useRef } from 'react';
import { Configuration, OpenAIApi } from "openai";
import './App.css';
import ItemDisplay from './ItemDisplay';

const fetch = require('node-fetch');
const url = 'https://staging.crossmint.com/api/2022-06-09/collections/default/nfts';

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
  // const [inputB2, setInputB2] = useState('');
  const [result, setResult] = useState('');
  const [gamePrompt, setGamePrompt] = useState('');
  const [item, setItem] = useState({
    stats: {
      str: 50,
      int: 30,
      dex: 70,
      luk: 70
    },
    imageUrl: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-KL167vRDR4p4y6paRrRHjfZi/user-zNpImCrHyEn2EWP9swoWU8qf/img-ah8BE6aVqbDrpvMtP0wzs5ZG.png?st=2023-06-14T08%3A42%3A42Z&se=2023-06-14T10%3A42%3A42Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-13T20%3A37%3A20Z&ske=2023-06-14T20%3A37%3A20Z&sks=b&skv=2021-08-06&sig=bt%2BJ4D2OHYzzAzpo4r3hR59CSINqNsPXkk/7rhRH1j0%3D',
    name: 'Item Name',
    description: 'Item Description',
    effect: 'Item Effect'
  });

  const textareaRef = useRef(null);

  const handleCopyClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
    }
  };

  const fillDemo = () => {
    setInput1("A world of magic and monsters. You are in the town of Aldrin, a small mining town on the northern outskirts of the kingdom of Norway. There is a mountain range to the north, and swamplands to the south.");
    setInput2("A bartender at the Cat's Eye, a popular pub among adventurers.");
    setInput3("hard");
    setResult(`{
      "quest_name": "The Dragon's Hoard",
      "quest_difficulty": "Hard",
      "quest_description": "The Cat's Eye has been hearing rumors of a dragon in the nearby mountains. It is said to have a hoard of gold and jewels. Find the dragon and slay it to bring back its hoard.",
      "quest_steps": {
        "1": "Find the dragon's mountain lair",
        "2": "Defeat the dragon",
        "3": "Collect the dragon's hoard"
      },
      "quest_reward": {
        "item": {
          "name": "Dragon's Scale",
          "description": "A scale from a dragon. It looks like it was taken from the dragon's back.",
          "effect": "This scale grants you the ability to breathe fire.",
          "stats": {
            "str": "20",
            "dex": "20",
            "luk": "20",
            "int": "20"
          }
        },
        "resource": {
          "gold": "5000"
        }
      }
    }`);
  }

  const generateGamePrompt = () => {
    // const questJson = JSON.parse(result);

    var prompt = "";
    prompt += "You are a dungeon master, controlling a single player campaign. Based on the following quest, create a story that I can play through as a text based game. You should end all results with a situation and a question of what I want to do. No matter what I respond, guide the story such that it fits the quest steps. You should not rehash the steps of the quest to me or tell me the steps of the quest or what step of the quest I am on. If I successfully complete the quest, you should send a single message that only says \"[QUEST SUCCESS]\", otherwise if I fail send \"[QUEST FAIL]\". The setting is: "
    prompt += input1;
    prompt += "The person giving you the prompt is: ";
    prompt += input2;
    prompt += "Base the quest on the following description: ";
    prompt += result;

    setGamePrompt(prompt);
  }

  const generateQuest = async () => {
    try {
      // console.log(generateQuestPrompt(input1,input2,input3));

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generateQuestPrompt(input1, input2, input3),
        // prompt:"respond hi",
        temperature: 0.6,
        max_tokens: 1000,
      });
      var result = completion.data.choices[0].text;
      // var result =       `{
      //   "quest_name": "The Lost Book",
      //   "quest_difficulty": "Easy",
      //   "quest_description": "A wizard has lost his spellbook. Find and return the spellbook to him.",
      //   "quest_reward": {
      //     "item": {
      //       "name": "Arcane Tome",
      //       "description": "A thick book filled with arcane symbols and magical formulae.",
      //       "effect": "Increase spellcasting power by 10%",
      //       "stats": {
      //         "str": "0",
      //         "dex": "0",
      //         "luk": "0",
      //         "int": "10"
      //       }
      //     },
      //     "resource": {
      //       "gold": "500"
      //     }
      //   }
      // }`
      // var result = generateQuestPrompt(input1, input2, input3);
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
        "quest_steps": {
          "1": "Kill 20 slimes",
          "2": "Collect 20 slime droplets"
        },
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
        "quest_steps": {
          "1": "Find and enter the Lich King's Tomb",
          "2": "Defeat 10 Guard Skeletons",
          "3": "Solve the Lich King's puzzle",
          "4": "Defeat the Lich King"
        },
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

      return "Generate a quest being given by a " + quest_giver + ". The setting of the world we are in is " + world_setting + ". The difficulty of the quest should be " + difficulty + ". Make it relevant to the person giving the quest. Generate it in exactly the format of these example quests:" + example_quest + "," + example_quest2 + " ";
    }
  };

  const genNFT = async () => {
    const item_json = JSON.parse(result).quest_reward;

    // const response = await openai.createImage({
    //   prompt: item_json.item.description+", pixel art, in a cute style, show only the item and nothing else",
    //   n: 1,
    //   size: "256x256",
    // });
    // var image_url = response.data.data[0].url;
    var image_url = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-KL167vRDR4p4y6paRrRHjfZi/user-zNpImCrHyEn2EWP9swoWU8qf/img-ah8BE6aVqbDrpvMtP0wzs5ZG.png?st=2023-06-14T08%3A42%3A42Z&se=2023-06-14T10%3A42%3A42Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-13T20%3A37%3A20Z&ske=2023-06-14T20%3A37%3A20Z&sks=b&skv=2021-08-06&sig=bt%2BJ4D2OHYzzAzpo4r3hR59CSINqNsPXkk/7rhRH1j0%3D"

    setItem({
      stats: {
        str: parseInt(item_json.item.stats.str),
        int: parseInt(item_json.item.stats.int),
        dex: parseInt(item_json.item.stats.dex),
        luk: parseInt(item_json.item.stats.luk)
      },
      imageUrl: image_url,
      name: item_json.item.name,
      description: item_json.item.description,
      effect: item_json.item.effect
    });
  };

  const genNFTWithImage = async () => {
    // const item_json = JSON.parse(inputB2);
    const item_json = JSON.parse(result).quest_reward;

    const response = await openai.createImage({
      prompt: item_json.item.description + ", pixel art, in a cute style, show only the item and nothing else",
      n: 1,
      size: "256x256",
    });
    var image_url = response.data.data[0].url;

    setItem({
      stats: {
        str: parseInt(item_json.item.stats.str),
        int: parseInt(item_json.item.stats.int),
        dex: parseInt(item_json.item.stats.dex),
        luk: parseInt(item_json.item.stats.luk)
      },
      imageUrl: image_url,
      name: item_json.item.name,
      description: item_json.item.description,
      effect: item_json.item.effect
    });
  };

  const mintNFT = async () => {
    //mint
    const item_json = JSON.parse(result).quest_reward;

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-client-secret': 'sk_test.0ukqkSQy.Rd1CIq9uSChQqoeVg2BD2VroUg5SwQjk',
        'x-project-id': '1e53e134-5089-43b5-a811-b73781d1e4cb'
      },
      body: JSON.stringify({
        recipient: 'solana:' + inputB1, // FWMkWWVvSz7cVkhovkVHL59TDPtX78X23bA4frTbjkCA
        metadata: {
          name: item_json.item.name,
          image: item.imageUrl,
          description: item_json.item.description + " " + item_json.item.effect,
          attributes: [
            { trait_type: 'str', value: item_json.item.stats.str },
            { trait_type: 'int', value: item_json.item.stats.int },
            { trait_type: 'dex', value: item_json.item.stats.dex },
            { trait_type: 'luk', value: item_json.item.stats.luk },]
        }
      })
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
  };


  return (
    <div className="terminal-container">
      <div className="tabs">
        <div className={`tab ${view === 1 ? 'active' : ''}`} onClick={() => setView(1)}>Generate Quest</div>
        <div className={`tab ${view === 3 ? 'active' : ''}`} onClick={() => setView(3)}>Play Quest</div>
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
              <textarea className="input-textarea" type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
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
            <button onClick={fillDemo}>Fill Demo</button>
          </div>
          <div className={`view-content ${view === 2 ? 'active' : ''}`}>
            <div className="input-container">
              <label>Target Wallet:</label>
              <textarea className="input-textarea" type="text" value={inputB1} onChange={(e) => setInputB1(e.target.value)} />
            </div>
            {/* <div className="input-container">
              <label>Item JSON:</label>
              <textarea className="input-textarea" type="text" value={inputB2} onChange={(e) => setInputB2(e.target.value)} />
            </div> */}
            <button onClick={genNFT}>Generate NFT</button>
            <button onClick={genNFTWithImage}>Generate NFT w/ Image</button>
            <button onClick={mintNFT}>Mint NFT to Wallet</button>
          </div>
          <div className={`view-content ${view === 3 ? 'active' : ''}`}>
            <button onClick={generateGamePrompt}>Generate Prompt</button>
          </div>

        </div>
      </div>
      <div className={`view-content ${view === 1 ? 'active' : ''}`}>
        <div className="result-container">
          <label>Result:</label>
          <textarea className="result-textarea" value={result} readOnly />
        </div>
      </div>
      <div className={`view-content ${view === 2 ? 'active' : ''}`}>
        <ItemDisplay
          stats={item.stats}
          imageUrl={item.imageUrl}
          name={item.name}
          description={item.description}
          effect={item.effect}
        />
      </div>
      <div className={`view-content ${view === 3 ? 'active' : ''}`}>
        <div className="result-container">
          <label>Game Prompt:</label>
          <textarea ref={textareaRef} className="result-textarea" value={gamePrompt} readOnly />
        </div>
        <button onClick={handleCopyClick}>Copy</button>
      </div>

    </div>
  );
}

export default App;
