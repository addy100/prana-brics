import { CorridorScene } from './three/scene';
import { BackendClient } from './modules/backendClient';
import { SkyAnalyzerModule } from './modules/skyAnalyzer';
import { CorridorRadarModule } from './modules/corridorRadar';
import { VoiceAdvisoryModule } from './modules/voiceAdvisory';
import { PitchDeckModule } from './modules/pitchDeck';
import { ROADMAP_STAGES } from './data/roadmapData';
import { Milestone } from './types';

class App {
  private scene!: CorridorScene;
  private backendClient!: BackendClient;
  private skyAnalyzer!: SkyAnalyzerModule;
  private corridorRadar!: CorridorRadarModule;
  private voiceAdvisory!: VoiceAdvisoryModule;
  private pitchDeck!: PitchDeckModule;

  constructor() {
    this.init();
  }

  private init() {
    this.backendClient = new BackendClient();

    // Initialize 3D Three.js Scene
    this.scene = new CorridorScene('canvas-container', (milestone: Milestone) => {
      this.updateNodeDetails(milestone);
    });

    // Initialize Modules
    this.skyAnalyzer = new SkyAnalyzerModule('panel-sky-vision', this.backendClient);
    this.corridorRadar = new CorridorRadarModule('panel-corridor-radar', this.backendClient);
    this.voiceAdvisory = new VoiceAdvisoryModule('panel-voice-engine', this.backendClient);
    this.pitchDeck = new PitchDeckModule('pitch-modal');

    this.bindNavigation();
    this.bindPhaseButtons();
  }

  private bindNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const overlay = document.getElementById('overlay')!;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');

        if (tab === 'pitch-deck') {
          this.pitchDeck.show();
          return;
        }

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabPanels.forEach(p => p.classList.remove('active'));

        if (tab === 'roadmap') {
          overlay.style.display = 'block';
          this.scene.resetCamera();
        } else {
          overlay.style.display = 'none';
          const targetPanel = document.getElementById(`panel-${tab}`);
          if (targetPanel) {
            targetPanel.classList.add('active');
          }
        }
      });
    });
  }

  private bindPhaseButtons() {
    const phaseBtns = document.querySelectorAll('.phase-btn');
    phaseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-phase') || '0', 10);
        const stage = ROADMAP_STAGES[index];
        if (stage) {
          this.scene.focusOnNode(stage);
          this.updateNodeDetails(stage);
        }
      });
    });
  }

  private updateNodeDetails(stage: Milestone) {
    const titleEl = document.getElementById('detail-title');
    const descEl = document.getElementById('detail-desc');
    const deliverablesEl = document.getElementById('detail-deliverables');
    const stackEl = document.getElementById('detail-stack');

    if (titleEl) titleEl.innerText = `${stage.phase}: ${stage.title}`;
    if (descEl) descEl.innerText = stage.description;
    if (deliverablesEl) {
      deliverablesEl.innerHTML = stage.deliverables.map(d => `<li>${d}</li>`).join('');
    }
    if (stackEl) {
      stackEl.innerHTML = `<code>${stage.techStack}</code>`;
    }
  }
}

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
