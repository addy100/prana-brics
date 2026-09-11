import { SlideDeckItem } from '../types';

export const PITCH_DECK_SLIDES: SlideDeckItem[] = [
  {
    id: 1,
    title: "PRANA // India-Scale Trans-boundary Climate Resilience",
    subtitle: "Predictive Regional Air-quality & Neural Action Powered by Google AI & Unified Physics",
    category: "Introduction & Mission",
    bulletPoints: [
      "Combines Einsteinian atmospheric advection-diffusion physics with Teslian harmonic sensor resonance.",
      "Empowers rural farmers & state pollution control boards with real-time, multilingual voice alerts.",
      "Integrates Google Earth Engine, Gemini 1.5 Flash multimodal vision, and Vertex AI PINN models."
    ],
    diagramType: 'arch',
    tags: ["Google AI", "Einstein + Tesla", "BRICS Track"]
  },
  {
    id: 2,
    title: "The Macro Blindspot: City-Level Monitoring Fails Corridor Science",
    subtitle: "82% of micro-plumes pass between static monitoring stations undetected",
    category: "Problem Definition",
    bulletPoints: [
      "Traditional static air monitors provide point observations, missing trans-boundary migration across 1,500 km corridors.",
      "Stubble burning in Punjab/Haryana causes massive seasonal toxic waves reaching Delhi, Bihar, and West Bengal.",
      "Macro-averages lag behind real-time ground inversions by 6 to 12 hours."
    ],
    diagramType: 'flow',
    tags: ["Problem", "India-Scale", "Corridor Inversion"]
  },
  {
    id: 3,
    title: "Einstein + Tesla: Dual Theoretical Paradigm",
    subtitle: "Continuous Vector Advection Field + Harmonic Wave Spectrum",
    category: "Scientific Breakthrough",
    equation: "\\frac{\\partial C}{\\partial t} + \\vec{u} \\cdot \\nabla C = \\nabla \\cdot (D \\nabla C) + R",
    bulletPoints: [
      "Einstein's Continuous Field: Air is treated as a geometric manifold where pollutant transport obeys partial differential advection.",
      "Tesla's Resonant Mesh: High-frequency citizen IoT & smartphone networks capture episodic surge waves via Fast Fourier Transforms (FFT).",
      "Vertex AI PINNs bridge continuous fluid dynamics with discrete neural graph updates."
    ],
    diagramType: 'math',
    tags: ["Advection PDE", "Harmonic FFT", "Vertex AI PINN"]
  },
  {
    id: 4,
    title: "Google AI Tech Stack Integration",
    subtitle: "Full-Stack Geospatial & Generative Pipeline",
    category: "System Architecture",
    bulletPoints: [
      "Google Earth Engine (GEE): Automated ingestion of Sentinel-5P TROPOMI (NO2, SO2, CO, CH4) and MODIS Active Thermal Anomalies.",
      "Gemini 1.5 Flash: Zero-cost edge visual range & Aerosol Optical Depth (AOD) calculation from citizen sky photos.",
      "Google Cloud Speech / Bhashini: Vernacular speech transcription & synthesis in Hindi, Punjabi, Tamil, Bengali, etc."
    ],
    diagramType: 'arch',
    tags: ["Earth Engine", "Gemini 1.5", "Bhashini TTS"]
  },
  {
    id: 5,
    title: "Working Flow: Source to Sky Interception",
    subtitle: "From Sangrur Stubble Fires to Municipal Webhook Alerts in Delhi",
    category: "Workflow",
    bulletPoints: [
      "1. Citizen/Farmer uploads sky photo via mobile PWA or WhatsApp bot.",
      "2. Gemini 1.5 Flash estimates extinction coefficient & optical depth.",
      "3. Vertex AI PINN predicts 72h plume migration along northwest wind vectors (ERA5).",
      "4. Automated dispatch triggered for mist cannons, bio-decomposers, and regional health advisories."
    ],
    diagramType: 'flow',
    tags: ["Workflow", "Real-Time", "90s Latency"]
  },
  {
    id: 6,
    title: "Built for India: Scale, Low-Bandwidth & Vernacular Accessibility",
    subtitle: "Inclusive technology built for rural farmers and municipal engineers",
    category: "Product & UX",
    bulletPoints: [
      "Zero hardware lock-in: runs efficiently on budget Android smartphones over 2G/3G/4G networks.",
      "Offline-first PWA caching with background sync during connectivity dropouts.",
      "Empathetic audio advisories tailored to agricultural schedules and crop bio-management."
    ],
    diagramType: 'table',
    tags: ["Vernacular", "Offline PWA", "Grassroots"]
  },
  {
    id: 7,
    title: "Multilingual Voice Dialogue Demo",
    subtitle: "Breaking Literacy & Regional Language Barriers in 10+ Indian Languages",
    category: "Live Demo",
    bulletPoints: [
      "Punjabi Query: 'ਸਾਡੇ ਖੇਤ ਵਿੱਚ ਧੂੰਆਂ ਕਦੋਂ ਤੱਕ ਸਾਫ਼ ਹੋਵੇਗਾ?' (When will the smoke clear over our field?)",
      "Instant Audio Response: 'ਪ੍ਰਾਣਾ ਅਨੁਸਾਰ ਅਗਲੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਉੱਤਰ-ਪੱਛਮੀ ਹਵਾ 3.2 km/h ਦੀ ਰਫ਼ਤਾਰ ਨਾਲ ਧੂੰਆਂ ਦਿੱਲੀ ਵੱਲ ਲੈ ਜਾਵੇਗੀ...'",
      "Hindi, Tamil, Bengali, and Marathi dialect adaptation."
    ],
    diagramType: 'table',
    tags: ["Punjabi", "Hindi", "Tamil", "Voice Interaction"]
  },
  {
    id: 8,
    title: "Data Integrity & Real-World Validation",
    subtitle: "CPCB Ground Stations + Sentinel-5P + IMD Wind Tensors",
    category: "Data Engine",
    bulletPoints: [
      "400+ Central Pollution Control Board (CPCB) continuous monitoring stations integrated via data.gov.in APIs.",
      "Sentinel-5P TROPOMI satellite rasters updated daily over the Indo-Gangetic Plain.",
      "Indian Meteorological Department (IMD) & ERA5 reanalysis wind vector grid matching."
    ],
    diagramType: 'map',
    tags: ["CPCB APIs", "Sentinel-5P", "IMD Wind"]
  },
  {
    id: 9,
    title: "Interoperability & BRICS Readiness",
    subtitle: "GeoJSON-LD + OGC Standards for Multilateral Climate Defense",
    category: "Global Strategy",
    bulletPoints: [
      "Sovereign node isolation with Flower (flwr) Differential Privacy (eps=1.2, delta=1e-5).",
      "Plug-and-play compatibility with Brazil's INPE, South Africa's CSIR, and China's CAS networks.",
      "Standardized OGC API Features & SensorThings payload schemas."
    ],
    diagramType: 'arch',
    tags: ["BRICS+", "Differential Privacy", "OGC APIs"]
  },
  {
    id: 10,
    title: "Civic, Health & Economic Impact",
    subtitle: "Preventive Interventions Reducing Healthcare Costs & Crop Losses",
    category: "Impact",
    bulletPoints: [
      "Estimated 14% reduction in peak respiratory hospitalizations via 48h advance warning.",
      "Optimized municipal asset deployment: anti-smog guns & water sprinklers deployed strictly along predicted plume corridors.",
      "Monetizable carbon credit verification for farmers using bio-decomposers instead of stubble burning."
    ],
    diagramType: 'table',
    tags: ["Health Cost", "Smart Municipalities", "Carbon Credits"]
  },
  {
    id: 11,
    title: "4-Phase Scale Roadmap (0 to 1,000+ Nodes)",
    subtitle: "From Indo-Gangetic Corridor Pilot to Global BRICS Federation",
    category: "Execution Plan",
    bulletPoints: [
      "Phase 1 (M01-M03): Satellite & PWA Optical Ingestion Core.",
      "Phase 2 (M04-M07): Flower Federated Consensus & PINN ST-GNN Training.",
      "Phase 3 (M08-M11): Indo-Gangetic & Pearl River Corridor Pilot Gateways.",
      "Phase 4 (M12+): 1,000+ Sovereign Academic & Enterprise Nodes across BRICS+."
    ],
    diagramType: 'flow',
    tags: ["Phase 1-4", "1000+ Nodes", "Scale"]
  },
  {
    id: 12,
    title: "Conclusion & Call to Action",
    subtitle: "Clean Air is a Fundamental Human Right: Uniting Physics, AI & Community",
    category: "Call to Action",
    bulletPoints: [
      "PRANA delivers an open, scalable, physics-informed climate radar built on Google AI.",
      "Bridge the gap between macro satellite policy and grassroots agricultural reality.",
      "Explore the live interactive 3D web application and GitHub blueprint repository today!"
    ],
    diagramType: 'arch',
    tags: ["PRANA-BRICS", "Google AI", "Deploy Now"]
  }
];
