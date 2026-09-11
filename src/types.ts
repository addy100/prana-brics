import * as THREE from 'three';

export interface Milestone {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
  techStack: string;
  position: THREE.Vector3;
  color: number;
}

export interface CorridorStation {
  id: string;
  station: string;
  state: string;
  lat: number;
  lon: number;
  pm25: number;
  pm10: number;
  no2: number;
  wind_speed: number;
  wind_dir: number;
  status: 'Critical' | 'Severe' | 'Moderate' | 'Good';
}

export interface ForecastDay {
  date: string;
  projected_pm25: number;
  primary_factor: string;
  recommended_action: string;
}

export interface SlideDeckItem {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  bulletPoints: string[];
  diagramType: 'arch' | 'math' | 'flow' | 'table' | 'map';
  equation?: string;
  codeSnippet?: string;
  tags: string[];
}

export interface SampleSkyPhoto {
  id: string;
  name: string;
  description: string;
  aod: number;
  category: string;
  svgUrl: string;
  mimeType: string;
  base64Data: string;
}
