import { BackendClient } from './backendClient';
import { SampleSkyPhoto } from '../types';

export class SkyAnalyzerModule {
  private container: HTMLElement;
  private backendClient: BackendClient;
  private selectedSample?: SampleSkyPhoto;

  // Curated SVG DataURIs representing sample sky scenarios
  private samplePhotos: SampleSkyPhoto[] = [
    {
      id: 'sample-1',
      name: 'Punjab Stubble Smog',
      description: 'Dense agricultural smoke plume over Sangrur fields',
      aod: 1.85,
      category: 'Stubble Burn',
      mimeType: 'image/svg+xml',
      svgUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%2378350f"/><rect y="100" width="300" height="100" fill="%23b45309"/><circle cx="150" cy="70" r="40" fill="%23f59e0b" opacity="0.5"/><path d="M0 120 Q 75 80, 150 120 T 300 120 L 300 200 L 0 200 Z" fill="%23451a03" opacity="0.8"/></svg>',
      base64Data: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzc4MzUwZiIvPjxyZWN0IHk9IjEwMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNiNDUzMDkiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSI3MCIgcj0iNDAiIGZpbGw9IiNmNTllMGIiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg=='
    },
    {
      id: 'sample-2',
      name: 'Delhi Anand Vihar Inversion',
      description: 'Severe boundary layer smog over industrial corridor',
      aod: 2.15,
      category: 'Hazardous Smog',
      mimeType: 'image/svg+xml',
      svgUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23334155"/><rect y="120" width="300" height="80" fill="%230f172a"/><line x1="50" y1="180" x2="50" y2="100" stroke="%2364748b" stroke-width="8"/><circle cx="50" cy="90" r="15" fill="%2394a3b8" opacity="0.6"/></svg>',
      base64Data: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzNDE1NSIvPjwvc3ZnPg=='
    },
    {
      id: 'sample-3',
      name: 'Moderate Haze - Rohtak',
      description: 'Mid-afternoon dust & vehicular emission haze',
      aod: 0.75,
      category: 'Moderate',
      mimeType: 'image/svg+xml',
      svgUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%230284c7"/><rect y="140" width="300" height="60" fill="%231e293b"/><circle cx="220" cy="50" r="30" fill="%23fbbf24" opacity="0.8"/></svg>',
      base64Data: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAyODRjNyIvPjwvc3ZnPg=='
    },
    {
      id: 'sample-4',
      name: 'Clear Atmospheric Baseline',
      description: 'Post-monsoon clean horizon in Himachal border',
      aod: 0.15,
      category: 'Clean Baseline',
      mimeType: 'image/svg+xml',
      svgUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%230369a1"/><polygon points="0,200 80,120 160,200" fill="%23065f46"/><polygon points="120,200 200,90 280,200" fill="%23047857"/></svg>',
      base64Data: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAzNjlhMSIvPjwvc3ZnPg=='
    }
  ];

  constructor(containerId: string, backendClient: BackendClient) {
    this.container = document.getElementById(containerId)!;
    this.backendClient = backendClient;
    this.render();
  }

  private render() {
    this.container.innerHTML = `
      <div class="panel-title">
        <span>Citizen Sky Vision (Gemini 1.5)</span>
        <span class="badge">AOD Optical Depth</span>
      </div>
      <p class="panel-subtitle">Upload a sky photograph or pick a sample photo to calculate visual extinction coefficient & Aerosol Optical Depth (AOD).</p>

      <div class="form-group">
        <label class="form-label">Select Curated Sample Sky Photo:</label>
        <div class="sample-grid" id="sample-photo-grid">
          ${this.samplePhotos.map(sample => `
            <div class="sample-card" data-id="${sample.id}">
              <img src="${sample.svgUrl}" class="sample-img-preview" alt="${sample.name}" />
              <div class="sample-title">${sample.name}</div>
              <div class="sample-desc">${sample.category} • AOD ${sample.aod}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Or Upload Custom Horizon Image:</label>
        <input type="file" id="sky-file-input" accept="image/*" style="width: 100%; color: #94a3b8; font-size: 12px;" />
      </div>

      <div class="form-group">
        <label class="form-label">Target Advisory Language:</label>
        <select id="sky-lang-select" style="width: 100%; padding: 8px; background: #0f172a; color: #fff; border: 1px solid #334155; border-radius: 6px; font-size: 12px;">
          <option value="Hindi">Hindi (हिंदी)</option>
          <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
          <option value="Tamil">Tamil (தமிழ்)</option>
          <option value="Bengali">Bengali (বাংলা)</option>
          <option value="English">English</option>
        </select>
      </div>

      <button id="btn-run-sky-analysis" class="btn-primary">
        <span>Run Gemini Optical Inspection</span>
      </button>

      <div id="sky-analysis-result" class="analysis-output" style="display: none;"></div>
    `;

    this.bindEvents();
  }

  private bindEvents() {
    // Select sample photo card
    const cards = this.container.querySelectorAll('.sample-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const id = card.getAttribute('data-id');
        this.selectedSample = this.samplePhotos.find(s => s.id === id);
      });
    });

    // Default select first sample
    if (cards.length > 0) {
      (cards[0] as HTMLElement).click();
    }

    // Run analysis button
    const btn = this.container.querySelector('#btn-run-sky-analysis') as HTMLButtonElement;
    const output = this.container.querySelector('#sky-analysis-result') as HTMLElement;
    const langSelect = this.container.querySelector('#sky-lang-select') as HTMLSelectElement;
    const fileInput = this.container.querySelector('#sky-file-input') as HTMLInputElement;

    btn.addEventListener('click', async () => {
      output.style.display = 'block';
      output.innerHTML = 'Analyzing atmospheric aerosol optical depth via Gemini 1.5 Flash...';

      let base64 = '';
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        base64 = await this.fileToBase64(file);
      } else if (this.selectedSample) {
        base64 = this.selectedSample.base64Data;
      }

      if (!base64) {
        output.innerHTML = 'Please select a sample photo or upload an image file.';
        return;
      }

      const language = langSelect.value;
      const result = await this.backendClient.analyzeSkyImage(base64, language);
      output.innerHTML = result;
    });
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
