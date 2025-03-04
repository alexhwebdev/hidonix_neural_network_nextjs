"use client"

import React, { useRef, useMemo, useState, useEffect } from "react";
import Image from 'next/image';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import BackgroundImg from "../public/background.png";
import './globals.css';


const particleNames = [
  "AI", "Robotics", 
  "Spatial Intelligence", "Computer Vision", "Drones IoT", 
  "ION", "Security", "Cultural Heritage", 
  "Safe School", "MIT MST"
];
const particleMessages = {
  "AI": "AI Lorem ipsum",
  "Robotics": "Robotics Lorem ipsum",
  "Spatial Intelligence": "Spatial Intelligence Lorem ipsum",
  "Computer Vision": "Computer Vision Lorem ipsum",
  "Drones IoT": "Drones IoT Lorem ipsum",
  "ION": "ION Lorem ipsum",
  "Security": "Security Lorem ipsum",
  "Cultural Heritage": "Cultural Heritage Lorem ipsum",
  "Safe School": "Safe School Lorem ipsum",
  "MIT MST": "MIT MST Lorem ipsum",  
}


// Evenly distribute particles around sphere
function generateFibonacciSphere(count, radius) {
  const positions = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    const longitude = (2 * Math.PI * i) / goldenRatio;        // Horizontally : Spread points evenly around the sphere.
    const latitude = Math.acos(1 - (2 * (i + 0.5)) / count);  // Vertically : Controls distribution of points from poles to equator.

    const x = radius * Math.sin(latitude) * Math.cos(longitude);
    const y = radius * Math.sin(latitude) * Math.sin(longitude);
    const z = radius * Math.cos(latitude);

    positions.push([x, y, z]);
  }

  return positions;
}


function DeepTechParticle({ onClick }) {
  // const deepTechRef = useRef();

  // Create pulse effect
  // useFrame(({ clock }) => {
  //   if (deepTechRef.current) {
  //     const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.1;   // 2 : speed, 0.1 : scale
  //     deepTechRef.current.scale.set(scale, scale, scale);
  //   }
  // });

  return (
    <mesh 
      // ref={deepTechRef} 
      position={[0, 0, 0]} onClick={onClick}>
      <sphereGeometry args={[0.2, 64, 64]} />  {/* radius, widthSegments, heightSegments */}
      <meshStandardMaterial 
          color={ "#004444"}      // Dark teal
          emissive={ "#046eb5"}   // Pastel Blue
          emissiveIntensity={1.5} 
          roughness={0.3}    
          metalness={0.8}          
        />
      <Html position={[0, 0.3, 0]} center>
        <div style={{
          color: 'white',
          padding: '2px 4px',
          borderRadius: '4px',
          fontSize: '20px',
          transform: 'translateY(-25px)'
        }}>
          DeepTech
        </div>
      </Html>
    </mesh>
  );
}


function SecondaryParticleShapes({ position, name, onClick, isConnected }) {
  const auraRef = useRef();

  useFrame(({ clock }) => {
    if (auraRef.current) {
      const opacity = 0.15 + 0.1 * Math.sin(clock.getElapsedTime() * 1.5);
      auraRef.current.material.opacity = opacity;
    }
  });

  return (
    <group position={position} onClick={onClick}>
      {/* Core Sphere with Shadows */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.12, 64, 64]} />
        <meshStandardMaterial 
          color={isConnected ? "#10adad" : "#004444"}     // Aqua : Medium teal
          emissive={isConnected ? "#10adad" : "#002222"}  // Aqua : Dark teal
          emissiveIntensity={isConnected ? 1.2 : 1.5} 
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Aura Effect */}
      <mesh ref={auraRef} receiveShadow>
        <sphereGeometry args={[0.25, 64, 64]} />
        <meshStandardMaterial 
          color="#10adad"       // Aqua
          transparent={true} 
          opacity={0.55}  
          depthWrite={false}
          emissive={isConnected ? "#10adad" : "#002222"}  // Aqua : Dark teal
          emissiveIntensity={isConnected ? 1.0 : 0.3} 
        />
      </mesh>

      {/* Label */}
      <Html position={[0, 0.22, 0]} center>
        <div style={{
          color: 'white',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '20px',
          textAlign: 'center',
          transform: 'translateY(-25px)'
        }}>
          {name}
        </div>
      </Html>
    </group>
  );
}

