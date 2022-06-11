import React, { useRef, useState, useEffect } from "react";
import { Button, Center } from "@mantine/core";
import { loadLayersModel } from "@tensorflow/tfjs";
import CanvasDraw from "react-canvas-draw";

const HomePage = () => {
  const canvasRef = useRef();
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = () => {
    console.log(canvasRef.current.getSaveData());
  };

  //   const formatDrawing = () => {};

  const loadModel = async () => {
    const model = await loadLayersModel("https://localhost:8080/model.json");
    console.log(model);
  };

  const handleErase = () => canvasRef.current.eraseAll();

  const handleUndo = () => canvasRef.current.undo();

  useEffect(async () => {
    await loadModel();
  }, []);

  return (
    <Center
      sx={(theme) => ({
        borderColor: theme.black,
        borderWidth: 50,
        padding: 10,
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Center sx={{ height: 20, margin: 10 }}>
        <Button sx={{ margin: 10 }} onClick={handleSubmit}>
          Save
        </Button>
        <Button sx={{ margin: 10 }} onClick={handleErase}>
          Clear
        </Button>
        <Button sx={{ margin: 10 }} onClick={handleUndo}>
          Undo
        </Button>
      </Center>
      <Center
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            height: 410,
            width: 410,
            borderColor: "#000000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000000",
            padding: 10,
          }}
        >
          <CanvasDraw hideGrid ref={canvasRef} />
        </div>
        <Center sx={{ height: 400, width: 400, margin: 50 }}>
          The number is:
        </Center>
      </Center>
    </Center>
  );
};

export default HomePage;
