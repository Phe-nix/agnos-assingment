"use client";
import Button from "@/components/button/button";
import { connectWebSocket } from "@/storage/websocket";
import React, { useEffect, useState } from "react";

export default function Staff() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    connectWebSocket((msg) => {
      if (msg.type === "init" || msg.type === "update") {
        setData(msg.data);
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center py-12">
      <div className="flex flex-col items-start gap-4 border border-zinc-300 bg-white p-4 rounded-2xl w-[80%]">
        <h2 className="text-xl font-bold p-2">Live Patient Data</h2>
        <div className="flex items-center gap-2 px-4">
          {data.status === "submitted" && (
            <>
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <span>Submitted Form</span>
            </>
          )}
          {data.status === "active" && (
            <>
              <div className="h-3 w-3 rounded-full bg-yellow-400 animate-pulse" />
              <span>Filling Form</span>
            </>
          )}
          {data.status === "inactive" && (
            <>
              <div className="h-3 w-3 rounded-full bg-gray-400 animate-pulse" />
              <span>Inactive</span>
            </>
          )}
        </div>
        <ul className="grid grid-cols-2 gap-x-8 gap-y-2 w-full px-4 py-2 text-xs md:text-base">
          {data &&
            typeof data === "object" &&
            !Array.isArray(data) &&
            Object.entries(data).map(([k, v]) => (
              <React.Fragment key={k}>
                <li className="font-semibold text-zinc-700 truncate">{k}</li>
                <li className="text-zinc-500 truncate">{String(v)}</li>
              </React.Fragment>
            ))}
        </ul>
      </div>
      <Button text="Back" href="/" />
    </div>
  );
}