function SecondaryParticles({ onPositionSave, onParticleClick, connectedParticles }) {
  const count = 10;
  const radius = 2.5; // Distance between each particles from center (DT particle)
  // useMemo : cache positions to prevent recalculation on every render
  const positions = useMemo(
    () => generateFibonacciSphere(count, radius),
    [count, radius]
  );
  // console.log('positions ', positions)
  // 0 : (3) [1.0897247358851683, 0, 2.25]
  // 1 : (3) [-1.3164667670578156, -1.2059913976610044, 1.75]
  // 2 : (3) [0.18928224637288388, 2.1567735697583177, 1.2499999999999998]
  // 3 : (3) [1.4510342028830256, -1.892617167327725, 0.7500000000000002]
  // 4 : (3) [-2.449443867595813, 0.4332721309953661, 0.25]
  // 5 : (3) [2.098814795826321, 1.3350941737647273, -0.2500000000000003]
  // 6 : (3) [-0.6191168082553298, -2.3030836671158372, -0.75]
  // 7 : (3) [-0.9978929804611961, 1.92138221068747, -1.2500000000000004]
  // 8 : (3) [1.677023952276191, -0.6124464576531914, -1.7500000000000004]
  // 9 : (3) [-1.0072822170289024, -0.41579145645063403, -2.25]

  return (
    <>
      {positions.map((pos, index) => {
        const name = particleNames[index];
        if (onPositionSave) {
          onPositionSave(name, pos)
        };
        return (
          <SecondaryParticleShapes 
            key={index} 
            position={pos} 
            name={name} 
            onClick={() => onParticleClick(name)} 
            isConnected={connectedParticles.has(name)} 
          />
        );
      })}
    </>
  );
}



function ConnectingLine({ start, end }) {
  const [lineProgress, setLineProgress] = useState(0);
  const [dotProgress, setDotProgress] = useState(0);
  const lineSpeed = 0.01; // Speed of the line drawing (increase for faster)
  const dotSpeed = 0.005; // Speed of the moving dot
  const lineId = JSON.stringify({ start, end }); // Unique ID for each line

  // Track previous line ID to detect when a new line is added
  const previousLineIdRef = useRef(null);

  useEffect(() => {
    // Reset line progress smoothly only if a new line is detected
    if (previousLineIdRef.current !== lineId) {
      setLineProgress(0);
      previousLineIdRef.current = lineId; // Update the previous line ID
    }
  }, [lineId]);

  useFrame(() => {
    // Progress for line drawing
    setLineProgress((prev) => (prev >= 1 ? 1 : prev + lineSpeed)); // Stop line at 1

    // Progress for dot movement
    if (lineProgress >= 1) {
      setDotProgress((prev) => (prev >= 1 ? 0 : prev + dotSpeed)); // Loop dot progress back to 0
    }
  });

  const points = useMemo(() => {
    if (!start || !end) return [];
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const interpolatedVec = new THREE.Vector3().lerpVectors(startVec, endVec, lineProgress);
    return [startVec, endVec, interpolatedVec];
  }, [start, end, lineProgress]);

  if (points.length === 0) return null;

  return (
    <>
      {/* Animated Line Drawing */}
      <Line
        points={[points[0], points[2]]} // Use interpolatedVec for progressive drawing
        color="white"
        lineWidth={2}
        transparent={true}
      />

      {/* Glowing Moving Dot with Looping Animation */}
      {lineProgress >= 1 && ( // Show dot only after line is fully drawn
        <mesh
          position={new THREE.Vector3().lerpVectors(points[0], points[1], dotProgress)}
        >
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={2.5}
            roughness={0.1}
            metalness={0.9}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      )}
    </>
  );
}


function RotatingScene({ children }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0002; // Slow rotation
    }
  });

  return <group ref={groupRef}>{children}</group>;
}


