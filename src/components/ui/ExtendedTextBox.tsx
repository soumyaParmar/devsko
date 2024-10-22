import { useState } from "react";

interface ExtendedTextBoxProps {
    text: string,
    minWords: number
}
const ExtendedTextBox: React.FC<ExtendedTextBoxProps> = ({ text, minWords }) => {
    const [isFullText, setIsFullText] = useState(false)


    const words = text.split(" ");

    const getFormatedText = () => {
        if (isFullText)
            return text;
        return `${words.slice(0, minWords).join(" ")}${words.length > minWords ? '...' : ""}`
    }
    return (
        <div className='flex flex-col gap-1'>
            <div className='text-[#727272] text-[14px]'>
                {getFormatedText()}
                {
                    !isFullText && words.length > minWords &&
                    <span className='underline text-[12px] cursor-pointer pl-2' onClick={() => { setIsFullText((pre) => !pre) }}>
                        See all
                    </span>
                }
            </div>
        </div>
    )
}

export default ExtendedTextBox;