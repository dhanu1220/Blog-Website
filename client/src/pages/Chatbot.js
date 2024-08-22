import React from 'react'
import axios from "axios";
function Chatbot() {
    const [count,setCount] = useState(0);

function generateAns(){
    axios({
        url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA1tN6d1596zZc8CAUagFZCwsb1FKtqu1E",
        method:"post",
        data:{
          "contents":
            [{"parts":[{"text":"Explain how AI works"}]}],
        },
    });
}

  return (
    <div>Chatbot</div>
  )
}

export default Chatbot