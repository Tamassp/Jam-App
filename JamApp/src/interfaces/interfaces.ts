export type TChordQuality = 'Major' | 'Minor' | 'Diminished' | 'Augmented';

export interface IChord {
    // id: string;
    root?: string; // e.g., "C", "G#", "Bb"
    quality?: TChordQuality
    extensions?: string[]; // e.g., "7", "#9", "b13", "sus4", "add9"
    perBass?: string;
    subChords?: IChord[];
}

export interface IBar {
    timeSignature?: string;
    number?: number;
    chords: IChord[];
}

export interface ILine {
    //id: string;
    lineColor?: string;
    number?: number;
    lineLength?: number;
    bars: IBar[];
}

export interface ISongSection {
    backgroundColor?: string;
    title?: string;
    lines: ILine[];
}

export interface ISong {
    title: string;
    author?: string;
    sections: ISongSection[];
}

export type TChordPath = {
  sectionIndex: number;
  lineIndex: number;
  barIndex: number;
  chordIndices: number[]; // position in chord tree, including subChords
};

export type TLeafChordWithPath = {
  chord: IChord;
  path: TChordPath;
}

export type SplitRow = {
  bars: IBar[];       // Subset of bars to render in that row
  chordsInRow: number; // Total number of chords in that row
};