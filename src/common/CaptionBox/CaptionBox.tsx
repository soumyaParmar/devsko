interface boxType{
    caption:string
}

const CaptionBox:React.FC<boxType> = ({caption}) => {
  return (
    <div className="text-gray-400 bg-white h-full w-full overflow-y-scroll border rounded-2xl">
        <p style={{padding:'10px', borderBottom:'1px solid #e2e8f0',fontWeight:"bold", color:'#94a3b8'}}>Captions</p>
        <p style={{padding:'10px'}}>{caption}</p>
    </div>
  )
}

export default CaptionBox