import React, { Suspense, useState } from 'react';
import { Physics } from "@react-three/cannon";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import Ball from "./components/Ball";
import Ground from "./components/Ground";

import './App.css';

function App() {
  const [selectedBall, setSelectedBall] = useState<any>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleBallClick = (event: React.MouseEvent) => {
    setSelectedBall(event);
    
    if (event) {
      setContextMenuPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleColorChange = (color: string) => {
    if (selectedBall) {
      let object = selectedBall.object.material.color;

      if (color === "red") {
        object.r = 1;
        object.g = 0;
        object.b = 0;
      }

      if (color === "green") {
        object.r = 0;
        object.g = 1;
        object.b = 0;
      }

      if (color === "blue") {
        object.r = 0;
        object.g = 0;
        object.b = 1;
      }
      
      setSelectedBall(null);
    }
  };

  return (
    <div className='canvas-container'>
      <Canvas
        style={{ height: 600, width: 600 }}
        camera={{ position: [0, 50, 30] }}
      >
        <directionalLight
          castShadow
          position={[0, 15, 15]}
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          shadow-radius={5}
          shadow-bias={-0.0002}
          shadow-camera-near={1}
          shadow-camera-far={500}
          shadow-camera-top={20}
          shadow-camera-left={20}
          shadow-camera-right={-20}
          shadow-camera-bottom={-20}
        />
        <Suspense fallback={null}>
          <Physics>
            <Ball position={[-10, 28, 0]} color={"red"} onClick={(event: React.MouseEvent) => handleBallClick(event)} />
            <Ball position={[0, 29, 0]} color={"green"} onClick={(event: React.MouseEvent) => handleBallClick(event)} />
            <Ball position={[10, 30, 0]} color={"blue"} onClick={(event: React.MouseEvent) => handleBallClick(event)} />
            <Ground />
          </Physics>
        </Suspense>
        <OrbitControls />
      </Canvas>
      {selectedBall && (
        <div
          className="context-menu"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          <div className="menu-item" onClick={() => handleColorChange("red")}>Red</div>
          <div className="menu-item" onClick={() => handleColorChange("green")}>Green</div>
          <div className="menu-item" onClick={() => handleColorChange("blue")}>Blue</div>
        </div>
      )}
    </div>
  );
}

export default App;
