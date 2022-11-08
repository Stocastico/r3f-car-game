import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferAttribute, TextureLoader } from "three";

export function Ground() {
    const gridMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + "/textures/grid.png"
    );

    const aoMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + "textures/ground-ao.png"
    );

    const alphaMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + "/textures/alpha-map.png"
    );

    useEffect(() => {
        gridMap.anisotropy = 16;
    }, [gridMap]);

    const meshRef = useRef(null);
    useEffect(() => {
        var uvs = meshRef.current.geometry.attributes.uv.array;
        meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));
    }, [meshRef.current]);

    return (
        <>
            <mesh
                ref={meshRef}
                position={[-2.3, 0, -1.3]}
                rotation-x={-Math.PI * 0.5}
                rotation-z={-0.1}
            >
                <circleGeometry args={[6, 50]} />
                <MeshReflectorMaterial
                    aoMap={aoMap}
                    alphaMap={alphaMap}
                    transparent={true}
                    color={[0.5, 0.5, 0.5]}
                    envMapIntensity={0.35}
                    metalness={0.05}
                    roughness={0.4}
                    dithering={true}
                    blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
                    mixBlur={3} // How much blur mixes with surface roughness (default = 1)
                    mixStrength={30} // Strength of the reflections
                    mixContrast={1} // Contrast of the reflections
                    resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                    mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                    depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
                    minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                    maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                    depthToBlurRatioBias={0.25} 
                    reflectorOffset={0.02} 
                />
            </mesh>

        </>
    );
}