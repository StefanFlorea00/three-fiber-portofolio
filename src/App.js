
import React, { useRef, useState, forwardRef, Suspense, useEffect } from "react";

import * as THREE from 'three'
import './App.scss';

import { EffectComposer, DepthOfField, Bloom, Noise, Vignette,Glitch ,GodRays, ChromaticAberration, Scanline, ToneMapping, BrightnessContrast } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize,GlitchMode  } from "postprocessing";
import { Canvas, useFrame, useThree, extend,useResource} from "react-three-fiber";
import { Scene } from './components/Scene'; 
import { HtmlContent } from './components/HtmlContent';
import { Instances } from './components/Instances';


import state from './components/state'


import { Html, softShadows, Icosahedron, MeshWobbleMaterial, MeshDistortMaterial, useCubeTexture, OrbitControls, CameraShake,useTexture, Cylinder, useProgress, PerspectiveCamera } from "@react-three/drei";

import {useSpring, a} from 'react-spring/three';

softShadows();



const Sun = forwardRef(function Sun(props, forwardRef) {
  // useFrame(({ clock }) => {
  //   forwardRef.current.position.x = Math.sin(clock.getElapsedTime()) * -8;
  //   forwardRef.current.position.y = Math.cos(clock.getElapsedTime()) * -8;
  // });

  return (
    <group >
    <mesh ref={forwardRef} position={[25,9,-10]}>
      <boxBufferGeometry args={[2, 1, 55]} />
      <meshBasicMaterial color={"#Fafafa"} />
      </mesh>    
    {/* <mesh position={[-15,9,-10]}>
    <boxBufferGeometry args={[2, 1, 35]} />
    <meshBasicMaterial color={"#Fafafa"} />
    </mesh> */}
    </group>
  );
});




function Effects() {
  const sunRef = useResource();
  const cameraRef = useRef();

  // useFrame((state)=>{
  //   // if(cameraRef && cameraRef.current.rotation.y <= 0.5) {
  //   //   cameraRef.current.rotation.y += state.mouse.x/100;
  //   //   cameraRef.current.rotation.x -= state.mouse.y/100;
  //   // }
  // })

  return (
    <>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0,0,2.5]} fov={60}/>
      <Sun ref={sunRef} />
      {( sunRef.current &&
        <EffectComposer multisampling={0}>
          {/* <CameraShake {...config} /> */}
          <Bloom luminanceThreshold={.5} luminanceSmoothing={0.9} intensity={4.0} height={300} opacity={1} blendFunction={BlendFunction.ADD} />
          <DepthOfField focusDistance={0} focalLength={0.03} bokehScale={2} height={480}/>
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
          <Noise opacity={0.025}/>
          <ToneMapping
            blendFunction={BlendFunction.NORMAL} // blend mode
            adaptive={true} // toggle adaptive luminance map usage
            resolution={256} // texture resolution of the luminance map
            middleGrey={0.6} // middle grey factor
            maxLuminance={16.0} // maximum luminance
            averageLuminance={1.0} // average luminance
            adaptationRate={1.0} // luminance adaptation rate
          />
          {/* <Scanline
            blendFunction={BlendFunction.OVERLAY} // blend mode
            density={.7}
            opacity={0.1} // scanline density
            /> */}
            <GodRays
              sun={sunRef.current}
              blendFunction={BlendFunction.Screen}
              samples={30}
              density={0.9}
              decay={0.85}
              weight={0.6}
              exposure={0.5}
              clampMax={1}
              width={Resizer.AUTO_SIZE}
              height={Resizer.AUTO_SIZE}
              kernelSize={KernelSize.SMALL}
              blur={true}
            />
          {/* <BrightnessContrast
            brightness={.15} // brightness. min: -1, max: 1
            contrast={.3} // contrast: min -1, max: 1
          /> */}
          {/* <ChromaticAberration
      blendFunction={BlendFunction.OVERLAY} // blend mode
      offset={[-0.002, 0.002]} // color offset
    /> */}
        </EffectComposer>
      )}
    </>
  );
}

function App() {
  const domContent = useRef();

  // const cameraRef = useRef();
  // useFrame(() => {
  //   // animate each sphere in the array
  //   cameraRef.position.x -= 0.01;
  // })
  return (
    <>

    <div className="bg">
      <Canvas 
      gl={{ powerPreference: "high-performance", alpha: false, antialias: false, stencil: false, depth: false }}
      shadowMap colorManagement onCreated={state => state.gl.setClearColor("#070c0d")} >
        <ambientLight intensity={.5} color="#90fff1"></ambientLight>
        <fog color="#161616" attach="fog" near={8} far={30} />
        <directionalLight
          castShadow
          position={[5,5,-3]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          color={"#fafafa"}
        />
        <Suspense fallback={<Html center>Loading.</Html>}>
          <Instances/>
          {/* <HtmlContent domContent={domContent} /> */}
          {/* <Scene/> */}
        </Suspense>
        {/* <OrbitControls
        /> */}
        <Effects/>
      </Canvas>
    </div>
    <div className="html-text">
      <div className="front-section">
          <div className="title-div">
            <h1>Hello</h1>
            <p>This is some text </p>
            <p>This is some long long long long long long long long long long long long long long text </p>
            <div className="button-div centered">
              <button className="primary-btn">About me</button>
              <button className="primary-btn">My work</button>
            </div>
          </div>
          <div className="title-div">
            <h1>Hello</h1>
            <p>This is some text </p>
            <p>This is some long long long long long long long long long long long long long long text </p>
            <div className="button-div centered">
              <button className="primary-btn">About me</button>
              <button className="primary-btn">My work</button>
            </div>
          </div>
      </div>
    </div>
    </>
    
  )
}

export default App;
