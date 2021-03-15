
export const SpinningMesh = ({position, args, color, speed: distortion}) => {
    const mesh = useRef(null);
    useFrame(()=> (mesh.current.rotation.x = mesh.current.rotation.y += .01));
  
    const [expand, setExpand] = useState(false);
  
    const props = useSpring({
      scale: expand ? [1.4,1.4,1.4] : [1,1,1],
    });
  
    return (
  
      <a.mesh onClick={()=> setExpand(!expand)} 
            castShadow
            position={position}
            scale={props.scale}
            ref={mesh}>
        <boxBufferGeometry attach='geometry' args={args}/>
        <MeshDistortMaterial attach='material'
         color={color} 
         factor={.6}
         roughness={0.1}
         metalness={1}
         clearcoat={1}
         clearcoatRoughness={1}
         radius={1}
         distort={distortion}
         />
      </a.mesh>
    )
  }

  export default SpinningMesh;