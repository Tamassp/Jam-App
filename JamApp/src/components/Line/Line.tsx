import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Bar from '../Bar'
import { BarProps } from '../Bar/Bar'
import { countLeafChords, splitLineIntoRows } from '../../helpers/songEditor'
import { IBar } from '../../interfaces/Interfaces'
import { useSongContext } from '../../context/SongContext/SongContext'
import { useFocus } from '../../context/FocusContext'
import { JSX } from 'react'
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
// import { Pressable, type SwipeableProps } from 'react-native-gesture-handler';
import Animated, { SharedValue } from 'react-native-reanimated'
import { Extrapolation, interpolate } from 'react-native-reanimated';


export interface LineProps {
    //id: string; // for animations
    sectionIndex: number;
    lineIndex: number;
    bars: IBar[];
    lineLength?: number;
    newChord?: string;
    ghost?: boolean;
    onActivate?: () => void;
    onCopyLine?: (lineIndex: number) => void;
    onDeleteLine?: (lineIndex: number) => void;
}

const Line = ({
    //id: string,
    sectionIndex,
    lineIndex,
    bars,
    lineLength = 4,
    newChord,
    ghost = false,
    onActivate,
    onCopyLine,
    onDeleteLine,
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

    const rowRef = React.useRef<React.ComponentRef<typeof ReanimatedSwipeable> | null>(null);

    // --- Swipe actions (rendered behind the row) ---
    const renderLeftActions = (progress: SharedValue<number>) => {
    const opacity = interpolate(progress.value, [0, 1], [0.4, 1], Extrapolation.CLAMP);

    return (
        <Animated.View style={[styles.actionContainer, styles.leftAction, { opacity }]}>
        <Pressable onPress={() => onCopyLine?.(lineIndex)}>
            <Text style={styles.actionText}>Copy</Text>
        </Pressable>
        </Animated.View>
    );
    };

    const renderRightActions = (progress: SharedValue<number>) => {
    const opacity = interpolate(progress.value, [0, 1], [0.4, 1], Extrapolation.CLAMP);

    return (
        <Animated.View style={[styles.actionContainer, styles.rightAction, { opacity }]}>
        <Pressable onPress={() => onDeleteLine?.(sectionIndex)}>
            <Text style={styles.actionText}>Delete</Text>
        </Pressable>
        </Animated.View>
    );
    };

    return (
        <View style={styles.lineContainer}>
            <ReanimatedSwipeable
                leftThreshold={200}
                rightThreshold={80}
                friction={1.8}
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
                onSwipeableWillOpen={(dir) => {
                    if (dir === 'right') onCopyLine?.(lineIndex);
                    if (dir === 'left') onDeleteLine?.(lineIndex);

                    // snap back immediately
                    rowRef.current?.close();
                }}
                ref={rowRef}
            >
                <View>
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
            </ReanimatedSwipeable>
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
    actionContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    leftAction: {
        backgroundColor: '#2e7d32',
    },
    rightAction: {
        backgroundColor: '#c62828',
        alignItems: 'flex-end',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default Line;