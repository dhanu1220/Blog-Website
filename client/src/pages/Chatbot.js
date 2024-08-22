import { React, useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function generateAns() {
    const response = await axios({
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=API_KEY',
      method: 'post',
      data: {
        contents: [{ parts: [{ text: question }] }],
      },
    });

    let rawAnswer = response['data']['candidates'][0]['content']['parts'][0]['text'];

    // Limit answer to 300 words
    let words = rawAnswer.split(' ');
    if (words.length > 100) {
      let truncatedAnswer = words.slice(0, 100).join(' ');
      let lastSentenceEnd = truncatedAnswer.lastIndexOf('.');
      if (lastSentenceEnd !== -1) {
        rawAnswer = truncatedAnswer.slice(0, lastSentenceEnd + 1); 
      } else {
        rawAnswer = truncatedAnswer + '...';
      }
    }

    const formattedAnswer = rawAnswer
      .replace(/##\s/g, '<strong>')   
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
      .replace(/<strong>(.*?)$/g, '<strong>$1</strong>'); 

    setAnswer(formattedAnswer);
  }

  return (
    <div className="chatbotContainer">
      <h1 className="headerChat">ChatBot AI</h1>
      <textarea
        className="textArea"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
      ></textarea>
      <button className="ansButton" onClick={generateAns}>
        Generate Answer
      </button>
      <p dangerouslySetInnerHTML={{ __html: answer }} />
    </div>
  );
}

export default Chatbot;
