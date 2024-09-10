import { ChatType } from '@/utils/Interfaces/Interview/interview'
import React from 'react'

type chatProps = {
    chats:ChatType[]
}

const ChatBox:React.FC<chatProps> = ({chats}) => {
  return (
    <div>
                <div
          style={{
            // border: "1px solid white",
            borderRadius: "5px",
            maxHeight: "100vh",
            width: "450px ",
            scrollbarWidth: "none",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",

          }}
          className="rightContainer bg-slate-900 "
        >
          {chats &&
            chats.map((item, index) => (
              <div key={index} style={{ padding: "20px 0px 0 10px" }}>
                <div>
                  {item.question && (
                    <>
                      <div className="flex gap-2">
                        {/* <img
                          src="/interviewer.webp"
                          alt="interviewer"
                          width={40}
                          className="h-[40px]"
                        /> */}
                        <span
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "10px",
                            padding: "10px 10px",
                            height: "auto",
                          }}
                        >
                          {item.question}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* response box */}
                <div style={{ display: "flex", justifyContent: "end" }}>
                  {item.response && (
                    <>
                      <div className="flex gap-2 ">
                        <span
                          style={{
                            textAlign: "right",
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "10px",
                            padding: "5px 10px",
                          }}
                        >
                          {item.response}
                        </span>
                        {/* <img
                          src="/user.png"
                          alt="interviewer"
                          width={40}
                          className="h-[40px] rounded-full"
                        /> */}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default ChatBox