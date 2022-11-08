import {
    Environment,
    OrbitControls,
    PerspectiveCamera
} from "@react-three/drei";
import { Suspense } from "react";

export function Scene() {
    return (
        <Suspense fallback={null}>
            <Environment
                files={'process.env.PUBLIC_URL + /textures/envmap.hdr'}
                background={"both"}
            />
        
            <PerspectiveCamera makeDefault position={[-6, 3.9, 6.2]} fov={40}/>
            <OrbitControls target={[-2.6, -0.7, 0]}/>
        </Suspense>
    );
}