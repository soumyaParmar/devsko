import React from 'react'

interface LoadingLinesProps {
    noOfLines?: number
}

export const LoadingLines: React.FC<LoadingLinesProps> = ({ noOfLines = 1 }) => {
    const array = Array.from({ length: noOfLines }, (_, index) => index + 1);
    return (
        < div className="flex flex-col gap-2" >
            {array.map((_, index) =>
                <div key={index} className="w-full h-2 bg-gray-200 rounded-full" />
            )}
        </div >
    )
}
interface LoadingButtonProps {
    height?: number
}
export const LoadingButton: React.FC<LoadingButtonProps> = ({ height = 20 }) => {
    return (
        < div className="flex flex-col gap-2" >
            <div className="w-full bg-gray-200 rounded-full" style={{ height }} />
        </div >
    )
}