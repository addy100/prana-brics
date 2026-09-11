import { BackendClient } from './backendClient';
import { CORRIDOR_STATIONS } from '../data/corridorData';

export class CorridorRadarModule {
  private container: HTMLElement;
  private backendClient: BackendClient;

  constructor(containerId: string, backendClient: BackendClient) {
    this.container = document.getElementById(containerId)!;
    this.backendClient = backendClient;
    this.render();
  }

  private render() {
    this.container.innerHTML = `
      <div class="panel-title">
        <span>Einsteinian Advection Radar</span>
        <span class="badge">CPCB Feeds + PDE Vector</span>
      </div>
      <p class="panel-subtitle">Calculates transport vector $\\vec{u} \\cdot \\nabla C$ along 300° wind direction & Teslian harmonic surge pulses across ground monitoring stations.</p>

      <div class="detail-block">
        <h4>Physics Equation (Advection-Diffusion PDE)</h4>
        <div style="font-family: monospace; font-size: 11px; color: #38bdf8; margin-top: 4px;">
          ∂C/∂t + u · ∇C = ∇ · (D ∇C) + R
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Active Corridor Ground Stations (CPCB APIs):</label>
        <div id="corridor-station-list">
          ${CORRIDOR_STATIONS.map(st => `
            <div class="station-card">
              <div class="station-info">
                <h4>${st.station}</h4>
                <p>${st.state} • Lat ${st.lat}, Lon ${st.lon}</p>
                <p style="color: #7dd3fc; margin-top: 2px;">Wind: ${st.wind_speed} m/s @ ${st.wind_dir}° (NW Vector)</p>
              </div>
              <div class="station-pm">
                <div class="pm-value ${st.status.toLowerCase()}">${st.pm25}</div>
                <div style="font-size: 10px; color: #94a3b8;">PM2.5 µg/m³</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Select Target City for 72h PDE Forecast:</label>
        <select id="forecast-city-select" style="width: 100%; padding: 8px; background: #0f172a; color: #fff; border: 1px solid #334155; border-radius: 6px; font-size: 12px;">
          <option value="Delhi">Delhi NCR (Downwind Corridor)</option>
          <option value="Jalandhar">Jalandhar, Punjab (Source Node)</option>
          <option value="Noida">Noida, UP (Eastern Drift)</option>
          <option value="Rohtak">Rohtak, Haryana (Mid Corridor)</option>
        </select>
      </div>

      <button id="btn-compute-forecast" class="btn-primary">
        <span>Compute Physics-Informed Forecast</span>
      </button>

      <div id="forecast-output" class="analysis-output" style="display: none;"></div>
    `;

    this.bindEvents();
  }

  private bindEvents() {
    const btn = this.container.querySelector('#btn-compute-forecast') as HTMLButtonElement;
    const output = this.container.querySelector('#forecast-output') as HTMLElement;
    const citySelect = this.container.querySelector('#forecast-city-select') as HTMLSelectElement;

    btn.addEventListener('click', async () => {
      output.style.display = 'block';
      output.innerHTML = 'Executing Vertex AI Physics-Informed Neural Network (PINN)...';

      const targetCity = citySelect.value;
      const forecastDays = await this.backendClient.getCorridorForecast(targetCity, 3);

      output.innerHTML = `
        <strong style="color: #38bdf8;">72-Hour Corridor Forecast for ${targetCity}:</strong>\n\n` +
        forecastDays.map(day => `
• <strong>${day.date}:</strong> <span style="color: #f43f5e; font-weight: bold;">${day.projected_pm25} µg/m³</span>
  <em>Factor:</em> ${day.primary_factor}
  <em>Action:</em> ${day.recommended_action}
        `).join('\n\n');
    });
  }
}
