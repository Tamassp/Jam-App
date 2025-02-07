import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SongSectionProps } from '../SongSection/SongSection'
import Song, { SongProps } from '../Song/Song'
import { ISong, ISongSection } from '../../interfaces/Interfaces'
import CustomKeyboard from '../CustomKeyboard/CustomKeyboard'
import { BarProps } from '../Bar/Bar'
import { LineProps } from '../Line/Line'
import { useFocus } from '../../context/FocusContext'
import { useImmer } from "use-immer";
import Button from '../reusables/Button/Button'
import { ChordProps } from '../Chord/Chord'
import MenuBar from '../MenuBar/MenuBar'
import { initialLine, useSongContext } from '../../context/SongContext/SongContext';
import ChartList from '../ChartList'
import useCreateAndSharePDF from '../../hooks/useCreateAndSharePDF'
import Divider from '../Divider'
import { useExportAsPdf } from '../../hooks/useExportAsPdf'
import ViewShot from 'react-native-view-shot'
import { testDB } from '../../context/testDB'
import { getNextChord, getNextItem } from '../../helpers/songEditor'

interface SongEditorProps {
    // song: ISong;
    isEditing?: boolean;
}

const SongEditor: React.FC<SongEditorProps> = ({ 
    // song,
    isEditing = true,
}: SongEditorProps): JSX.Element => { 
    const emptySong: ISong = {
        title: '',
        author: '',
        sections: [],
    }


    const {song, barLength, setBarLength, getAllSongs, setSong, saveSong, loadSong} = useSongContext();

    const [isChartListOpen, setIsChartListOpen] = useState<boolean>(false)

    const lineLength = 4;
    // const barLength = 4;

    const [bars, setBars] = useState<BarProps[]>([]);
    const [lines, setLines] = useState<LineProps[]>([]);

    const [newBar, setNewBar] = useState<ChordProps[]>({name: ['']});
    const [newLine, setNewLine] = useState<BarProps[]>([newBar]);
    const [newSongSection, setNewSongSection] = useState<SongSectionProps>({songSectionId: '1', lines: [initialLine]});

    const [chordIndex, setChordIndex] = useState<string>('0');
    const [barIndex, setBarIndex] = useState<string>('0');
    const [lineIndex, setLineIndex] = useState<string>('0');
    const [sectionIndex, setSectionIndex] = useState<string>('0');

    const [newChord, setNewChord] = useState<string>('');

    const { focusedId, handleFocus } = useFocus();

    // const emptyLine = {bars: [{chords: [{name: '_'}]}]};
    const placeholderLine = testDB.songs[0].sections[0].lines[0];

    const { viewRef, createAndSharePDF } = useCreateAndSharePDF()
    const { viewShotRef, captureView } = useExportAsPdf()

    const handleNewLine = (sectionI: number) => {
        console.log("NEW LINE: ", newLine);
    
        setSong(draft => {
            console.log("HEYY");
            draft.sections[sectionI].lines.push(placeholderLine);
        });
    };
    
    const handleKey = (e , key) => {
        //Using the ids, we can determine where to add the new chord

        // WITH NESTED SPREAD OPERATOR IT IS NOT OPTIMAL, THEREFORE USEIMMER IS USED
        
        if(focusedId === (null || "" || undefined)) return;
        if (!sectionIndex || !lineIndex || !barIndex || !chordIndex) return;
        //USING USE-IMMER INSTEAD
        console.log("INDEXES", sectionIndex, lineIndex, barIndex, chordIndex);
        

        //IF THERE IS NO NEXT LINE, CREATE A NEW LINE IN THE SAME SECTION
        if((focusedId.slice(3,4) === (barLength-1).toString()) &&
        (focusedId.slice(2,3) === (lineLength-1).toString())) {
            console.log("LAST CHORD, LAST BAR");
            handleNewLine(Number(sectionIndex));
        }


        // setSong(draft => {
        //     console.log("DRAFTTTT", song.sections[0].lines[0].bars[0].chords[0].name);
        //     draft.sections[Number(sectionIndex)].lines[Number(lineIndex)].bars[Number(barIndex)].chords[chordIndex].name = key;
        // });

        setSong((draft) => {
            // Navigate to the appropriate section, line, and bar
            const targetBar = draft.sections[Number(sectionIndex)]
                .lines[Number(lineIndex)]
                .bars[Number(barIndex)];
            
            console.log("TARGETBAR", targetBar);
            console.log("chordIndex", chordIndex);

            // Function to navigate and insert at the correct chord location
            const insertChord = (chordsArray, chordIndexPath, newChordName) => {
                // Parse the first level of the index
                const currentIndex = Number(chordIndexPath.slice(0, 1));
                const remainingIndex = chordIndexPath.slice(1);
                console.log("CURRENTINDEX", currentIndex);
                console.log("REMAININGINDEX", remainingIndex);

                // Check if we are at the correct level to insert
                if (remainingIndex.length === 0) {
                    chordsArray[currentIndex].name = newChordName;
                } else {
                    // Continue navigating down into `children`
                    if (!chordsArray[currentIndex].children) {
                        chordsArray[currentIndex].children = [];
                    }
                    insertChord(chordsArray[currentIndex].children, remainingIndex, newChordName);
                }
            };

            // Call the recursive function starting from the target bar's chords
            insertChord(targetBar.chords, chordIndex, key);
        });

        // const [isLastChord,set] = (chordIndex === barLength-1);
        // const [isLastBar] = (barIndex === lineLength-1);

        console.log("FocusedIDDDDDD", focusedId);
        
        // Example Usage:
        const nextItem = getNextItem(song, [sectionIndex, lineIndex, barIndex, 0, 1]); // Path to the current node (CHORDS TOGETHER OR SEPARATE????)
        //const nextItem = getNextChord(song.sections, [sectionIndex, lineIndex, barIndex, ]); // Path to the current node (CHORDS TOGETHER OR SEPARATE????)
        console.log("NEXT", nextItem);
        // handleFocus(nextItem);

        // console.log("FI", focusedId.slice(2,3));
        // if((focusedId.slice(3,4) === (barLength-1).toString()) &&
        // (focusedId.slice(2,3) === (lineLength-1).toString())) {
        //     console.log("LAST CHORD, LAST BAR");
            
        //     //Increasing line index
        //     const tempStr = focusedId.slice(0,1);
        //     const increasedStr = (parseInt(focusedId.slice(1,2)) + 1).toString();
        //     //Increasing focus ID for the next line
        //     handleFocus(tempStr + increasedStr + '00');
        // }
        // //Increasing bar index
        // else if(focusedId.slice(3,4) === (barLength-1).toString()) {
        //     console.log("BARLENGTH", barLength);
            
        //     //Increasing bar index
        //     const tempStr = focusedId.slice(0,2);
        //     const increasedStr = (parseInt(focusedId.slice(2,3)) + 1).toString();
            
        //     handleFocus(tempStr + increasedStr + '0');
        // }
        // //Increasing chord index
        // else {
        //     const tempStr = focusedId.slice(0,3);
        //     const increasedStr = (parseInt(focusedId.slice(3,4)) + 1).toString();
        //     //Increasing focus ID for the next chord
        //     handleFocus(tempStr + increasedStr);
        // }
    }

    const handleLongPress = (e, key) => {
        console.log("LONG PRESS option", key);
    }

    useEffect(() => {
        // const tempBarindex = Array.from(focusedId)[0];
        if(focusedId === null || focusedId === undefined) return;
        setSectionIndex(focusedId.charAt(0))
        setLineIndex(focusedId.charAt(1))
        setBarIndex(focusedId.charAt(2))
        setChordIndex(focusedId.substring(3)); // Extract all digits from the 4th onwards
        
        
        // console.log("BARINDEX", barIndex);
    }, [focusedId])

    //test indexes
    useEffect(() => {
        console.log("INDEXES2", sectionIndex, lineIndex, barIndex, chordIndex);
        console.log('chordindex', chordIndex);
    }, [sectionIndex, lineIndex, barIndex, chordIndex])
    

    // useEffect(() => {
    //     //print the whole song
    //     for(let i = 0; i < songg.sections.length; i++) {
    //         for(let j = 0; j < songg.sections[i].lines.length; j++) {
    //             for(let k = 0; k < songg.sections[i].lines[j].bars.length; k++) {
    //                 for(let l = 0; l < songg.sections[i].lines[j].bars[k].chords.length; l++) {
    //                     console.log("CHORD: ", songg.sections[i].lines[j].bars[k].chords[l].name);
    //                 }
    //             }
    //         }
    //     }
    // }
    // , [songg]);

   
    const handleNewSection = () => {
        console.log("NEW SECTION");
        setSong(draft => {
            draft.sections.push(newSongSection);
        });
        // handleNewLine(sectionIndex+1);
        setSectionIndex(sectionIndex + 1);

    }

    
    
    
    const handleNewSong = () => {
        //Initialize new song
        loadSong()
    }

    const handleOnSave = () => {
        console.log("SAVING SONG");
        // setSong(draft => {
        //     draft.title = 'New Title';
        // });
        
        console.log(JSON.stringify(song));
        saveSong(song.title + " - " + song.author);
    }

    // const handleOnExport = () => {
    //     console.log("EXPORTING SONG");
    //     useCreateAndSharePDF(song)
    // }

    const handleOutsidePress = () => {
        console.log("OutsidePres");
        handleFocus("")
        //dismiss should be moved to focuscontext
        // Keyboard.dismiss()
    }

    const handleOpenChartlist = () => {
        setIsChartListOpen(true)
    }


    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress} >
           
            {/* <TouchableOpacity onPress={(e)=> handleNewLine(e)}>
                <Text>new line</Text>
            </TouchableOpacity> */}
            <View style={styles.container}>
                <MenuBar onChartListOpen={handleOpenChartlist} onNewSheet={handleNewSong} onSave={handleOnSave} onExport={() => captureView(false)} />
                <ViewShot ref={viewShotRef}>
                    <Song ref={viewRef} title={song.title} artist={song.author} songSections={song.sections} handleNewSection={handleNewSection}/>
                </ViewShot>
                {isChartListOpen &&
                    <ChartList setIsChartListOpen={setIsChartListOpen} />
                }
                
                
                <View style={styles.keyboard}>
                    <CustomKeyboard onPress={handleKey} onLongPressOption={handleLongPress} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export interface SongEditornStyles {
    container: ViewStyle;
    keyboard: ViewStyle;
    newSection: ViewStyle;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    keyboard: {
        position: 'absolute',
        bottom: 10,
    },
    newSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    }
});

export default SongEditor;
