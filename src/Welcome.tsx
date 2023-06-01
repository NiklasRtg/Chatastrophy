import React, { useState } from "react";

export default function Welcome({
  setUsername,
}: {
  setUsername: (username: string) => void;
}) {
  const [usernameValue, setUsernameValue] = useState("");
  const [error, setError] = useState("");

  return (
    <section className="flex justify-center items-center h-screen bg-zinc-800">
      <div className="max-w-md w-full bg-zinc-600 rounded p-6 space-y-4">
        <div className="mb-4">
          <p className="text-white">Sign In</p>
          <h2 className="text-xl font-bold text-white">Welcome to Chatastrophy</h2>
        </div>
        <div>
          <input
            className={`w-full p-4 text-sm bg-gray-50 focus:outline-none border rounded text-zinc-600 ${
              error !== "" ? "border-red-500" : "border-gray-200"
            }`}
            type="text"
            placeholder="Username"
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
          />
          {error !== "" ? (
            <span className="font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {error}
            </span>
          ) : (
            ""
          )}
        </div>
        <div>
          <button
            onClick={() => {
              if (usernameValue === "") {
                setError("username cannot be empty");
                return;
              }
              setUsername(usernameValue);
            }}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
          >
            Join
          </button>
        </div>
      </div>
    </section>
  );
}
