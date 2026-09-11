import * as THREE from 'three';
import { Milestone } from '../types';

export const ROADMAP_STAGES: Milestone[] = [
  {
    phase: "Phase 1: M01-M03",
    title: "Multi-Source Sensory Fusion Core",
    description: "Build ingestion pipelines for Sentinel-5P satellite bands and a mobile PWA module extracting Optical Depth from citizen photos using vision transformers.",
    deliverables: [
      "Automated Earth Engine TROPOMI puller (NO2, SO2, CO, CH4)",
      "Mobile Vision-Depth ML edge pipeline (MobileNetV4/ViT)",
      "Protobuf sensor streaming over Apache Pulsar"
    ],
    techStack: "Python, FastAPI, Apache Pulsar, TensorFlow Lite, Google Earth Engine",
    position: new THREE.Vector3(-15, 0, 0),
    color: 0x10b981 // Emerald
  },
  {
    phase: "Phase 2: M04-M07",
    title: "Differential Federated Spatio-Temporal Mesh",
    description: "Launch Flower federated consensus layer across isolated sovereign nodes. Train Spatio-Temporal GNNs with ERA5 wind vectors to predict corridor plume drift.",
    deliverables: [
      "Flower (flwr) secure FedAvg server node coordinator",
      "ST-GNN model tracking trans-boundary flux & PDE advection",
      "Differential privacy engine with (eps=1.2, delta=1e-5)"
    ],
    techStack: "Flower, PyTorch Geometric, LibND4J, Docker Sovereign Enclaves",
    position: new THREE.Vector3(-5, 3, -4),
    color: 0x06b6d4 // Cyan
  },
  {
    phase: "Phase 3: M08-M11",
    title: "Cross-Border Corridors & Action Gateways",
    description: "Deploy pilot deployments on the Indo-Gangetic Plains (Punjab-Delhi-UP) and Pearl River Delta corridors. Link to automated emergency response webhooks.",
    deliverables: [
      "Sub-kilometer alert dispatcher (< 90s response latency)",
      "Public OpenAQ + GeoJSON OGC REST API suite",
      "Cross-border dynamic municipal action dashboard"
    ],
    techStack: "Go, TimescaleDB, PostGIS, Redis Streams, Mapbox GL",
    position: new THREE.Vector3(5, -2, 4),
    color: 0x6366f1 // Indigo
  },
  {
    phase: "Phase 4: M12+",
    title: "BRICS Scale & Multilateral Sovereign Nodes",
    description: "Expansion to 1,000+ active enterprise & academic nodes across BRICS+. Integration of municipal carbon balance verification and resource dispatch.",
    deliverables: [
      "Multi-tenant sovereign node coordinator across ISRO/INPE/CAS",
      "Automated drone payload dispatch protocol for anti-smog units",
      "Sovereign policy attribution & carbon credit modeling"
    ],
    techStack: "Kubernetes, Apache Iceberg, Rust Micro-dispatchers, WASM",
    position: new THREE.Vector3(15, 1, 0),
    color: 0xf59e0b // Amber
  }
];
