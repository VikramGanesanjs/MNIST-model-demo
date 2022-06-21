import React, { useRef, useState, useEffect } from "react";
import { Button, Center } from "@mantine/core";
import {
  loadLayersModel,
  fill,
  tidy,
  browser,
  cast,
  zeros,
  ones,
} from "@tensorflow/tfjs";
import { useCanvas } from "./CanvasContext";
import { Canvas } from "./Canvas";

const HomePage = () => {
  const { clearCanvas, saveData } = useCanvas();
  const [prediction, setPrediction] = useState(null);
  const [model, setModel] = useState(null);

  const handleSubmit = async () => {
    await predictNumber();
  };

  const predictNumber = async () => {
    tidy(async () => {
      const { imageData } = await saveData();
      let img = browser.fromPixels(imageData, 1);
      img = img.reshape([1, 784]);
      let divisor = fill([1, 784], 255);
      img = img.div(divisor);

      img = cast(img, "float32");
      const b = zeros([1, 784]);
      const c = ones([1, 784]);

      let cond = img.equal(c);
      cond = cond.logicalNot();
      img = img.where(cond, b);
      console.log(await img.array());
      const pred = model.predict(img);
      pred.print();
      let arr = await pred.array();
      setPrediction(arr[0].indexOf(arr[0].reduce((a, b) => Math.max(a, b))));
      // setPrediction(Array.from(pred).ma
    });
  };

  const loadModel = async () => {
    const model = await loadLayersModel(process.env.PUBLIC_URL + "/model.json");
    console.log(model.summary());
    setModel(model);
  };

  const handleErase = () => clearCanvas();

  useEffect(() => {
    loadModel();
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
      </Center>
      <Center
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            backgroundColor: "#000000",
            height: 400,
            width: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Canvas />
        </div>
        <Center sx={{ height: 400, width: 400, margin: 50 }}>
          {prediction
            ? `The number is:${prediction}`
            : "Draw in the box to guess the number!"}
        </Center>
      </Center>
    </Center>
  );
};

export default HomePage;
