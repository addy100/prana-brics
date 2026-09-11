import * as THREE from 'three';
import { ROADMAP_STAGES } from '../data/roadmapData';
import { Milestone } from '../types';

export class CorridorScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private clickableObjects: THREE.Object3D[] = [];
  private nodeMeshes: { mesh: THREE.Mesh; milestone: Milestone }[] = [];
  private particles!: THREE.Points;
  private particlePositions!: Float32Array;
  private particleVelocities!: Float32Array;
  private targetCamPos: THREE.Vector3 | null = null;
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private onSelectMilestoneCallback?: (milestone: Milestone) => void;

  constructor(containerId: string, onSelectMilestone?: (milestone: Milestone) => void) {
    this.container = document.getElementById(containerId)!;
    this.onSelectMilestoneCallback = onSelectMilestone;

    // --- FIFA 2026 Nature Sky Scene & Fog ---
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xe0f2fe, 0.025);

    // --- Camera ---
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 10, 28);
    this.camera.lookAt(0, 0, 0);

    // --- Renderer ---
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.initLighting();
    this.initGrid();
    this.initTrajectorySpline();
    this.initMilestoneBeacons();
    this.initParticleField();
    this.initEventListeners();
    this.animate();
  }

  private initLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(30, 50, 30);
    this.scene.add(sunLight);

    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 1.2);
    cyanLight.position.set(-20, -10, -20);
    this.scene.add(cyanLight);
  }

  private initGrid() {
    // FIFA 2026 Emerald Stadium Pitch Grid
    const gridHelper = new THREE.GridHelper(80, 80, 0x10b981, 0xa7f3d0);
    gridHelper.position.y = -6;
    this.scene.add(gridHelper);
  }

  private initTrajectorySpline() {
    const curvePoints = ROADMAP_STAGES.map(s => s.position);
    const spline = new THREE.CatmullRomCurve3(curvePoints);
    
    // Core trajectory tube (Electric Turquoise & Emerald Glow)
    const tubeGeometry = new THREE.TubeGeometry(spline, 120, 0.22, 16, false);
    const tubeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x059669,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.7
    });
    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    this.scene.add(tubeMesh);
  }

  private initMilestoneBeacons() {
    ROADMAP_STAGES.forEach((stage) => {
      const sphereGeo = new THREE.IcosahedronGeometry(1.0, 2);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: stage.color,
        emissive: stage.color,
        emissiveIntensity: 0.6,
        wireframe: true
      });
      const beacon = new THREE.Mesh(sphereGeo, sphereMat);
      beacon.position.copy(stage.position);
      beacon.userData = { milestone: stage };
      this.scene.add(beacon);
      
      this.clickableObjects.push(beacon);
      this.nodeMeshes.push({ mesh: beacon, milestone: stage });

      const ringGeo = new THREE.TorusGeometry(1.6, 0.05, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: stage.color,
        transparent: true,
        opacity: 0.6
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      beacon.add(ring);
    });
  }

  private initParticleField() {
    const count = 1800;
    const geometry = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array(count * 3);
    this.particleVelocities = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      this.particlePositions[i] = (Math.random() - 0.5) * 75;
      this.particlePositions[i + 1] = (Math.random() - 0.5) * 25;
      this.particlePositions[i + 2] = (Math.random() - 0.5) * 50;

      this.particleVelocities[i] = 0.02 + Math.random() * 0.03;
      this.particleVelocities[i + 1] = (Math.random() - 0.5) * 0.01;
      this.particleVelocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x059669,
      size: 0.12,
      transparent: true,
      opacity: 0.65
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private initEventListeners() {
    window.addEventListener('pointerdown', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('#overlay') || target.closest('#top-bar') || target.closest('.tab-panel') || target.closest('#pitch-modal')) {
        return;
      }

      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      
      const intersects = this.raycaster.intersectObjects(this.clickableObjects);
      if (intersects.length > 0) {
        const selected = intersects[0].object;
        const stage: Milestone = selected.userData.milestone;
        this.focusOnNode(stage);
      }
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousedown', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('#overlay') || target.closest('#top-bar') || target.closest('.tab-panel') || target.closest('#pitch-modal')) {
        return;
      }
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;

        this.scene.rotation.y += deltaX * 0.004;
        this.scene.rotation.x += deltaY * 0.004;
      }
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('wheel', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('#overlay') || target.closest('.tab-panel') || target.closest('#pitch-modal')) {
        return;
      }
      this.camera.position.z = Math.min(Math.max(this.camera.position.z + e.deltaY * 0.02, 8), 55);
    });
  }

  public focusOnNode(stage: Milestone) {
    this.targetCamPos = new THREE.Vector3(
      stage.position.x + 3.5,
      stage.position.y + 2.5,
      stage.position.z + 7
    );

    if (this.onSelectMilestoneCallback) {
      this.onSelectMilestoneCallback(stage);
    }
  }

  public resetCamera() {
    this.targetCamPos = new THREE.Vector3(0, 10, 28);
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    const time = performance.now() * 0.001;

    this.nodeMeshes.forEach(({ mesh }, index) => {
      mesh.rotation.y += 0.012;
      mesh.rotation.x += 0.006;
      const scale = 1 + 0.08 * Math.sin(time * 3 + index);
      mesh.scale.set(scale, scale, scale);
    });

    const positions = this.particlePositions;
    const vels = this.particleVelocities;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += vels[i] + 0.005 * Math.sin(time * 2 + positions[i + 2]);
      positions[i + 1] += vels[i + 1] + 0.002 * Math.cos(time * 1.5 + positions[i]);
      positions[i + 2] += vels[i + 2];

      if (positions[i] > 35) positions[i] = -35;
      if (positions[i + 1] > 15) positions[i + 1] = -15;
      if (positions[i + 2] > 25) positions[i + 2] = -25;
    }

    this.particles.geometry.attributes.position.needsUpdate = true;

    if (this.targetCamPos) {
      this.camera.position.lerp(this.targetCamPos, 0.06);
      if (this.camera.position.distanceTo(this.targetCamPos) < 0.1) {
        this.targetCamPos = null;
      }
    }

    this.renderer.render(this.scene, this.camera);
  };
}
