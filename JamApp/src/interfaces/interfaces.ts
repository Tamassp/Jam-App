export interface IChord {
    name: string;
    perBass?: string;
    type?: 'Major' | 'Minor' | 'Diminished' | 'Augmented';
}

export interface IBar {
    number?: number;
    chords: IChord[];
}

export interface ILine {
    number?: number;
    lineLength?: number;
    bars: IBar[];
}

export interface ISongSection {
    backgroundColor?: string;
    name?: string;
    lines: ILine[];
}

export interface ISong {
    title: string;
    author?: string;
    sections: ISongSection[];
}