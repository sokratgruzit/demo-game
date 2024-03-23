import React, { useState } from "react";
import * as THREE from "three";
import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";

const Ball = ({ position, color, onClick }) => {
  const { camera, raycaster, mouse } = useThree();
  const [pushDirection, setPushDirection] = useState([0, 0, 0]);
  const [ballRef, api] = useSphere(() => ({ mass: 1, position: position }));

  const handleImpulse = () => {
    if (ballRef.current) {
      api.applyImpulse(pushDirection, [0, 0, 0]);
    }
  };

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(ballRef.current)

    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;
      const direction = new THREE.Vector3().copy(intersectionPoint).sub(ballRef.current.position).normalize();
      const impulseMagnitude = 15; 
      const impulseDirection = [direction.x * impulseMagnitude, direction.y * impulseMagnitude, direction.z * impulseMagnitude];

      setPushDirection(impulseDirection);
      handleImpulse();
    } else {
      setPushDirection([0, 0, 0]);
      handleImpulse();
    }
  });

  return (
    <mesh onClick={onClick} ref={ballRef} position={position} receiveShadow castShadow>
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