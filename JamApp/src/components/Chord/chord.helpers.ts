import { TChordQuality } from "../../interfaces/Interfaces"

export function formatChordDisplay({
    root = '',
    quality,
    // extensions = [],
    // perBass
  }: {
    root: string;
    quality?: TChordQuality;
    // extensions?: string[];
    // perBass?: string;
  }) {
    let result = root;
  
    if (quality) result += quality;
    // if (extensions.length > 0) result += extensions.join('');
    // if (perBass) result += `/${perBass}`;
  
    return result;
  }