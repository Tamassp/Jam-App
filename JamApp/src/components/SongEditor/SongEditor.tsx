import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SongSectionProps } from '../SongSection/SongSection'
import Song, { SongProps } from '../Song/Song'

interface SongEditorProps {
    song: SongProps[];
}

const SongEditor: React.FC<SongEditorProps> = ({ 
    song= [],
}: SongEditorProps): JSX.Element => {
    const dummySongSections: SongSectionProps[] = [
        {
            lines: [
                 {
                    bars: [
                        {chords: ['C', 'D', 'E', 'F']},
                        
                    ],
                },
                {
                    bars: [
                        {chords: ['C', 'D', 'E', 'F']},
                        {chords: ['G', 'A', 'B', 'C']},
                        
                    ],
                },
                {
                    bars: [
                        {chords: ['C', 'D', 'E', 'F']},
                        {chords: ['G', 'A', 'B', 'C']},
                        {chords: ['G', 'A', 'B', 'C']},
                        {chords: ['G', 'A', 'B', 'C']},
                    ],
                },
            ],
        },
        {
            lines: [
                {
                    bars: [
                        {chords: ['C', 'D', 'E', 'F']},
                        {chords: ['G', 'A', 'B', 'C']},
                        {chords: ['G', 'A', 'B', 'C']},
                    ],
                },
                {
                    bars: [
                        {chords: ['G', 'A', 'B', 'C']},
                    ],
                },
                {
                    bars: [
                        
                    ],
                },
            ],
        },
    ];


    return (
        <View>
            <Song title='The Best Title' artist="The Best Artist" songSections={dummySongSections} />
            

        </View>
    );
};

export default SongEditor;
