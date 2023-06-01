import React from "react";

export default function PersonalChat({
  me,
  clients,
  setTarget,
}: {
  me: string;
  clients: string[];
  setTarget: (target: string) => void;
}) {
  var friends = clients.filter(function (clients) {return clients !== me;});
  var count = friends.length;
  var output = "Nobody online! Check if your session is not opened somewhere already";
  if(count === 0){output = "Nobody online! Check if your session is not opened somewhere already"}else{output = ""};
  return (
    <>
        <div className="flex flex-col px-2 justify-start h-full p:2 p-6">
          <div className="flex-none justify-center">
            <span className="text-white text-sm font-light">Online:</span>
          </div>
          <div className="flex-col grow justify-center">
            {friends.map((friends, key) => (
              <div key={key}>
                <button
                  className="flex items-center p-3 bg-white-100 rounded-xl mx-1 hover:bg-gray-200"
                  onClick={() => setTarget(friends)}
                >
                  <img
                    src={`Profile/Client_white.png`}
                    alt=""
                    className="w-4 sm:w-8 h-10 sm:h-8 rounded-full"
                  />
                  <div className="flex items-center">
                    <span className="mr-3 ml-2 text-white">{friends}</span>
                  </div>
                </button>
              </div>
            ))}
            <div className="flex ml-2 mt-10">
              <span className="text-white">{output}</span>
            </div>
          </div>
          <div className="flex-none">
          <button
                  className="flex items-center p-3 bg-white-100 rounded-xl mx-1 hover:bg-zinc-400"

                >
                  <img
                    src={`Profile/Client_white.png`}
                    alt=""
                    className="w-4 sm:w-8 h-10 sm:h-8 rounded-full"
                  />
                  <div className="flex items-center">
                  <div className="flex-col grow justify-center">
                      {
                      
                          <button
                            className="flex items-center p-3 rounded-xl mx-1 hover:bg-zinc-400"
                            onClick={() => setTarget(me)}
                          >
                            <div className="flex items-center">
                              <span className="mr-3 ml-2 text-white">Personal Chat</span>
                            </div>
                          </button>
                        
                      }
                    </div>
                  </div>
                </button>
          </div>
        </div>
    </>
  );
}
