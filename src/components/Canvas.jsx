import React, { useRef, useState, useEffect } from "react";
import "./Canvas.css";

export default function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#3B3B3B");
  const [size, setSize] = useState("3");
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const timeout = useRef(null);
  const [cursor, setCursor] = useState("default");

  /*useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");

    //Resizing
    canvas.height = window.innerHeight * 0.8;
    canvas.width = window.innerWidth * 0.45;

    //Load from locastorage
    const canvasimg = localStorage.getItem("canvasimg");
    if (canvasimg) {
      var image = new Image();
      ctx.current = canvas.getContext("2d");
      image.onload = function () {
        ctx.current.drawImage(image, 0, 0);
        setIsDrawing(false);
      };
      image.src = canvasimg;
    }
  }, [ctx]);*/
  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
  
    // Resizing
    canvas.height = window.innerHeight * 0.8;
    canvas.width = window.innerWidth * 0.45;
  
    // Remove the following code related to local storage
    /*
    const canvasimg = localStorage.getItem("canvasimg");
    if (canvasimg) {
      var image = new Image();
      ctx.current = canvas.getContext("2d");
      image.onload = function () {
        ctx.current.drawImage(image, 0, 0);
        setIsDrawing(false);
      };
      image.src = canvasimg;
    }
    */
  }, []);
  

  const startPosition = ({ nativeEvent }) => {
    setIsDrawing(true);
    draw(nativeEvent);
  };

  const finishedPosition = () => {
    setIsDrawing(false);
    ctx.current.beginPath();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect(); // Get the canvas position
    ctx.current = canvas.getContext("2d");

    const x = nativeEvent.clientX - canvasRect.left; // Adjust x-coordinate
    const y = nativeEvent.clientY - canvasRect.top; // Adjust y-coordinate

    ctx.current.lineWidth = size;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = color;

    ctx.current.lineTo(x, y);
    ctx.current.stroke();
    ctx.current.beginPath();
    ctx.current.moveTo(x, y);

    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("image/png");
      localStorage.setItem("canvasimg", base64ImageData);
    }, 400);
  };

  const clearCanvas = () => {
    localStorage.removeItem("canvasimg");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Passing clear screen
    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("image/png");
      localStorage.setItem("canvasimg", base64ImageData);
    }, 400);
  };

  const getPen = () => {
    setCursor("default");
    setSize("3");
    setColor("#3B3B3B");
  };

  const eraseCanvas = () => {
    setCursor("grab");
    setSize("20");
    setColor("#FFFFFF");

    if (!isDrawing) {
      return;
    }
  };

  return (
    <>
      <canvas
        id="canvas"
        style={{ cursor: cursor }}
        onMouseDown={startPosition}
        onMouseUp={finishedPosition}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <div className="canvas-controls">
        <button onClick={getPen} className="btn-width">
          Pencil
        </button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="btn-width"
        />
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="btn-width"
        >
          <option> 1 </option>
          <option> 3 </option>
          <option> 5 </option>
          <option> 10 </option>
          <option> 15 </option>
          <option> 20 </option>
          <option> 25 </option>
          <option> 30 </option>
        </select>
        <button onClick={clearCanvas} className="btn-width">
          Clear
        </button>
        <button onClick={eraseCanvas} className="btn-width">
          Erase
        </button>
      </div>
    </>
  );
}
