"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatType } from "@/utils/Interfaces/Interview/interview";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import style from "../../styles/chat.module.css";

type chatProps = {
  chats: ChatType[];
  liveChat: string;
};

const ChatBox: React.FC<chatProps> = ({ chats, liveChat }) => {
 const divRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  if (divRef.current) {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [chats, liveChat]);

  return (
    <div className={style.outer_layer_chat}>
      <h1>Chats</h1>
      <div>
        {chats &&
          chats.map((item, index) => (
            <div key={index} style={{ padding: "20px 10px 0 10px" }}>
              {/* question box */}
              <div>
                {item.question && (
                  <>
                    <div className="flex gap-2 mt-5">
                      <Image
                        src="/interviewer.webp"
                        alt="interviewer"
                        width={30}
                        height={30}
                        className="h-[30px] mt-1"
                      />
                      <div>
                      <span
                        style={{
                          borderRadius: "20px 20px 20px 2px",
                          whiteSpace: "none",
                        }}
                        className="bg-white h-auto p-[6px] text-black text-sm"
                      >
                        {`${item.question} `}
                        </span>

                        <div className="text-[10px] relative left-[1px] pt-1 pl-1 text-gray-400">
                          {item.timeStamp
                            ? new Date(item.timeStamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "No time available"}
                          {/* for setting the intnernational time zones */}
                          {/* {item.timeStamp
                            ? new Intl.DateTimeFormat("en-US", {
                                timeZone: "Europe/London",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(new Date(item.timeStamp))
                            : "No time available"} */}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* response box */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {item.response && !liveChat ? (
                  <>
                    <div className="flex gap-2 flex-row-reverse">
                      <Image
                        src="/user.png"
                        alt="interviewer"
                        width={25}
                        height={30}
                        className="h-[25px] rounded-full mt-1"
                      />
                      <div>
                      <span
                        style={{
                          borderRadius: "20px 20px 2px 20px",
                          whiteSpace: "none",
                          
                        }}
                        className="text-white bg-blue-600 p-[6px] h-auto text-sm"
                      >
                        {`${item.response} `}
                        </span>
                        <div className="text-[10px] relative left-[1px] pt-1 pl-1 text-gray-400">
                          {item.timeStamp
                            ? new Date(item.timeStamp).toLocaleString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "No time available"}

                          {/* for setting the intnernational time zones */}

                          {/* {item.timeStamp
                            ? new Intl.DateTimeFormat("en-US", {
                                timeZone: "Europe/London",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(new Date(item.timeStamp))
                            : "No time available"} */}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {liveChat && !item.response && (
                      <div className="flex gap-2 pt-3 flex-row-reverse">
                        <Image
                          src="/user.png"
                          alt="interviewer"
                          width={25}
                          height={30}
                          className="h-[25px] rounded-full mt-1"
                        />
                        <span
                          style={{
                            borderRadius: "20px 20px 2px 20px",
                            whiteSpace: "none",
                            
                          }}
                          className="text-white bg-blue-600 p-[6px] h-auto text-sm"
                        >
                          {`${liveChat} `}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
          <div ref={divRef}></div>
      </div>
    </div>
  );
};

export default ChatBox;
