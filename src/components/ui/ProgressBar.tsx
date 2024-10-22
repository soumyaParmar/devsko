interface ProgressBarProps {
    heading: string | null
    percentage: number
    showPercentage?: boolean
}
const ProgressBar: React.FC<ProgressBarProps> = ({ heading, percentage, showPercentage = true }) => {
    return (
        <div className='flex flex-col gap-1.5'>
            {heading && (
                <div>
                    {heading}
                </div>
            )}
            <div className="flex items-center gap-2">
                <div className='h-3 w-full bg-[#D9D9D9] rounded-full'>
                    <div className={`w-[${percentage}%] bg-black h-full rounded-full`} />
                </div>
                <div>
                    {showPercentage && `${percentage}%`}
                </div>
            </div>

        </div>
    )
}

export default ProgressBar
