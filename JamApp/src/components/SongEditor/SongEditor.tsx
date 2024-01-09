import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SongSectionProps } from '../SongSection/SongSection'
import Song, { SongProps } from '../Song/Song'
import { ISong, ISongSection } from '../../interfaces/Interfaces'
import Keyboard from '../Keyboard/Keyboard'
import { BarProps } from '../Bar/Bar'
import { LineProps } from '../Line/Line'
import { useFocus } from '../../context/FocusContext'
import { useImmer } from "use-immer";

interface SongEditorProps {
    song: SongProps[];
}

const SongEditor: React.FC<SongEditorProps> = ({ 
    song= [],
}: SongEditorProps): JSX.Element => { 

    const dummySongSections: ISongSection[] = [
        {
            backgroundColor: '#aaaaaa',
            lines: [
                 {
                    bars: [
                        {chords: [
                            {
                                name: 'C',
                            },
                            {
                                name: 'G',
                            },
                            {
                                name: 'E',
                            },
                            {
                                name: 'F',
                            },

                        ]},
                        
                    ],
                },
                {
                    bars: [
                        {
                            chords: [
                                {
                                    name: 'G',
                                },
                                {
                                    name: 'A',
                                },
                                {
                                    name: 'B',
                                },
                                {
                                    name: 'C',
                                },
                            ]
                        },
                        {
                            chords: [
                                {
                                    name: 'G',
                                },
                                {
                                    name: 'A',
                                },
                                {
                                    name: 'B',
                                },
                                {
                                    name: 'C',
                                },
                            ]
                        },
                        {
                            chords: [
                                {
                                    name: 'G',
                                },
                                {
                                    name: 'A',
                                },
                                {
                                    name: 'B',
                                },
                                {
                                    name: 'C',
                                },
                            ]
                        },
                        {
                            chords: [
                                {
                                    name: 'G',
                                },
                                {
                                    name: 'A',
                                },
                                {
                                    name: 'B',
                                },
                                {
                                    name: 'C',
                                },
                            ]
                        },
  
                    ],
                },
                {
                    bars: [
                        {
                            chords: [
                                {
                                    name: 'G',
                                },
                                {
                                    name: 'A',
                                },
                                {
                                    name: 'B',
                                },
                                {
                                    name: 'C',
                                },
                            ]
                        },
                        {
                            chords: [
                                {
                                    name: 'G',
                                },
                                {
                                    name: 'A',
                                },
                                {
                                    name: 'B',
                                },
                                {
                                    name: 'C',
                                },
                            ]
                        },
                        {
                            chords: [
                                {
                                    name: 'G',
                                },
                                {
                                    name: 'A',
                                },
                                {
                                    name: 'B',
                                },
                                {
                                    name: 'C',
                                },
                            ]
                        },
                        {
                            chords: [
                                {
                                    name: 'G',
                                },
                                {
                                    name: 'A',
                                },
                                {
                                    name: 'B',
                                },
                                {
                                    name: 'C',
                                },
                            ]
                        },  
                    ],
                },
            ],
        },
    ];

    const [songSections2, setSongSections2] = useState<ISongSection[]>(dummySongSections);

    const testSong: ISong = 
    {
            title: 'The Worst Title',
            author: 'The Worst Author',
            sections: [
                {
                    backgroundColor: '#aaaaaa',
                    lines: [
                    {
                        bars: [
                        {
                            chords: [
                                {
                                    name: 'C',
                                },
                                {
                                    name: 'G',
                                },
                                {
                                    name: 'E',
                                },
                                {
                                    name: 'F',
                                },
                            ]
                        },
                        {
                            chords: [
                                {
                                    name: 'Gm',
                                },
                                {
                                    name: 'Gm',
                                },
                                {
                                    name: 'Em',
                                },
                                {
                                    name: 'Fm',
                                },
                            ]
                        },
                        ]
                    },
                     {
                        bars: [
                        {
                            chords: [
                                {
                                    name: 'C',
                                },
                                {
                                    name: 'G',
                                },
                                {
                                    name: 'E',
                                },
                                {
                                    name: 'F',
                                },
                            ]
                        },
                        {
                            chords: [
                                {
                                    name: 'Gm',
                                },
                                {
                                    name: 'Gm',
                                },
                                {
                                    name: 'Em',
                                },
                                {
                                    name: 'Fm',
                                },
                            ]
                        },
                        ]
                    },
                    ]
                }
            ]

        }


    const [songg, updateSongg] = useImmer<ISong>(testSong);

    // const [song, setSong]:ISong = useState();


    // useEffect(() => {
    //     setSong(...song, songSection.at(-1).lines.at(-1).bars.at(-1).chords.push(newChord))
    // }, [newChord])

    const [bars, setBars] = useState<BarProps[]>([]);
    const [lines, setLines] = useState<LineProps[]>([]);

    const [newBar, setNewBar] = useState<BarProps>({chords: ['']});
    const [newLine, setNewLine] = useState<BarProps[]>([]);
    const [newSongSection, setNewSongSection] = useState<SongSectionProps>({lines: [newLine]});

    const [chordIndex, setChordIndex] = useState<number>(0);
    const [barIndex, setBarIndex] = useState<number>(0);
    const [lineIndex, setLineIndex] = useState<number>(0);
    const [sectionIndex, setSectionIndex] = useState<number>(0);


    const [newChord, setNewChord] = useState<string>('');

    const { focusedId, handleFocus } = useFocus();
    
    const handleKey = (e , key) => {
        //Using the ids, we can determine where to add the new chord

        // WITH SPREAD OPERATOR IT IS NOT OPTIMAL
        // const nextChords = [...tempSongSections[0].lines[0].bars[0].chords, {name: key}];
        // console.log('nextChords', nextChords);
        
        // const nextBars = [...tempSongSections[0].lines[0].bars, {chords: nextChords}];
        // console.log('nextBars', nextBars);
        
        // const nextLines = [...tempSongSections[0].lines, {bars: nextBars}];
        // tempSongSections[0].lines = nextLines;

        // setSongSections2(tempSongSections);
        
        
        
        //USING USE-IMMER INSTEAD
        console.log("INDEXES", sectionIndex, lineIndex, barIndex, chordIndex);
        
        updateSongg(draft => {
            console.log("DRAFT", songg.sections[0].lines[0].bars[0].chords[0].name);
            
            draft.sections[sectionIndex].lines[lineIndex].bars[barIndex].chords[chordIndex].name = key;
        });
    }

    useEffect(() => {
        // const tempBarindex = Array.from(focusedId)[0];
        if(focusedId === null) return;
        setSectionIndex(focusedId.charAt(0))
        setLineIndex(focusedId.charAt(1))
        setBarIndex(focusedId.charAt(2))
        setChordIndex(focusedId.charAt(3))
        
        
        // console.log("BARINDEX", barIndex);
    }, [focusedId])

    useEffect(() => {
        console.log("SETNEWSECTION2", songSections2[0].lines[0].bars[0].chords[0].name);
    }
    , [songSections2]);

    //  useEffect(() => {
    //     // setNewBar({chords: [newChord]});
        
    //     const tempBar = {chords: [newChord]};
    //     setNewLine([...newLine, tempBar]);        
        
    // }, [newChord]);


    // useEffect (() => {
    //     console.log("NEW LINE: ", newLine);
    //     if(newLine.length === 4) {
    //         // setLineIndex(lineIndex + 1);
    //         setLines([...lines, {bars: newLine}]);
    //     }
    // }
    // , [newLine]);

    // useEffect(() => {
    //     console.log("LINES: ", lines);
    //     // if(lines.length === 4) {
    //     //     setSongSections([...songSections, {lines}]);
    //     //     setLines([]);
    //     // }
    //     setNewLine([]);
    // }
    // , [lines]);
    

   

    

   

    return (
        <View style={styles.container}>
            <Song title='The Best Title' artist="The Best Artist" songSections={songg.sections} />
            <Keyboard onPress={handleKey} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SongEditor;
