export interface IChord {
    // id: string;
    name?: string;
    perBass?: string;
    type?: 'Major' | 'Minor' | 'Diminished' | 'Augmented';
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