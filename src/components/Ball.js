import React, { useState } from "react";
import * as THREE from "three";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

const Ball = ({ position, color, onClick }) => {
  const [pushDirection, setPushDirection] = useState([0, 0, 0]);
  const [ballRef, api] = useSphere(() => ({ mass: 1, position: position }));
  const [prevMousePosition, setPrevMousePosition] = useState([0, 0]);

  const handleImpulse = () => {
    if (ballRef.current) {
      api.applyImpulse(pushDirection, [0, 0, 0]);
    }
  };

  useFrame(({ camera, mouse }) => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(ballRef.current);

    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;
      const direction = new THREE.Vector3()
        .copy(intersectionPoint)
        .sub(ballRef.current.position)
        .normalize()
        .multiplyScalar(5);
      setPushDirection([direction.x, direction.y, direction.z]);
      handleImpulse();
    } else {
      setPushDirection([0, 0, 0]);
      handleImpulse();
    }

    setPrevMousePosition([mouse.x, mouse.y]);
  });

  return (
    <mesh onClick={() => {
      onClick();
    }} ref={ballRef} position={position} receiveShadow castShadow>
      <sphereGeometry args={[1, 36, 36]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.8}
        metalness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.35}
      />
    </mesh>
  );
};

export default Ball;