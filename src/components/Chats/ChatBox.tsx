"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatType } from "@/utils/Interfaces/Interview/interview";
import Image from "next/image";
import React from "react";
import style from "../../styles/chat.module.css"

type chatProps = {
  chats: ChatType[];
};

const ChatBox: React.FC<chatProps> = ({ chats }) => {
  return (
    <div className={style.outer_layer_chat}>
      <h1>Chats</h1>
      <div>
        {chats &&
          chats.map((item, index) => (
            <div key={index} style={{ padding: "20px 0px 0 10px" }}>
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

                      <span
                        style={{
                          color: "black",
                          borderRadius: "10px",
                          height: "auto",
                          whiteSpace: "none",
                          width: "19rem",
                        }}
                      >
                        {`${item.question} `}

                        <div className="text-[10px] relative left-[1px] mt-1">
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
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* response box */}
              <div style={{ display: "flex", justifyContent: "start" }}>
                {item.response && (
                  <>
                    <div className="flex gap-2 ">
                      <Image
                        src="/user.png"
                        alt="interviewer"
                        width={25}
                        height={30}
                        className="h-[25px] rounded-full mt-1"
                      />
                      <span
                        style={{
                          color: "black",
                          borderRadius: "10px",
                          height: "auto",
                          whiteSpace: "none",
                          width: "19rem",
                        }}
                      >
                        {`${item.response} `}
                        <div className="text-[10px] relative left-[1px] mt-1">
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
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatBox;
