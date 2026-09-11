import { BackendClient } from './backendClient';

export class VoiceAdvisoryModule {
  private container: HTMLElement;
  private backendClient: BackendClient;
  private synth: SpeechSynthesis;

  private sampleQueries: Record<string, { label: string; query: string }[]> = {
    Hindi: [
      { label: 'खेत में धुआं', query: 'हमारे क्षेत्र में पराली का धुआं कब तक साफ होगा?' },
      { label: 'स्वास्थ्य सलाह', query: 'बुजुर्गों के लिए आज बाहर टहलना सुरक्षित है या नहीं?' },
      { label: 'सरकारी कार्रवाई', query: 'प्रदूषण नियंत्रण बोर्ड क्या कदम उठा रहा है?' }
    ],
    Punjabi: [
      { label: 'ਖੇਤਾਂ ਦਾ ਧੂੰਆਂ', query: 'ਸਾਡੇ ਖੇਤ ਵਿੱਚ ਧੂੰਆਂ ਕਦੋਂ ਤੱਕ ਸਾਫ਼ ਹੋਵੇਗਾ?' },
      { label: 'ਸਿਹਤ ਸਲਾਹ', query: 'ਬਜ਼ੁਰਗਾਂ ਲਈ ਅੱਜ ਬਾਹਰ ਜਾਣਾ ਸੁਰੱਖਿਅਤ ਹੈ?' },
      { label: 'ਪਰਾਲੀ ਦਾ ਹੱਲ', query: 'ਬਾਇਓ-ਡੀਕੰਪੋਜ਼ਰ ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ?' }
    ],
    Tamil: [
      { label: 'காற்றின் தரம்', query: 'இன்று வெளியில் செல்வது பாதுகாப்பானதா?' },
      { label: 'சுகாதார ஆலோசனை', query: 'முதியவர்களுக்கான பாதுகாப்பு வழிமுறைகள் என்ன?' }
    ],
    English: [
      { label: 'Corridor Forecast', query: 'What is the projected PM2.5 advection vector for Delhi over the next 48 hours?' },
      { label: 'Health Alert', query: 'Are outdoor agricultural activities recommended today?' }
    ]
  };

  constructor(containerId: string, backendClient: BackendClient) {
    this.container = document.getElementById(containerId)!;
    this.backendClient = backendClient;
    this.synth = window.speechSynthesis;
    this.render();
  }

  private render() {
    this.container.innerHTML = `
      <div class="panel-title">
        <span>Multilingual Voice Action Engine</span>
        <span class="badge">Bhashini / Speech-to-Text</span>
      </div>
      <p class="panel-subtitle">Grassroots voice dialogue for farmers & municipal officers in vernacular Indian dialects.</p>

      <div class="form-group">
        <label class="form-label">Select Regional Vernacular Language:</label>
        <select id="voice-lang-select" style="width: 100%; padding: 8px; background: #0f172a; color: #fff; border: 1px solid #334155; border-radius: 6px; font-size: 12px;">
          <option value="Hindi">Hindi (हिंदी)</option>
          <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
          <option value="Tamil">Tamil (தமிழ்)</option>
          <option value="English">English</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Choose Common Query Template:</label>
        <div id="voice-query-pills" style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px;"></div>
      </div>

      <div class="form-group">
        <label class="form-label">Or Type Voice Query Prompt:</label>
        <textarea id="voice-query-text" rows="3" style="width: 100%; padding: 10px; background: #0f172a; color: #fff; border: 1px solid #334155; border-radius: 8px; font-size: 12px; font-family: inherit; resize: vertical;" placeholder="Type query in your chosen language..."></textarea>
      </div>

      <button id="btn-submit-voice" class="btn-primary">
        <span>Synthesize Vernacular Audio Advisory</span>
      </button>

      <div id="voice-response-box" class="analysis-output" style="display: none;"></div>

      <button id="btn-play-audio" class="btn-primary" style="margin-top: 10px; background: linear-gradient(135deg, #059669, #0d9488); display: none;">
        <span>🔊 Play Synthesized Audio (Speech Synthesis)</span>
      </button>
    `;

    this.bindEvents();
    this.updateQueryPills('Hindi');
  }

  private bindEvents() {
    const langSelect = this.container.querySelector('#voice-lang-select') as HTMLSelectElement;
    const queryInput = this.container.querySelector('#voice-query-text') as HTMLTextAreaElement;
    const btnSubmit = this.container.querySelector('#btn-submit-voice') as HTMLButtonElement;
    const btnPlay = this.container.querySelector('#btn-play-audio') as HTMLButtonElement;
    const responseBox = this.container.querySelector('#voice-response-box') as HTMLElement;

    let currentResponseText = '';

    langSelect.addEventListener('change', () => {
      const lang = langSelect.value;
      this.updateQueryPills(lang);
    });

    btnSubmit.addEventListener('click', async () => {
      const query = queryInput.value.trim();
      const language = langSelect.value;

      if (!query) {
        responseBox.style.display = 'block';
        responseBox.innerHTML = 'Please select or type a query prompt.';
        return;
      }

      responseBox.style.display = 'block';
      responseBox.innerHTML = 'Synthesizing voice response with Google Cloud Speech & Gemini AI...';

      const responseText = await this.backendClient.getVoiceAdvisory(query, language);
      currentResponseText = responseText;
      responseBox.innerHTML = `<strong>Synthesized Advisory (${language}):</strong>\n${responseText}`;

      btnPlay.style.display = 'flex';
    });

    btnPlay.addEventListener('click', () => {
      if (!currentResponseText) return;
      this.speakText(currentResponseText, langSelect.value);
    });
  }

  private updateQueryPills(language: string) {
    const pillsContainer = this.container.querySelector('#voice-query-pills') as HTMLElement;
    const queryInput = this.container.querySelector('#voice-query-text') as HTMLTextAreaElement;
    const queries = this.sampleQueries[language] || this.sampleQueries['English'];

    pillsContainer.innerHTML = queries.map((q, idx) => `
      <button class="pill-btn" data-idx="${idx}" style="padding: 4px 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 999px; color: #38bdf8; font-size: 11px; cursor: pointer;">
        ${q.label}
      </button>
    `).join('');

    const btns = pillsContainer.querySelectorAll('.pill-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx') || '0', 10);
        queryInput.value = queries[idx].query;
      });
    });

    if (queries.length > 0) {
      queryInput.value = queries[0].query;
    }
  }

  private speakText(text: string, language: string) {
    if (!this.synth) {
      alert('Browser Speech Synthesis not supported in this environment.');
      return;
    }

    this.synth.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);

    const langCodes: Record<string, string> = {
      Hindi: 'hi-IN',
      Punjabi: 'pa-IN',
      Tamil: 'ta-IN',
      English: 'en-IN'
    };

    utterance.lang = langCodes[language] || 'en-US';
    utterance.rate = 0.95;
    this.synth.speak(utterance);
  }
}
