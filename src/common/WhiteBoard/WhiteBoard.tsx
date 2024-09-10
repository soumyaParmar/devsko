import React, { useEffect, useRef, useState } from 'react';
import style from "../../styles/whiteboard.module.css"

const WhiteBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<string>('pen');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [shapes, setShapes] = useState<any[]>([]);
  const [drag, setDrag] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawBlackBoardBackground(); // Redraw the blackboard background
        setShapes([]); // Clear all shapes
        context.beginPath(); // Reset the drawing context
      }
    }
  };

  const drawBlackBoardBackground = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = '#000';
        context.fillRect(0, 0, canvas.width, canvas.height); // Black background
      }
    }
  };

  useEffect(() => {
    drawBlackBoardBackground(); // Set initial blackboard background when component mounts
  }, []);

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const { offsetX, offsetY } = e.nativeEvent;
    context.lineWidth = 2;
    context.strokeStyle = '#fff'; // White strokes for drawing
    context.fillStyle = '#fff';

    if (tool === 'pen') {
      context.lineTo(offsetX, offsetY);
      context.stroke();
      setLastPosition({ x: offsetX, y: offsetY });
    } else if (tool === 'line') {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawBlackBoardBackground();
      context.beginPath();
      context.moveTo(lastPosition.x, lastPosition.y);
      context.lineTo(offsetX, offsetY);
      context.stroke();
    } else if (tool === 'rectangle') {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawBlackBoardBackground();
      context.beginPath();
      context.rect(lastPosition.x, lastPosition.y, offsetX - lastPosition.x, offsetY - lastPosition.y);
      context.stroke();
    } else if (tool === 'circle') {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawBlackBoardBackground();
      const radius = Math.sqrt(Math.pow(offsetX - lastPosition.x, 2) + Math.pow(offsetY - lastPosition.y, 2));
      context.beginPath();
      context.arc(lastPosition.x, lastPosition.y, radius, 0, Math.PI * 2);
      context.stroke();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setLastPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    if (tool === 'line' || tool === 'rectangle' || tool === 'circle') {
      setDrag(true);
      setDragStart({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    if (tool === 'line' || tool === 'rectangle' || tool === 'circle') {
      setShapes([...shapes, {
        type: tool,
        startX: dragStart.x,
        startY: dragStart.y,
        endX: e.nativeEvent.offsetX,
        endY: e.nativeEvent.offsetY,
        radius: Math.sqrt(Math.pow(e.nativeEvent.offsetX - dragStart.x, 2) + Math.pow(e.nativeEvent.offsetY - dragStart.y, 2))
      }]);
    }
    setDrag(false);
  };

  const handleEraser = () => {
    setTool('eraser');
  };

  const erase = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
  const canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;

  const { offsetX, offsetY } = e.nativeEvent;
  context.clearRect(offsetX - 10, offsetY - 10, 20, 20); 
  context.fillStyle = '#000';
  context.fillRect(offsetX - 10, offsetY - 10, 20, 20);
  };

  return (
    <div>
      <div >
        <div >
          <div >
            <canvas
              ref={canvasRef}
              id="whiteboard"
              width="500"
              height="500"
              onMouseDown={handleMouseDown}
              onMouseMove={tool === 'eraser' ? erase : draw}
              onMouseUp={handleMouseUp}
            />
          </div>
          <div className={style.tools}>
          <div >
            <button
              onClick={handleEraser}
            >
              Eraser
            </button>
          </div>
          <div >
            <button
              onClick={clearCanvas}
            >
              Clear
            </button>
          </div>
          <div >
          <label>Tools:</label>
            <select className={style.toolType} onChange={(e) => setTool(e.target.value)}>
              <option value="pen">Pen</option>
              <option value="line">Line</option>
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="text">Text</option>
            </select>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteBoard;
