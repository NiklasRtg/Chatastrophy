import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { MessageItem } from "./MessageItem";
import Clientbar from "./Clientbar";
import Conversation from "./Conversation";
import PersonalChat from "./PersonalChat";
import { WebSocketConnector } from "./WebSocketConnector";
import Welcome from "./Welcome";

const WS_URL = "wss://uoug263fuc.execute-api.eu-central-1.amazonaws.com/dev";
const connector = new WebSocketConnector();

function App() {
  const [username, setUsername] = useState<string>(
    window.localStorage.getItem("username") || ""
  );
  const [clients, setClients] = useState<string[]>([]);
  const [target, setTarget] = useState<string>(
    window.localStorage.getItem("lastTarget") || ""
  );
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const webSocket = useRef(connector);

  const loadMessages = (target: string) => {
    webSocket.current.getConnection(url).send(
      JSON.stringify({
        action: "getMessages",
        targetUsername: target,
        limit: 1000,
      })
    );
  };

  const setNewTarget = (target: string) => {
    setTarget(target);
    setMessages([]);
    loadMessages(target);
  };

  useEffect(() => {
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("lastTarget", target);
  });

  if (username === "") {
    return (
      <Welcome
        setUsername={(username) => {
          setUsername(username);
          if (target === "") {
            setTarget(username);
          }
        }}
      />
    );
  }

  const url = `${WS_URL}?username=${username}`;
  const ws = webSocket.current.getConnection(url);

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data) as {
      type: string;
      value: unknown;
    };
    console.log(msg);
    if (msg.type === "clients") {
      setClients(
        (msg.value as { username: string }[]).map((c) => c.username).sort()
      );
    }

    if (msg.type === "messages") {
      const body = msg.value as {
        messages: MessageItem[];
        lastEvaluatedKey: unknown;
      };

      setMessages([...body.messages.reverse(), ...messages]);
    }

    if (msg.type === "message") {
      const item = msg.value as MessageItem;
      if (item.sender === username || item.sender !== target) {
        return;
      }
      setMessages([...messages, item]);
    }
  };

  ws.onopen = () => {
    webSocket.current
      .getConnection(url)
      .send(JSON.stringify({ action: "getClients" }));

    loadMessages(target);
  };

  const sendMessage = (value: string) => {
    webSocket.current.getConnection(url).send(
      JSON.stringify({
        action: "sendMessage",
        recipientUsername: target,
        message: value,
      })
    );
    setMessages([
      ...messages,
      {
        message: value,
        sender: username,
      },
    ]);
  };

  return (    
    <div className="flex-col h-screen bg-zinc-800">

        <div className="h-1/6">
          <Clientbar
            me={username}
            clients={clients}
            setTarget={(target) => setNewTarget(target)}
          />
        </div>

        <div className="flex h-5/6">

          <div className="w-5/6 h-full">
                <Conversation
                  target={target}
                  messages={messages}
                  sendMessage={sendMessage}
                />
          </div>
          <div className="w-1/6 h-full">
                <PersonalChat
              me={username}
              clients={clients}
              setTarget={(target) => setNewTarget(target)}
                />
          </div>
        </div>
    </div>
  );
}

export default App;
