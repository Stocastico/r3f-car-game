import { Canvas } from '@react-three/fiber';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Scene } from './Scene';

const root = createRoot(document.getElementById('root'));
root.render(
  <Canvas>
    <Scene />
  </Canvas>
);