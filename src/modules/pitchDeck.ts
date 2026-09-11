import { PITCH_DECK_SLIDES } from '../data/pitchDeckData';
import { SlideDeckItem } from '../types';

export class PitchDeckModule {
  private modal: HTMLElement;
  private currentSlideIndex = 0;

  constructor(modalId: string) {
    this.modal = document.getElementById(modalId)!;
    this.render();
  }

  private render() {
    this.modal.innerHTML = `
      <div class="slide-header">
        <div class="slide-num" id="slide-number">Slide 1 / 12</div>
        <div style="font-size: 13px; font-weight: 700; color: #38bdf8;" id="slide-category">Category</div>
        <div class="slide-nav-btns">
          <button class="nav-arrow-btn" id="btn-prev-slide">← Prev</button>
          <button class="nav-arrow-btn" id="btn-next-slide">Next →</button>
          <button class="nav-arrow-btn" id="btn-close-deck" style="background: rgba(244, 63, 94, 0.2); border-color: rgba(244, 63, 94, 0.4); color: #f43f5e;">✕ Close</button>
        </div>
      </div>

      <div class="slide-title" id="slide-title">Title</div>
      <div class="slide-subtitle" id="slide-subtitle">Subtitle</div>

      <div class="slide-body" id="slide-body"></div>

      <div id="slide-equation-container"></div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px;" id="slide-tags"></div>
    `;

    this.bindEvents();
    this.showSlide(0);
  }

  private bindEvents() {
    const btnPrev = this.modal.querySelector('#btn-prev-slide') as HTMLButtonElement;
    const btnNext = this.modal.querySelector('#btn-next-slide') as HTMLButtonElement;
    const btnClose = this.modal.querySelector('#btn-close-deck') as HTMLButtonElement;

    btnPrev.addEventListener('click', () => this.prevSlide());
    btnNext.addEventListener('click', () => this.nextSlide());
    btnClose.addEventListener('click', () => this.hide());

    window.addEventListener('keydown', (e) => {
      if (this.modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
        if (e.key === 'Escape') this.hide();
      }
    });
  }

  public showSlide(index: number) {
    if (index < 0) index = 0;
    if (index >= PITCH_DECK_SLIDES.length) index = PITCH_DECK_SLIDES.length - 1;

    this.currentSlideIndex = index;
    const slide: SlideDeckItem = PITCH_DECK_SLIDES[index];

    (this.modal.querySelector('#slide-number') as HTMLElement).innerText = `Slide ${slide.id} / ${PITCH_DECK_SLIDES.length}`;
    (this.modal.querySelector('#slide-category') as HTMLElement).innerText = slide.category;
    (this.modal.querySelector('#slide-title') as HTMLElement).innerText = slide.title;
    (this.modal.querySelector('#slide-subtitle') as HTMLElement).innerText = slide.subtitle;

    const bodyContainer = this.modal.querySelector('#slide-body') as HTMLElement;
    bodyContainer.innerHTML = `
      <ul>
        ${slide.bulletPoints.map(bullet => `<li>${bullet}</li>`).join('')}
      </ul>
    `;

    const eqContainer = this.modal.querySelector('#slide-equation-container') as HTMLElement;
    if (slide.equation) {
      eqContainer.innerHTML = `<div class="equation-box">${slide.equation}</div>`;
    } else {
      eqContainer.innerHTML = '';
    }

    const tagsContainer = this.modal.querySelector('#slide-tags') as HTMLElement;
    tagsContainer.innerHTML = slide.tags.map(t => `
      <span class="badge" style="margin-bottom: 0;">${t}</span>
    `).join('');
  }

  public nextSlide() {
    this.showSlide(this.currentSlideIndex + 1);
  }

  public prevSlide() {
    this.showSlide(this.currentSlideIndex - 1);
  }

  public show() {
    this.modal.classList.add('active');
  }

  public hide() {
    this.modal.classList.remove('active');
  }
}
