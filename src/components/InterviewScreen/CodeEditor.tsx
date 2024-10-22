import React, { useState } from 'react'
import { motion } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import style from '@/styles/interviewscreen.module.css'

interface CodeEditorProps {
    code: string,
    handleCodeChange: (value: string) => void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, handleCodeChange }) => {

    const [selectedCodingLanguage, setSelectedCodingLanguage] =
        useState<string>("");
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className={style.editor_container}
        >
            <div className="h-10 flex justify-between p-1 bg-[#282a36] text-white">
                <select
                    className={style.select_lang}
                    defaultValue={selectedCodingLanguage}
                    onChange={(e) => setSelectedCodingLanguage(e.target.value)}
                >
                    <option>Javascript</option>
                    <option>Java</option>
                    <option>C#</option>
                    <option>C++</option>
                    <option>Go</option>
                </select>
                <div className="h-full ">
                    <button className="mr-1  bg-green-400 pl-4 pr-4 h-full rounded-xl">Submit</button>
                    <button className="mr-1  bg-red-400 pl-4 pr-4 h-full rounded-xl">Discard</button>
                </div>
            </div>
            <CodeMirror
                value={code}
                height="71vh"
                theme={dracula} // Using the Dracula theme
                extensions={[javascript()]} // Setting language to JavaScript
                onChange={(value) => handleCodeChange(value)}
            />
        </motion.div>
    )
}

export default CodeEditor