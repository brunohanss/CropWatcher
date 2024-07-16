import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TweenMax, Sine, Power0 } from 'gsap';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './ThreeDScene.css'; // Ensure you import the CSS file

export const Credits = () => (
  <div className="credits">
    <span>
      by &nbsp;
      <a
        href="https://twitter.com/pixelia_me"
        target="_blank"
        rel="noopener noreferrer"
        title="Noel Delgado"
      >
        <svg height="12" viewBox="0 0 57 30">
          <path
            d="M28.1312,9.5341 C29.7966,9.5341 32.1025,10.627 34.248,12.368 C49.3297,11.5836 53.8793,-0.4796 55.5773,0.6783 C57.8326,3.2476 50.8638,16.3535 39.4,19.088 C39.8655,20.2628 40.1364,21.4786 40.1364,22.6983 C40.1364,25.9478 38.837,26.7409 36.7281,28.8974 L36.704,28.824 C36.4799,29.0276 36.208,29.2318 35.8945,29.4 C35.8945,29.4 36.1346,27.0065 34.9341,26.7672 C34.9341,26.7672 34.3739,27.4054 33.0133,27.2459 C32.8532,25.8896 32.293,25.4109 32.1329,25.3311 C31.4126,25.4109 30.9324,26.5278 30.132,26.5278 C29.8,26.1969 29.5184,25.5615 29.312,24.972 C29.0201,25.4221 28.6036,26.1128 28.2512,26.2885 C27.8796,26.2885 27.1476,25.2858 26.836,24.832 C26.6262,25.4581 26.3285,26.1707 25.9702,26.5278 C25.1699,26.5278 24.6896,25.4109 23.9694,25.3311 C23.8093,25.4109 23.249,25.8896 23.089,27.2459 C21.7284,27.4054 21.1681,26.7672 21.1681,26.7672 C19.9676,27.0065 20.2077,29.4 20.2077,29.4 C19.6122,29.0804 19.1739,28.6307 18.908,28.304 L18.8667,28.3947 C17.1544,26.3262 16.1259,25.5896 16.1259,22.6983 C16.1259,21.4938 16.3637,20.2895 16.784,19.128 C5.2094,16.4922 -1.8448,3.2615 0.4227,0.6783 C2.119,-0.4785 6.6627,11.5578 21.708,12.364 C23.8143,10.6244 26.1724,9.5341 28.1312,9.5341 Z M28.8514,20.3048 C28.8514,20.3048 30.4121,21.7409 32.213,21.7409 C34.0137,21.7409 35.3343,19.3474 35.3343,19.3474 L28.8514,20.3048 Z M20.6879,19.3474 C20.6879,19.3474 22.2486,21.7409 24.0494,21.7409 C25.8502,21.7409 27.1707,20.3048 27.1707,20.3048 L20.6879,19.3474 Z"
            fillRule="evenodd"
          />
        </svg>
      </a>
    </span>
  </div>
);

