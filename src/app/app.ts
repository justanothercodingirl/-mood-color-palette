import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ColorPaletteService, ColorPalette, AccessibilityInfo } from './color-palette.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mood-color-palette');
  moodInput = signal('');
  currentPalette = signal<ColorPalette | null>(null);
  moodSuggestions = signal<string[]>([]);
  showSuggestions = signal(false);

  // New features
  moodInput2 = signal('');
  showMoodMixer = signal(false);
  mixedPalette = signal<ColorPalette | null>(null);
  gradientStyle = signal<string | null>(null);
  accessibilityData = signal<AccessibilityInfo[]>([]);
  showAccessibility = signal(false);

  constructor(private colorPaletteService: ColorPaletteService) {
    this.moodSuggestions.set(this.colorPaletteService.getMoodSuggestions());
  }

  searchPalette(): void {
    if (!this.moodInput().trim()) {
      this.currentPalette.set(null);
      this.accessibilityData.set([]);
      return;
    }
    const palette = this.colorPaletteService.getPaletteByMood(this.moodInput());
    this.currentPalette.set(palette);
    this.showSuggestions.set(false);
    this.mixedPalette.set(null);
    this.updateAccessibilityInfo(palette);
    this.generateGradient(palette);
  }

  selectMood(mood: string): void {
    this.moodInput.set(mood);
    const palette = this.colorPaletteService.getPaletteByMood(mood);
    this.currentPalette.set(palette);
    this.showSuggestions.set(false);
    this.updateAccessibilityInfo(palette);
    this.generateGradient(palette);
  }

  getRandomPalette(): void {
    const palette = this.colorPaletteService.getRandomPalette();
    if (palette) {
      this.currentPalette.set(palette);
      this.moodInput.set(palette.mood);
      this.mixedPalette.set(null);
      this.updateAccessibilityInfo(palette);
      this.generateGradient(palette);
    }
  }

  toggleMoodMixer(): void {
    this.showMoodMixer.set(!this.showMoodMixer());
    if (!this.showMoodMixer()) {
      this.mixedPalette.set(null);
      this.moodInput2.set('');
    }
  }

  mixMoods(): void {
    if (!this.moodInput().trim() || !this.moodInput2().trim()) {
      return;
    }
    const mixed = this.colorPaletteService.mixMoods(
      this.moodInput(),
      this.moodInput2()
    );
    this.mixedPalette.set(mixed);
    if (mixed) {
      this.updateAccessibilityInfo(mixed);
      this.generateGradient(mixed);
    }
  }

  private generateGradient(palette: ColorPalette | null): void {
    if (palette) {
      const gradient = this.colorPaletteService.generateGradient(palette.hex);
      this.gradientStyle.set(gradient);
    }
  }

  private updateAccessibilityInfo(palette: ColorPalette | null): void {
    if (palette) {
      const accessibility = palette.hex.map((hex, i) =>
        this.colorPaletteService.getAccessibilityInfo(hex, palette.colors[i])
      );
      this.accessibilityData.set(accessibility);
    }
  }

  toggleAccessibility(): void {
    this.showAccessibility.set(!this.showAccessibility());
  }

  downloadPalette(format: 'json' | 'css'): void {
    const paletteToDownload = this.mixedPalette() || this.currentPalette();
    if (paletteToDownload) {
      this.colorPaletteService.downloadPalette(paletteToDownload, format);
    }
  }

  onInputFocus(): void {
    this.showSuggestions.set(true);
  }

  onInputBlur(): void {
    setTimeout(() => this.showSuggestions.set(false), 200);
  }

  handleKeypress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchPalette();
    }
  }
}
