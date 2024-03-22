import React from "react";
import { usePlane, useBox } from "@react-three/cannon";

export default function Ground(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));

  const wallMaterial = {
    color: "#aaaaaa",
  };

  const wallSize = [30, 5, .5];
  const planeSize = [30, 30]; 
  const wallThickness = 0.5; 

  const wallSizeX = planeSize[0] + 2 * wallThickness; 
  const wallSizeZ = planeSize[1] + 2 * wallThickness; 

  const wallPositionY = wallSize[1] / 2; 
  const wall1Position = [0, wallPositionY, -planeSize[1] / 2 - wallThickness / 2];
  const wall2Position = [0, wallPositionY, planeSize[1] / 2 + wallThickness / 2];
  const wall3Position = [planeSize[0] / 2 + wallThickness / 2, wallPositionY, 0];
  const wall4Position = [-planeSize[0] / 2 - wallThickness / 2, wallPositionY, 0];

  const [wall1Ref] = useBox(() => ({ mass: 0, args: [wallSizeX, wallSize[1], wallThickness], position: wall1Position }));
  const [wall2Ref] = useBox(() => ({ mass: 0, args: [wallSizeX, wallSize[1], wallThickness], position: wall2Position }));
  const [wall3Ref] = useBox(() => ({ mass: 0, args: [wallThickness, wallSize[1], wallSizeZ], position: wall3Position }));
  const [wall4Ref] = useBox(() => ({ mass: 0, args: [wallThickness, wallSize[1], wallSizeZ], position: wall4Position }));

  return (
    <>
      <mesh ref={ref} castShadow receiveShadow>
        <planeGeometry attach="geometry" args={[30, 30]} />
        <meshStandardMaterial color={"#dddddd"} />
      </mesh>
      <mesh ref={wall1Ref} receiveShadow>
        <boxGeometry attach="geometry" args={[wallSizeX, wallSize[1], wallThickness]} />
        <meshStandardMaterial {...wallMaterial} />
      </mesh>
      <mesh ref={wall2Ref} receiveShadow>
        <boxGeometry attach="geometry" args={[wallSizeX, wallSize[1], wallThickness]} />
        <meshStandardMaterial {...wallMaterial} />
      </mesh>
      <mesh ref={wall3Ref} receiveShadow>
        <boxGeometry attach="geometry" args={[wallThickness, wallSize[1], wallSizeZ]} />
        <meshStandardMaterial {...wallMaterial} />
      </mesh>
      <mesh ref={wall4Ref} receiveShadow>
        <boxGeometry attach="geometry" args={[wallThickness, wallSize[1], wallSizeZ]} />
        <meshStandardMaterial {...wallMaterial} />
      </mesh>
    </>
  );
}