
import { MeshDistortMaterial, useCubeTexture, useTexture} from "@react-three/drei";
import { Instances } from './Instances';
import { useResource } from "react-three-fiber";


export function Scene() {
    const envMap = useCubeTexture(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"], { path: "/cubemap/" })
    const bumpMap = useTexture("/rough_plaster_broken_bump_1k.jpg")
    // We use `useResource` to be able to delay rendering the spheres until the material is ready
    const matRef = useResource()
  
  
    return (
      <>
        <MeshDistortMaterial
          ref={matRef}
          envMap={envMap}
          bumpMap={bumpMap}
          color={"red"}
          roughness={0.1}
          metalness={1}
          bumpScale={0.005}
          clearcoat={1}
          clearcoatRoughness={1}
          radius={1}
          distort={0.4}
        />
        <Instances material={matRef.current}/>
      </>
    )
  
  }

  export default Scene;