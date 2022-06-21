import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = 560;
    canvas.height = 560;
    canvas.borderColor = "#000000";
    canvas.borderWidth = 10;
    canvas.style.width = `${280}px`;
    canvas.style.height = `${280}px`;
    canvas.style.borderColor = "#000000";
    canvas.style.borderWidth = `${10}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const saveData = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const dataURL = canvas.toDataURL();
    const imageData = await resizedataURL(dataURL, 28, 28);
    return { context, imageData };
  };

  function resizedataURL(datas, wantedWidth, wantedHeight) {
    // We create an image to receive the Data URI
    return new Promise(function (resolve, reject) {
      if (datas == null) reject();
      var img = document.createElement("img");
      let imageData = 0;
      // When the event "onload" is triggered we can resize the image.
      img.onload = function () {
        // We create a canvas and get its context.
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        // We set the dimensions at the wanted size.
        canvas.width = wantedWidth;
        canvas.height = wantedHeight;

        // We resize the image with the canvas method drawImage();
        ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

        imageData = ctx.getImageData(0, 0, 28, 28);
        resolve(imageData);

        /////////////////////////////////////////
        // Use and treat your Data URI here !! //
        /////////////////////////////////////////
      };
      img.src = datas;
    });

    // We put the Data URI in the image's src attribute
  }

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        saveData,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
