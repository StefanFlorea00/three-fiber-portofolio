
import {Icosahedron, useGLTF} from "@react-three/drei";
import React, { useRef, useState} from "react";
import { useFrame } from "react-three-fiber";

import { VendingMachine } from './VendingMachine.js';

function MainSphere({ material }) {
    const main = useRef()
    useFrame(() => {
        // animate each sphere in the array
        main.current.rotation.y -= 0.001;
        main.current.rotation.x -= 0.001;
      })
    // main sphere rotates following the mouse position
    return <Icosahedron args={[1, 4]} ref={main} material={material} position={[-0.7, 0, 0]} />
  }

export function Instances() {
    return (
      <>       
       <group>
          <VendingMachine position={[-5,-0,-6]}/>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0,0]} position={[0,-3.12,0]}>
              <planeBufferGeometry attach='geometry' args={[100,100]}/>
              <shadowMaterial attach='material' opacity={.6}/>
          </mesh>
        </group>
      </>
    )
  }

  export default Instances;