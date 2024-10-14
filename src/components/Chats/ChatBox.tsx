"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatType } from "@/utils/Interfaces/Interview/interview";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/chat.module.css";

type chatProps = {
  chats: ChatType[];
  liveChat: string;
  liveQuestion: string;
};

const ChatBox: React.FC<chatProps> = ({ chats, liveChat }) => {
  const divRef = useRef<HTMLDivElement>(null);
  // const [displayedText, setDisplayedText] = useState<string>("");

  // useEffect(() => {
  //   let i = 0;
  //   setDisplayedText(""); // Reset the displayed text when liveQuestion changes

  //   if (liveQuestion) {
  //     function typeText() {
  //       if (i < liveQuestion.length) {
  //         setDisplayedText((prev) => prev + liveQuestion[i]);
  //         i++;
  //         setTimeout(typeText, 50); // Adjust the typing speed here (50ms per character)
  //       }
  //     }
  //     typeText(); // Start typing effect when liveQuestion is present
  //   }
  // }, [liveQuestion]);

  // Scroll to the latest chat
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
              {item.question &&  (
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
                    <p
                      style={{
                        borderRadius: "20px 20px 20px 2px",
                        whiteSpace: "none",
                      }}
                      className="bg-white h-auto p-[6px] text-black text-sm"
                    >
                      {`${item.question} `}
                      </p>
                    </div>
                  </div>
                </>
              )
              }
            </div>

            {/* response box */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {item.response  ? (
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
                    <p
                      style={{
                        borderRadius: "20px 20px 2px 20px",
                        whiteSpace: "none",
                        
                      }}
                      className="text-white bg-blue-600 p-[6px] h-auto text-sm"
                    >
                      {`${item.response} `}
                      </p>
                     
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {index == chats.length - 1 && liveChat  && (
                    <div className="flex gap-2 pt-3 flex-row-reverse">
                      <Image
                        src="/user.png"
                        alt="interviewer"
                        width={25}
                        height={30}
                        className="h-[25px] rounded-full mt-1"
                      />
                      <p
                        style={{
                          borderRadius: "20px 20px 2px 20px",
                          whiteSpace: "none",
                          
                        }}
                        className="text-white bg-blue-600 p-[6px] h-auto text-sm"
                      >
                        {`${liveChat} `}
                      </p>
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
