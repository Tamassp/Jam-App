import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, GestureResponderEvent } from 'react-native'
import { IChord } from '../../interfaces/Interfaces'
import { useFocus } from '../../context/FocusContext'
import { usePDF } from '../../context/PDFContext'
import { useSongContext } from '../../context/SongContext/SongContext'
import OptionSelectorVertical from '../OptionSelectorVertical/OptionSelectorVertical'
import { getChordRef, getParentChordRef } from '../../helpers/songEditor'
import { JSX } from 'react'
import { formatChordDisplay } from './chord.helpers'
import { useActiveChord } from '../../context/SongContext/ActiveChordContext'


export interface ChordProps extends IChord {
    chordId: string;
    subChords: IChord[];
    depth?: number;
    beats?: number;
    ghost?: boolean;
    onActivate?: (chordId: string) => void; // Callback for ghost activation
}

const Chord = ({
    chordId,
    root = 'C',
    quality = 'Major',
    extensions = [],
    depth = 0,
    beats = 4,
    ghost = false,
    onActivate,
    // perBass,
    // quality = 'Major',
    subChords,
    ...props
}: ChordProps): JSX.Element => {
    const { focusedId, handleFocus, secondaryFocusedId, holdId, handleHold } = useFocus();
    const { isPDFView, setIsPDFView } = usePDF();
    const { setSong } = useSongContext();
    
    const isPrimaryFocus = focusedId?.id === chordId;
    const isSecondaryFocus = secondaryFocusedId === chordId;

    // const options = ['Split', 'Triplet']
    // if (subChords?.length > 0) {
    //     options.push('Unsplit');
    // }

    const isSubChord = chordId.split("-").length > 4; // 4 parts = root chord
    const canUnsplit = isSubChord;
    const options = ['Split', 'Triplet', ...(canUnsplit ? ['Unsplit'] : [])];
    
    // Calculate width based on depth relative to the bar's width
    const splitNumber = beats % 2 == 0 ? 2 : beats;
    const widthPercentage = `${100 / (splitNumber ** depth)}%`;
    
    const handleLongPress = React.useCallback((e: GestureResponderEvent, depth: number) => {
        // console.log('LONG PRESS', e);
        console.log('Depth: ', depth);
        console.log('ChordIdLP: ', chordId);
        handleHold(chordId);
    }, [chordId]);

    const handleOption = (option: React.SetStateAction<string>) => {
        console.log('Option: ', option);
        switch (option) {
            case 'Split':
                handleSplit();
                break;
            case 'Triplet':
                handleTriplet();
                break;
            case 'Unsplit':
                handleUnsplit();
                break;
            default:
                break;
        }
    }

    const handleSplit = () => {
        if (!holdId) return;

        const idParts = holdId.split("-").map(Number);
        const [sectionIndex, lineIndex, barIndex, chordIndex, ...subChordPath] = idParts;

        setSong(draft => {
            const chords = draft.sections[sectionIndex]
            ?.lines[lineIndex]
            ?.bars[barIndex]
            ?.chords;

            if (!chords) {
                console.error("Chord path invalid");
                return;
            }

            const targetChord = getChordRef(chords, [chordIndex, ...subChordPath]);
            if (!targetChord) {
                console.error("Target chord not found");
                return;
            }

            targetChord.subChords = [
                { root: "", subChords: [] },
                { root: "", subChords: [] }
            ];
        });
    };

    const handleTriplet = () => {
        if (!holdId) return;

        const idParts = holdId.split("-").map(Number);
        const [sectionIndex, lineIndex, barIndex, chordIndex, ...subChordPath] = idParts;

        setSong(draft => {
            const chords = draft.sections[sectionIndex]
            ?.lines[lineIndex]
            ?.bars[barIndex]
            ?.chords;

            const targetChord = getChordRef(chords, [chordIndex, ...subChordPath]);
            if (!targetChord) return;

            targetChord.subChords = [
            { root: "", subChords: [] },
            { root: "", subChords: [] },
            { root: "", subChords: [] }
            ];
        });
    };

    const handleUnsplit = () => {
        if (!holdId) return;

        const idParts = holdId.split("-").map(Number);
        const [sectionIndex, lineIndex, barIndex, ...chordPath] = idParts;

        setSong(draft => {
            const chords = draft.sections[sectionIndex]
            ?.lines[lineIndex]
            ?.bars[barIndex]
            ?.chords;
            console.log("Chords: ", chords);
            if (!chords) return;

            const parentData = getParentChordRef(chords, chordPath);
            if (!parentData || !parentData.parent || !parentData.parent.subChords) return;

            const heldSubChord = parentData.parent.subChords[parentData.index];
            console.log("Held SubChord: ", heldSubChord);
            // Replace the parent chord with the held subChord's data
            parentData.parent.subChords = undefined;
            parentData.parent.root = heldSubChord.root ?? "";
            parentData.parent.quality = heldSubChord.quality;
            parentData.parent.perBass = heldSubChord.perBass;
            // optionally: merge further down, discard other subChords, etc.
        });
    };

    const handleChordEdit = (chordId: string) => {
        console.log('handleChordEdit', chordId);
        handleFocus(chordId, "chord", true); // Focus the chord
    }

    const handleChordPress = (chordId: string) => {
        if (ghost) {
            onActivate?.(chordId); // Pass back which ghost was tapped
        } else {
            handleChordEdit(chordId);
            //handleFocus(chordId);
        }
    }

    if (subChords && subChords.length > 0) {
        return (
            <View style={[styles.chordGroup, { width: '100%' } as ViewStyle]}>
            {subChords.map((child, index) => {
                const childId = `${chordId}-${index.toString().padStart(2, '0')}`;
                const siblingCount = subChords.length;

                return (
                <View key={childId} style={{ width: `${100 / siblingCount}%` } as ViewStyle}>
                    <Chord
                    chordId={childId}
                    root={child.root}
                    extensions={child.extensions}
                    subChords={child.subChords}
                    depth={depth + 1}
                    ghost={ghost}
                    />
                </View>
                );
            })}
            </View>
        );
    }
    
    return (
        <TouchableOpacity
            style={[styles.container, { opacity: ghost ? 0.7 : 1 } as ViewStyle]} // Full width since it's already inside a wrapper
            onPress={() => handleChordPress(chordId)}
            onLongPress={(e) => handleLongPress(e, depth)}
            >
            {root === '' ? (
                !isPDFView && 
                    <View style={[
                        styles.placeholder, 
                        isPrimaryFocus && {backgroundColor: '#FF6F00'},
                        isSecondaryFocus && {backgroundColor: '#FF6F00', opacity: 0.5},
                    ]}/>
                )
                :
                <>
                    {holdId === chordId &&
                        <OptionSelectorVertical focusId={chordId} options={options} setOption={(option) => handleOption(option)} style={{position: 'absolute', left: 0, top: -48}}/>
                    }
                    <Text style={[
                        styles.chordText, 
                        isPrimaryFocus && { color: 'red' },
                        isSecondaryFocus && { color: 'red', opacity: 0.5 },
                    ]}>
                        {/* {formatChordDisplay({ root, quality })} */}

                        {root}
                        {quality === 'Minor' && 'm'}
                        {quality === 'Diminished' && '°'}
                        {quality === 'Augmented' && '⁺'}   
                    </Text>
                    {/* Superscript Extensions */}
                    {extensions?.length > 0 && (
                        <Text style={styles.superscript}>
                            {extensions.map((ext, i) => (
                            <Text key={i} >
                                {ext
                                .replace('b', '♭')
                                .replace('#', '♯')}
                            </Text>
                            ))}
                        </Text>
                        )}             
                </>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#f0f0f0',
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        //Make line wrappable
        // paddingHorizontal: 32,
        // padding: 1
    },
    chordText: {
        fontSize: 32,
    },
    placeholder: {
        width: 32,
        height: 32,
        backgroundColor: 'lightgrey',
        borderRadius: 4,
    },
    superscript: {
        fontSize: 16,
        transform: [{ translateY: -6 }],
        marginLeft: 2,
      },
    chordGroup: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
})

export default Chord;
