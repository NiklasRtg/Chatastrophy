import React from "react";

export default function Clientbar({
  me,
  clients,
  setTarget,
}: {
  me: string;
  clients: string[];
  setTarget: (target: string) => void;
}) {
  return (
    <>
      <div className="flex-row h-1/3">
        <div className="flex sm:items-center justify-center py-5">
          <div className="flex items-center space-x-2">
            <img
              src={`Profile/Client_white.png`}
              alt=""
              className="w-8 rounded-full"
            />
            <div className="text-2xl">
              <span className="text-white mr-3 font-bold">Chatastrophy</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
