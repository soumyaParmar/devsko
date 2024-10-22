import React, { MouseEventHandler } from 'react'
interface ButtonProps {
    value: string
    onClick: MouseEventHandler<HTMLElement>
    bgColor?: string
    tailCSS?: string
}
const Button: React.FC<ButtonProps> = ({ value, onClick, bgColor = '#111111', tailCSS = '' }) => {
    return (
        <div
            className={` p-2 flex text-nowrap w-full justify-center items-center text-white rounded-[12px] cursor-pointer ${tailCSS}`}
            style={{ backgroundColor: bgColor }}
            onClick={onClick}>
            {value}
        </div>
    )
}

export default Button