import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

export default function LandingPage() {
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffffff,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="min-h-screen flex flex-col">
  
      <header className="p-4 flex justify-between items-center text-white z-10 relative">
        <h1 className="text-2xl font-bold">KODE Analytics</h1>
        <button
          onClick={() => navigate('/admin-login')}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 font-medium"
        >
          Admin Login
        </button>
      </header>

    
      <main className="flex-1 flex flex-col items-center justify-center text-white text-center px-6 z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Smart Data Visualization</h2>
        <p className="mb-8 text-lg md:text-xl">Upload, Analyze, and Export Charts with Ease</p>
        <button
          onClick={() => navigate('/user-login')}
          className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100"
        >
          Get Started
        </button>
      </main>
    </div>
  );
}
