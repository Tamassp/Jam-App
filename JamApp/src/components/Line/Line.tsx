import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bar from '../Bar'
import { BarProps } from '../Bar/Bar'
import { countLeafChords, splitLineIntoRows } from '../../helpers/songEditor'
import { IBar } from '../../interfaces/Interfaces'
import { useSongContext } from '../../context/SongContext/SongContext'
import { useFocus } from '../../context/FocusContext'
import { JSX } from 'react'

export interface LineProps {
    sectionIndex: number;
    lineIndex: number;
    bars: IBar[];
    lineLength?: number;
    newChord?: string;
    ghost?: boolean;
    onActivate?: () => void;
}

const Line = ({
    sectionIndex,
    lineIndex,
    bars,
    lineLength = 4,
    newChord,
    ghost = false,
    onActivate,
    ...props
}: LineProps): JSX.Element => {
    const rows = splitLineIntoRows(bars, 8);
    const { ghostLine, setGhostLine, setSong } = useSongContext();
    const { handleFocus } = useFocus();
    
    const handleUserInteraction = () => {
        if (ghost && onActivate) onActivate();
    };

    const handleActivateGhostLine = (initialChordId?: string) => {
        setSong(draft => {
            draft.sections[sectionIndex].lines.push(ghostLine);
        });

        setGhostLine(null);
        if (initialChordId) {
            handleFocus(initialChordId, "chord"); // focus where the user tapped
        }
    };
    return (
        <View style={styles.lineContainer}>
            {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={[styles.rowContainer, ghost && { borderColor: 'rgba(0, 0, 0, 0.3)' }]} onTouchEnd={handleUserInteraction}>
                    {row.bars.map((bar, barIndex) => {
                        const chordCountInBar = bar.chords.reduce(
                            (acc, chord) => acc + countLeafChords(chord),
                            0
                        );

                        const flexValue = chordCountInBar / row.chordsInRow;

                        return (
                            <Bar
                                key={`${sectionIndex}-${lineIndex}-${barIndex}`}
                                sectionIndex={sectionIndex}
                                lineIndex={lineIndex}
                                barIndex={barIndex}
                                chords={bar.chords}
                                // beats={bar.beats ?? 4} // fallback if beats is not in BarProps
                                newChord={newChord}
                                barId={''}
                                style={{ flex: flexValue }}
                                ghost={ghost}
                                onActivate={handleActivateGhostLine}            
                            />
                        );
                })}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    lineContainer: {
        flexDirection: 'column',  // Stack rows vertically
        gap: 8,                   // Optional: small space between rows
        marginBottom: 16,          // Space after a line ends
        width: '100%',         // Line stretches full width
        backgroundColor: 'transparent', // Transparent background for lines
    },
    rowContainer: {
        flexDirection: 'row',      // Bars in a row should be horizontal
        flexWrap: 'nowrap',        // No wrapping inside the row itself
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,                    // Optional: small space between bars
        width: '100%',             // Row stretches full width
        //borderLeftWidth: 2,
        borderRightWidth: 1,
        // backgroundColor: '#bada55',
    },
    bar: {
        // backgroundColor: '#f0f0f0',
        // borderRadius: 5,
        padding: 5,
    },
    barText: {
        fontSize: 10,
    },
});

export default Line;