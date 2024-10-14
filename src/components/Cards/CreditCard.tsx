import React, { useState } from "react";
import Image from "next/image";
import dollar_img from "@/assets/dashboard/dollar.png";
import style from "@/styles/dashboard.module.css";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

const CreditCard = ({ handleClick }: { handleClick: () => void }) => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    setText("");
  };

  const text1 = `
  Earn 200 credits for each new referral who sign up our application
`;

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "How many credits does it cost to use AI?",
      children: <p>{text1}</p>,
    },
    {
      key: "2",
      label: "How can i earn more credits.",
      children: <p>{text1}</p>,
    },
  ];
  return (
    <>
      <div className={style.credits_outer}>
        <div className={style.credits_inner}>
          <h6 className="font-medium">Your account balance</h6>
          <button
            className="absolute rounded py-[0.15rem] px-[0.1rem] text-xs top-4 right-4"
            onClick={handleClick}
          >
            X
          </button>
          <div className="flex gap-1 justify-center items-center font-bold text-[1.2rem]">
            <Image
              src={dollar_img}
              alt="Dollar img"
              className="w-[1.3rem] h-[1.3rem]"
            />
            400 credits
          </div>
          <p className=" text-center font-normal text-[0.85rem]">
            Credits you create decks using AI, and use AI editing features.
            They’re tied to your account email.
          </p>
          <div className="text-sm font-medium">Earn More Credits</div>
          <div className="flex justify-between">
            <p className="w-[65%] text-left text-[#878787] font-normal">
              Earn 200 credits for each new referral who sign up our
              application.
            </p>
            <div className="text-[#16A34A] text-xs bg-[#16A34A0D] rounded-[1rem] p-1 text-center">
              +200 credits
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <input
              type="text"
              value={text}
              className="w-[80%] h-[2rem] border bg-[#e5e3e3] text-[#878787]  outline-none py-1 px-2"
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="w-[40%] h-[2rem] text-white rounded  bg-[#176DEE] text-[10px] py-2 px-1"
              style={{
                backgroundColor: copied ? "#16A34A" : "#176DEE",
              }}
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy referral link"}
            </button>
          </div>

          <Collapse
            accordion
            items={items}
            bordered={false}
            className="w-full bg-white font-medium"
          />
        </div>
      </div>
    </>
  );
};

export default CreditCard;