export default function Home() {
  const [positions, setPositions] = useState({});
  const [lines, setLines] = useState([]);
  const [connectedParticles, setConnectedParticles] = useState(new Set());  // Set() : useful for managing collections of items without duplicates
  const [activeMessages, setActiveMessages] = useState([]); // Message field tracking

  
  const savePosition = (name, pos) => {
    // console.log('name ', name)
    // console.log('pos ', pos)

    // pos  Array(3)
    //   0: 1.0897247358851683
    //   1: 0
    //   2: 2.25
    // name  Robotics
    
    // pos  Array(3)
    //   0: -1.3164667670578156
    //   1: -1.2059913976610044
    //   2: 1.75
    // name  Spatial Intelligence
    
    setPositions((prev) => ({ ...prev, [name]: pos }));  // ...prev : shallow copy of previous positions object.
  };


  const handleDTClick = () => {
    if (positions["AI"] && positions["Robotics"]) {
      // Set lines to only connect DeepTech to AI and Robotics directly
      setLines([
        { start: [0, 0, 0], end: positions["AI"] },
        { start: [0, 0, 0], end: positions["Robotics"] }
      ]);
  
      // Set connected particles to only DeepTech, AI, and Robotics
      setConnectedParticles(new Set(["DT", "AI", "Robotics"]));
  
      // Show messages only for AI and Robotics
      setActiveMessages([
        { name: "AI", position: positions["AI"] },
        { name: "Robotics", position: positions["Robotics"] }
      ]);
    } else {
      // Clear all messages and connections if AI or Robotics positions are not available
      setLines([]);
      setConnectedParticles(new Set());
      setActiveMessages([]);
    }
  };


  const handleParticleClick = (name) => {
    let newConnections = new Set(connectedParticles);
    let newLines = [...lines]; // Create a copy of existing lines
  
    if (
      name === "AI" &&
      positions["Spatial Intelligence"] &&
      positions["Computer Vision"]
    ) {
      const lineToSpatial = { start: positions["AI"], end: positions["Spatial Intelligence"] };
      const lineToVision = { start: positions["AI"], end: positions["Computer Vision"] };
  
      if (!newLines.some(line => JSON.stringify(line) === JSON.stringify(lineToSpatial)))
        newLines.push(lineToSpatial);
      if (!newLines.some(line => JSON.stringify(line) === JSON.stringify(lineToVision)))
        newLines.push(lineToVision);
  
      newLines = newLines.filter(
        (line) =>
          !(
            line.start[0] === 0 &&
            line.start[1] === 0 &&
            line.start[2] === 0 &&
            JSON.stringify(line.end) === JSON.stringify(positions["Robotics"])
          )
      );
  
      newConnections.add("AI");
      newConnections.add("Spatial Intelligence");
      newConnections.add("Computer Vision");
      newConnections.delete("Robotics");
  
      setLines(newLines);
      setConnectedParticles(newConnections);
      setActiveMessages([
        { name: "Spatial Intelligence", position: positions["Spatial Intelligence"] },
        { name: "Computer Vision", position: positions["Computer Vision"] }
      ]);
    } else if (name === "Spatial Intelligence" && positions["ION"]) {
      const lineToION = { start: positions["Spatial Intelligence"], end: positions["ION"] };
  
      if (!newLines.some(line => JSON.stringify(line) === JSON.stringify(lineToION)))
        newLines.push(lineToION);
  
      newConnections.add("Spatial Intelligence");
      newConnections.add("ION");
  
      setLines(newLines);
      setConnectedParticles(newConnections);
      setActiveMessages([{ name: "ION", position: positions["ION"] }]);
    } else if (name === "Robotics" && positions["Drones IoT"]) {
      const lineToDrones = { start: positions["Robotics"], end: positions["Drones IoT"] };
  
      if (!newLines.some(line => JSON.stringify(line) === JSON.stringify(lineToDrones)))
        newLines.push(lineToDrones);
  
      newLines = newLines.filter(
        (line) =>
          !(
            JSON.stringify(line.start) === JSON.stringify(positions["AI"]) ||
            JSON.stringify(line.end) === JSON.stringify(positions["AI"])
          )
      );
  
      newConnections.add("Robotics");
      newConnections.add("Drones IoT");
      newConnections.delete("AI");
  
      setLines(newLines);
      setConnectedParticles(newConnections);
      setActiveMessages([{ name: "Drones IoT", position: positions["Drones IoT"] }]);
    } else if (
      name === "Drones IoT" &&
      positions["Security"] &&
      positions["Cultural Heritage"]
    ) {
      const lineToSecurity = { start: positions["Drones IoT"], end: positions["Security"] };
      const lineToCulturalHeritage = { start: positions["Drones IoT"], end: positions["Cultural Heritage"] };
  
      if (!newLines.some(line => JSON.stringify(line) === JSON.stringify(lineToSecurity)))
        newLines.push(lineToSecurity);
      if (!newLines.some(line => JSON.stringify(line) === JSON.stringify(lineToCulturalHeritage)))
        newLines.push(lineToCulturalHeritage);
  
      newConnections.add("Drones IoT");
      newConnections.add("Security");
      newConnections.add("Cultural Heritage");
  
      setLines(newLines);
      setConnectedParticles(newConnections);
      setActiveMessages([
        { name: "Security", position: positions["Security"] },
        { name: "Cultural Heritage", position: positions["Cultural Heritage"] }
      ]);
    } else if (name === "Security" && positions["Safe School"]) {
      const lineToSafeSchool = { start: positions["Security"], end: positions["Safe School"] };
  
      if (!newLines.some(line => JSON.stringify(line) === JSON.stringify(lineToSafeSchool)))
        newLines.push(lineToSafeSchool);
  
      newConnections.add("Security");
      newConnections.add("Safe School");
  
      setLines(newLines);
      setConnectedParticles(newConnections);
      setActiveMessages([{ name: "Safe School", position: positions["Safe School"] }]);
    } else if (name === "Cultural Heritage" && positions["MIT MST"]) {
      // Add a line from Cultural Heritage to MIT MST
      const lineToMIT = { start: positions["Cultural Heritage"], end: positions["MIT MST"] };
  
      if (!newLines.some(line => JSON.stringify(line) === JSON.stringify(lineToMIT)))
        newLines.push(lineToMIT);
  
      // Update connected particles to include Cultural Heritage and MIT MST
      newConnections.add("Cultural Heritage");
      newConnections.add("MIT MST");
  
      setLines(newLines);
      setConnectedParticles(newConnections);
  
      // Show message only for MIT MST
      setActiveMessages([{ name: "MIT MST", position: positions["MIT MST"] }]);
    } else {
      // Clear all messages and connections if positions are not available
      setLines([]);
      setConnectedParticles(new Set());
      setActiveMessages([]);
    }
  };
  

  return (
    // <div>test</div>

    <div className="">
      <Image 
        src={BackgroundImg}
        fill={true}
        priority
        style={{objectFit: "cover"}}
        alt="background image"
      />
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ height: "100vh" }}>
        {/* Fix lights directly to the scene instead of rotating with RotatingScene */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 3, 4]} intensity={25} castShadow />
        <OrbitControls enableZoom={false} />

        <RotatingScene>
          <DeepTechParticle onClick={handleDTClick} />

          <SecondaryParticles 
            onPositionSave={savePosition} 
            onParticleClick={handleParticleClick} 
            connectedParticles={connectedParticles} 
          />

          {lines.map((line, index) => (
            <ConnectingLine key={index} start={line.start} end={line.end} />
          ))}

          {activeMessages.map((message, index) => (
            <Html 
              key={`${message.name}-${index}`}  // Unique key for each message
              position={[
                message.position[0], 
                message.position[1] + 0.3, 
                message.position[2]
              ]} 
              center
            >
              <div 
                style={{
                  width: "200px",
                  background: "rgba(0, 0, 0, 0.7)",
                  padding: "8px",
                  borderRadius: "5px",
                  color: "white",
                  textAlign: "center",
                  fontSize: "14px",
                  maxWidth: "200px",
                  opacity: 0,
                  animation: "fadeIn 0.6s ease-in-out forwards"
                }}
              >
                <p>Lorem ipsum blah blah blah blah</p>
                <a href="http://www.google.com" style={{
                  color: "#00ffff",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}>
                  Link
                </a>
              </div>
            </Html>
          ))}
        </RotatingScene>
      </Canvas>      
    </div>
  );
}
