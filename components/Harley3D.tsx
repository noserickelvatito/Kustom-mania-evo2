'use client'
import { useRef, useEffect } from "react";

export default function Harley3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, harleyModel, animationId;
    let gsap, ScrollTrigger;

    const run = async () => {
      gsap = (await import("gsap")).default;
      ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader");

      // Escena básica
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 5;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x111111, 0);
      containerRef.current.appendChild(renderer.domElement);

      // Luces
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(6, 6, 6);
      scene.add(dirLight);

      // Loader Harley GLB
      const loader = new GLTFLoader();
      loader.load(
        "/models/harley-davidson.glb", // Asegúrate de poner aquí el path correcto dentro de /public/models
        (gltf) => {
          harleyModel = gltf.scene;
          harleyModel.scale.set(1.5, 1.5, 1.5);
          // Centrado
          const box = new THREE.Box3().setFromObject(harleyModel);
          const center = box.getCenter(new THREE.Vector3());
          harleyModel.position.sub(center);
          scene.add(harleyModel);

          // Animación scroll
          gsap.to(harleyModel.rotation, {
            y: Math.PI * 2,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              markers: false,
            },
          });
        }
      );

      // Render loop
      const animate = () => {
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };
      animate();

      // Responsive resize
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      // Cleanup
      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    };

    let cleanup;
    run().then(res => { cleanup = res });
    return () => { if (cleanup) cleanup() }
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#111",
        zIndex: 2,
      }}
      className="flex items-center justify-center"
    />
  );
}
