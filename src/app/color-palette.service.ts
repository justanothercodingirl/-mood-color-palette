import { Injectable } from '@angular/core';

export interface ColorPalette {
  mood: string;
  colors: string[];
  hex: string[];
  psychology?: string;
}

export interface AccessibilityInfo {
  hex: string;
  color: string;
  luminance: number;
  wcag: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColorPaletteService {
  private moodPalettes: { [key: string]: ColorPalette } = {
    happy: {
      mood: 'Happy',
      colors: ['Sunny Yellow', 'Warm Orange', 'Light Gold', 'Bright Lime', 'Sky Blue'],
      hex: ['#FFD700', '#FF8C00', '#FFA500', '#ADFF2F', '#87CEEB'],
      psychology: 'Bright yellows and oranges evoke warmth, optimism, and energy. These colors boost mood and encourage social interaction.'
    },
    sad: {
      mood: 'Sad',
      colors: ['Slate Blue', 'Deep Blue', 'Gray', 'Dark Indigo', 'Charcoal'],
      hex: ['#708090', '#00008B', '#808080', '#191970', '#36454F'],
      psychology: 'Cool, muted tones create introspection and contemplation. Deep blues and grays convey melancholy and emotional depth.'
    },
    calm: {
      mood: 'Calm',
      colors: ['Soft Mint', 'Pale Blue', 'Lavender', 'Seafoam', 'Light Teal'],
      hex: ['#98FF98', '#B0E0E6', '#E6E6FA', '#93E9BE', '#AFEEEE'],
      psychology: 'Soft pastels and cool hues promote relaxation and peace. Blues and greens lower heart rate and encourage tranquility.'
    },
    energetic: {
      mood: 'Energetic',
      colors: ['Hot Pink', 'Electric Purple', 'Lime Green', 'Neon Orange', 'Bright Red'],
      hex: ['#FF1493', '#9D00FF', '#00FF00', '#FF6600', '#FF0000'],
      psychology: 'Vibrant, saturated colors stimulate excitement and action. High contrast and brightness increase alertness and enthusiasm.'
    },
    romantic: {
      mood: 'Romantic',
      colors: ['Rose', 'Blush Pink', 'Mauve', 'Dusty Rose', 'Burgundy'],
      hex: ['#FF007F', '#FFB6C1', '#E0B0FF', '#DCAE96', '#800020'],
      psychology: 'Soft reds and pinks symbolize love, affection, and passion. These colors create warmth and emotional connection.'
    },
    mysterious: {
      mood: 'Mysterious',
      colors: ['Deep Purple', 'Midnight Black', 'Dark Gray', 'Navy', 'Plum'],
      hex: ['#371B58', '#0B0014', '#2F2F2F', '#000080', '#843B62'],
      psychology: 'Dark, deep tones create intrigue and sophistication. Purples suggest magic and mystery, blacks add formality and depth.'
    },
    peaceful: {
      mood: 'Peaceful',
      colors: ['Cream', 'Pale Green', 'Soft White', 'Sage Green', 'Ivory'],
      hex: ['#FFFDD0', '#C1E1C1', '#F5F5F0', '#9DC183', '#FFFFF0'],
      psychology: 'Neutral, light colors evoke serenity and harmony. Nature-inspired greens and whites create a sense of security.'
    },
    creative: {
      mood: 'Creative',
      colors: ['Turquoise', 'Coral', 'Magenta', 'Golden Yellow', 'Teal'],
      hex: ['#40E0D0', '#FF7F50', '#FF00FF', '#FFD700', '#008080'],
      psychology: 'Bold, unconventional color combinations spark imagination. Teals and magentas encourage innovation and self-expression.'
    },
    melancholic: {
      mood: 'Melancholic',
      colors: ['Dusty Blue', 'Muted Purple', 'Grayish Green', 'Ash', 'Dark Taupe'],
      hex: ['#5B7C99', '#9B8AA1', '#8B9D6D', '#B2AEAA', '#6B5A47'],
      psychology: 'Desaturated, muted tones convey sadness and nostalgia. These sophisticated colors suggest depth and emotional complexity.'
    },
    playful: {
      mood: 'Playful',
      colors: ['Bubble Gum Pink', 'Sunny Yellow', 'Aquamarine', 'Peach', 'Mint Green'],
      hex: ['#FF69B4', '#FFFF00', '#7FFFD4', '#FFDAB9', '#98FF98'],
      psychology: 'Fun, bright colors encourage joy and lightheartedness. Mix of warm and cool tones creates dynamic, youthful energy.'
    }
  };

  constructor() { }

  getPaletteByMood(mood: string): ColorPalette | null {
    const normalizedMood = mood.toLowerCase().trim();
    return this.moodPalettes[normalizedMood] || null;
  }

  getMoodSuggestions(): string[] {
    return Object.keys(this.moodPalettes).map(key => this.moodPalettes[key].mood);
  }

  downloadPalette(palette: ColorPalette, format: 'json' | 'css' = 'json'): void {
    let content = '';
    let filename = '';

    if (format === 'json') {
      content = JSON.stringify({
        mood: palette.mood,
        colors: palette.colors,
        hexCodes: palette.hex
      }, null, 2);
      filename = `${palette.mood.toLowerCase()}-palette.json`;
    } else {
      content = this.generateCSSVariables(palette);
      filename = `${palette.mood.toLowerCase()}-palette.css`;
    }

    this.triggerDownload(content, filename);
  }

  private generateCSSVariables(palette: ColorPalette): string {
    let css = `:root {\n`;
    palette.hex.forEach((hex, index) => {
      css += `  --color-${index + 1}: ${hex};\n`;
      css += `  --color-${index + 1}-name: "${palette.colors[index]}";\n`;
    });
    css += `}\n\n`;
    css += `/* ${palette.mood} Color Palette */\n`;
    palette.hex.forEach((hex, index) => {
      css += `.${palette.mood.toLowerCase()}-color-${index + 1} { background-color: ${hex}; }\n`;
    });
    return css;
  }

  private triggerDownload(content: string, filename: string): void {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  getRandomPalette(): ColorPalette | null {
    const moods = Object.keys(this.moodPalettes);
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    return this.moodPalettes[randomMood];
  }

  mixMoods(mood1: string, mood2: string): ColorPalette | null {
    const palette1 = this.getPaletteByMood(mood1);
    const palette2 = this.getPaletteByMood(mood2);

    if (!palette1 || !palette2) return null;

    const mixedHex = palette1.hex.slice(0, 3).concat(palette2.hex.slice(2, 4));
    const mixedColors = palette1.colors.slice(0, 3).concat(palette2.colors.slice(2, 4));

    return {
      mood: `${palette1.mood} + ${palette2.mood}`,
      colors: mixedColors,
      hex: mixedHex,
      psychology: `Combines ${palette1.mood.toLowerCase()} vibrancy with ${palette2.mood.toLowerCase()} essence.`
    };
  }

  generateGradient(hexColors: string[]): string {
    return `linear-gradient(90deg, ${hexColors.join(', ')})`;
  }

  calculateContrast(hex1: string, hex2: string): number {
    const lum1 = this.getRelativeLuminance(hex1);
    const lum2 = this.getRelativeLuminance(hex2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  private getRelativeLuminance(hex: string): number {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;

    const [rs, gs, bs] = [r, g, b].map(x => {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  getAccessibilityInfo(hex: string, colorName: string): AccessibilityInfo {
    const contrast = this.calculateContrast(hex, '#ffffff');
    let wcag = 'Fail';
    if (contrast >= 7) wcag = '✓ AAA (Enhanced)';
    else if (contrast >= 4.5) wcag = '✓ AA (Normal)';
    else if (contrast >= 3) wcag = '⚠ AA (Large Text)';

    return {
      hex,
      color: colorName,
      luminance: this.getRelativeLuminance(hex),
      wcag
    };
  }
}