export const ThreeDScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = 750;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(40, 20, 100);
    scene.add(camera);

    scene.fog = new THREE.Fog(0xd5f8f8, 100, 300);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    (mountRef.current as any).appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 50;
    controls.maxDistance = 250;
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.enablePan = false;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(30, 20, 0);
    light.castShadow = true;
    scene.add(new THREE.AmbientLight(0xc5f5f5, 1));
    scene.add(light);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshBasicMaterial({ color: 0xe0dacd })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -100;
    scene.add(floor);

    const internals = {
      W: width,
      H: height,
      randomIntFromInterval: (min:number, max: number) =>
        Math.floor(Math.random() * (max - min + 1) + min),
      materials: {
        orange: new THREE.MeshPhongMaterial({ color: 0xFF5733 , flatShading: true }),
        green: new THREE.MeshPhongMaterial({ color: 0x379351, flatShading: true }),
        brown: new THREE.MeshPhongMaterial({ color: 0x5C2C22, flatShading: true }),
        pink: new THREE.MeshPhongMaterial({ color: 0xB1325E, flatShading: true }),
        gray: new THREE.MeshPhongMaterial({ color: 0x666666, flatShading: true }),
        clouds: new THREE.MeshPhongMaterial({ color: 0xeeeeee, flatShading: true }),
        rabbit: new THREE.MeshPhongMaterial({ color: 0xaaaaaa, flatShading: true }),
      },
      shadowSupport: (group: { traverse: (arg0: (object: any) => void) => void; }) => {
        group.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
      },
    };

    class Cloud {
      mesh: THREE.Group;
    
      constructor(config: { y?: number; z?: number; delay?: number }) {
        this.mesh = new THREE.Group();
        const cloud = this._createCloud();
        this.mesh.position.x = 200;
        this.mesh.position.y = config.y || Math.random();
        this.mesh.position.z = config.z || 0;
        this.mesh.add(cloud);
        this.animate(config);
      }
    
      animate(config: { delay?: number }) {
        TweenMax.to(this.mesh.position, 3.5, {
          x: -200,
          repeat: Infinity,
          delay: config.delay || 0,
          onRepeat: () => {
            this.mesh.position.y = internals.randomIntFromInterval(-10, 20);
          },
        });
      }
    
      _createCloud(): THREE.Group {
        const group = new THREE.Group();
        const cloudGeo = new THREE.SphereGeometry(5, 4, 6);
        const cloud = new THREE.Mesh(cloudGeo, internals.materials.clouds);
        cloud.scale.set(1, 0.8, 1);
    
        const cloud2 = cloud.clone();
        cloud2.scale.set(0.55, 0.35, 1);
        cloud2.position.set(5, -1.5, 2);
    
        const cloud3 = cloud.clone();
        cloud3.scale.set(0.75, 0.5, 1);
        cloud3.position.set(-5.5, -2, -1);
    
        group.add(cloud);
        group.add(cloud2);
        group.add(cloud3);
    
        internals.shadowSupport(group);
    
        return group;
      }
    }
    class Carrot {
      mesh: THREE.Group;
      body: THREE.Group;
      wings: THREE.Group;
      leafs: THREE.Group;
      pilot: Pilot;
    
      constructor() {
        this.mesh = new THREE.Group();
        this.body = this._createBody();
        this.wings = this._createWings();
        this.leafs = this._createLeafs();
        this.pilot = new Pilot();
    
        this.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
        this.mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    
        this.mesh.add(this.body);
        this.mesh.add(this.wings);
        this.mesh.add(this.leafs);
        this.mesh.add(this.pilot.mesh);
    
        this.animate();
      }
    
      animate() {
        TweenMax.to(this.mesh.position, 1, {
          x: -2,
          y: 4,
          repeat: Infinity,
          yoyo: true,
          ease: Sine.easeInOut,
        });
    
        TweenMax.to(this.mesh.rotation, 1, {
          x: -1.7,
          repeat: Infinity,
          yoyo: true,
          ease: Sine.easeInOut,
        });
    
        TweenMax.to(this.leafs.rotation, 0.1, {
          y: Math.PI,
          repeat: Infinity,
          ease: Power0.easeNone,
        });
      }
    
      _createBody(): THREE.Group {
        const group = new THREE.Group();
        const bodyGeom = new THREE.CylinderGeometry(5, 2, 25);
    
        // Accessing vertices for BufferGeometry
        const position = bodyGeom.attributes.position as THREE.BufferAttribute;
        position.setY(16, position.getY(16) + 3);
        position.setY(17, position.getY(17) - 2);
    
        group.add(new THREE.Mesh(bodyGeom, internals.materials.orange));
    
        internals.shadowSupport(group);
    
        return group;
      }
    
      _createWings(): THREE.Group {
        const group = new THREE.Group();
        const geometry = new THREE.BoxGeometry(7, 7, 0.5);
    
        // Accessing vertices for BufferGeometry
        const position = geometry.attributes.position as THREE.BufferAttribute;
        position.setY(2, position.getY(2) + 2);
        position.setY(3, position.getY(3) + 2);
        position.setX(2, position.getX(2) - 1);
        position.setX(3, position.getX(3) - 1);
    
        const wingR = new THREE.Mesh(geometry, internals.materials.orange);
        wingR.position.x = 6;
        wingR.position.y = 2;
        wingR.position.z = 1;
    
        const wingL = wingR.clone();
        wingL.position.x = -6;
        wingL.rotation.y = Math.PI;
    
        group.add(wingR);
        group.add(wingL);
    
        internals.shadowSupport(group);
    
        return group;
      }
    
      _createLeafs(): THREE.Group {
        const group = new THREE.Group();
        const geometry = new THREE.CylinderGeometry(1.5, 1, 5, 4);
    
        // Accessing vertices for BufferGeometry
        const position = geometry.attributes.position as THREE.BufferAttribute;
        position.setY(8, position.getY(8) + 0.5);
    
        const leafA = new THREE.Mesh(geometry, internals.materials.green);
        leafA.position.y = 16;
    
        const leafB = leafA.clone();
        leafB.position.x = -1.75;
        leafB.position.y = 15;
        leafB.rotation.z = 0.4;
    
        const leafC = leafB.clone();
        leafC.position.x = leafB.position.x * -1;
        leafC.rotation.z = leafB.rotation.z * -1;
    
        group.add(leafA);
        group.add(leafB);
        group.add(leafC);
    
        internals.shadowSupport(group);
    
        return group;
      }
    }

    class Pilot {
      mesh: THREE.Group;
      pilot: THREE.Group;
      earPivotL!: THREE.Object3D;
      earPivotR!: THREE.Object3D;
      eye!: THREE.Mesh;
      eyeb!: THREE.Mesh;
    
      constructor() {
        this.mesh = new THREE.Group();
        this.pilot = this._createPilot();
        this.mesh.rotation.x = 1.5;
        this.mesh.position.set(0, 7, 5);
        this.mesh.add(this.pilot);
        this.animate();
      }
    
      animate() {
        TweenMax.to(this.earPivotL.rotation, 0.1, {
          x: Math.sin(-Math.PI / 3),
          repeat: Infinity,
          yoyo: true,
        });
    
        TweenMax.to(this.earPivotR.rotation, 0.1, {
          x: -Math.PI / 2.25,
          repeat: Infinity,
          yoyo: true,
        });
    
        TweenMax.to(this.eye.scale, 0.5, {
          y: 0.1,
          repeat: Infinity,
          yoyo: true,
          delay: 5,
          repeatDelay: 3,
        });
    
        TweenMax.to(this.eyeb.scale, 0.5, {
          y: 0.1,
          repeat: Infinity,
          yoyo: true,
          delay: 5,
          repeatDelay: 3,
        });
      }
    
      _createPilot(): THREE.Group {
        const group = new THREE.Group();
        const bodyGeo = new THREE.BoxGeometry(5, 5, 5);
      
        // Accessing vertices for BufferGeometry
        const position = bodyGeo.attributes.position as THREE.BufferAttribute;
        position.setY(3, position.getY(3) + 0.5);
        position.setY(6, position.getY(6) + 0.5);
      
        const body = new THREE.Mesh(bodyGeo, internals.materials.rabbit);
        body.position.y = 1;
        body.position.z = 4;
      
        const seatGeo = new THREE.BoxGeometry(6, 1, 6);
        const seat = new THREE.Mesh(seatGeo, internals.materials.brown);
        seat.position.set(0, -2.5, 0);
        seat.rotation.set(0.25, 0, 0);
        body.add(seat);
      
        this.earPivotL = new THREE.Object3D();
        this.earPivotL.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 2.5, 0));
        this.earPivotL.rotation.x = -Math.PI / 2.25;
      
        this.earPivotR = this.earPivotL.clone();
        this.earPivotR.rotation.x = -Math.PI / 3;
      
        const earGeo = new THREE.BoxGeometry(2, 6, 0.5);
      
        // Accessing vertices for BufferGeometry
        const earPosition = earGeo.attributes.position as THREE.BufferAttribute;
        earPosition.setX(2, earPosition.getX(2) - 0.5);
        earPosition.setX(3, earPosition.getX(3) - 0.5);
        earPosition.setX(6, earPosition.getX(6) + 0.5);
        earPosition.setX(7, earPosition.getX(7) + 0.5);
      
        const ear = new THREE.Mesh(earGeo, internals.materials.rabbit);
        ear.position.x = -1.5;
        ear.position.y = 2.5;
      
        const earInside = new THREE.Mesh(earGeo, internals.materials.pink);
        earInside.scale.set(0.5, 0.7, 0.5);
        earInside.position.set(0, 0, 0.25);
        ear.add(earInside);
      
        this.earPivotL.add(ear);
        body.add(this.earPivotL);
      
        const ear2 = ear.clone();
        ear2.position.x = ear.position.x * -1;
        this.earPivotR.add(ear2);
        body.add(this.earPivotR);
      
        const eyeGeo = new THREE.BoxGeometry(0.5, 1, 0.5);
        const eye = new THREE.Mesh(eyeGeo, internals.materials.gray);
        eye.position.set(1, 0.5, 2.5);
        body.add(eye);
        this.eye = eye;
      
        const eyeb = eye.clone();
        eyeb.position.x = eye.position.x * -1;
        this.eyeb = eyeb;
        body.add(eyeb);
      
        const noseGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      
        // Accessing vertices for BufferGeometry
        const nosePosition = noseGeo.attributes.position as THREE.BufferAttribute;
        nosePosition.setX(2, 0);
        nosePosition.setX(3, 0);
        nosePosition.setX(6, 0);
        nosePosition.setX(7, 0);
      
        const nose = new THREE.Mesh(noseGeo, internals.materials.pink);
        nose.position.set(0, -0.5, 2.5);
        body.add(nose);
      
        const mouthGeo = new THREE.BoxGeometry(0.25, 0.25, 0.5);
        const mouth = new THREE.Mesh(mouthGeo, internals.materials.gray);
        mouth.position.set(0, -1.5, 2.5);
        body.add(mouth);
      
        group.add(body);
        internals.shadowSupport(group);
      
        return group;
      }
    }
    

    scene.add(new Carrot().mesh);
    scene.add(new Cloud({ y: -5, z: 20 }).mesh);
    scene.add(new Cloud({ y: 0, z: 10, delay: 1 }).mesh);
    scene.add(new Cloud({ y: 15, z: -10, delay: 0.5 }).mesh);
    scene.add(new Cloud({ y: -15, z: 10, delay: 2 }).mesh);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      (mountRef.current as any).removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '500px', position: "absolute", margin:"-100px"}} />;
};