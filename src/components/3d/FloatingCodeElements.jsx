import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const FloatingCodeElements = () => {
    const cubeRef = useRef();
    const sphereRef = useRef();
    
    useFrame((state) => {
        if (cubeRef.current) {
            cubeRef.current.rotation.y += 0.005;
            cubeRef.current.rotation.x += 0.003;
            cubeRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
        }
        if (sphereRef.current) {
            sphereRef.current.rotation.z += 0.01;
            sphereRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} color="#00ff88" />
            <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ff6b6b" />
            
            {/* Floating wireframe cube */}
            <mesh ref={cubeRef} position={[-2, 1, -3]}>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshStandardMaterial 
                    color="#00ff88" 
                    wireframe 
                    transparent 
                    opacity={0.4} 
                />
            </mesh>
            
            {/* Floating sphere */}
            <mesh ref={sphereRef} position={[2, -1, -4]}>
                <sphereGeometry args={[0.8, 16, 16]} />
                <meshStandardMaterial 
                    color="#ff6b6b" 
                    wireframe 
                    transparent 
                    opacity={0.3} 
                />
            </mesh>
            
            {/* Code symbols */}
            <Text
                position={[0, 2, -5]}
                fontSize={1.2}
                color="#00ff88"
                anchorX="center"
                anchorY="middle"
            >
                {'{ }'}
            </Text>
            <Text
                position={[-3, -2, -4]}
                fontSize={0.8}
                color="#ff6b6b"
                anchorX="center"
                anchorY="middle"
                rotation={[0, 0, Math.PI / 6]}
            >
                {'</>'}
            </Text>
            <Text
                position={[3, 0, -3]}
                fontSize={0.6}
                color="#ffd93d"
                anchorX="center"
                anchorY="middle"
                rotation={[0, 0, -Math.PI / 4]}
            >
                {'()'}
            </Text>
        </>
    );
};

export default FloatingCodeElements;
