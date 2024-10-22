import React, { useEffect } from 'react'
import { Tldraw } from 'tldraw'
import "tldraw/tldraw.css";
import { motion } from "framer-motion";

const WhiteBoard = () => {
    useEffect(() => {
        const a = document.querySelector(".interviewscreen_whiteboard__28_bK");
        setTimeout(() => {
            const b = a?.querySelector("div")?.getElementsByTagName("style")[1];
            if (b) b.innerHTML = "";
        });
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className='w-2/3'
        >
            {/* <WhiteBoard /> */}
            <Tldraw />
            <div className="absolute bottom-1 left-[40%] text-white z-[999]">
                <button className="mr-1  bg-green-400 pl-4 pr-4 h-[30px] rounded-xl">Submit</button>
                <button className="mr-1  bg-red-400 pl-4 pr-4 h-[30px] rounded-xl">Discard</button>
            </div>
        </motion.div>
    )
}

export default WhiteBoard