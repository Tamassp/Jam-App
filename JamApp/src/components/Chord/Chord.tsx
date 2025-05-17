import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, GestureResponderEvent } from 'react-native'
import { IChord } from '../../interfaces/Interfaces'
import { useFocus } from '../../context/FocusContext'
import { usePDF } from '../../context/PDFContext'
import { useSongContext } from '../../context/SongContext/SongContext'
import OptionSelectorVertical from '../OptionSelectorVertical/OptionSelectorVertical'
import { getChordRef, getParentChordRef } from '../../helpers/songEditor'
import { JSX } from 'react'


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
    name = 'C',
    depth = 0,
    beats = 4,
    ghost = false,
    onActivate,
    // perBass,
    // type = 'Major',
    subChords,
    ...props
}: ChordProps): JSX.Element => {
    const { focusedId, handleFocus, holdId, handleHold } = useFocus();
    const { isPDFView, setIsPDFView } = usePDF();
    const { setSong } = useSongContext();

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
                { name: "", subChords: [] },
                { name: "", subChords: [] }
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
            { name: "", subChords: [] },
            { name: "", subChords: [] },
            { name: "", subChords: [] }
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
            parentData.parent.name = heldSubChord.name ?? "";
            parentData.parent.type = heldSubChord.type;
            parentData.parent.perBass = heldSubChord.perBass;
            // optionally: merge further down, discard other subChords, etc.
        });
    };

    const handleChordPress = (chordId: string) => {
        if (ghost) {
            onActivate?.(chordId); // Pass back which ghost was tapped
        } else {
            handleFocus(chordId);
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
                    name={child.name}
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
            {name === '' ? (
                !isPDFView && 
                    <View style={[styles.placeholder, focusedId === chordId && {backgroundColor: '#FF6F00'}]}/>
                )
                :
                <>
                    {holdId === chordId &&
                        <OptionSelectorVertical focusId={chordId} options={options} setOption={(option) => handleOption(option)} style={{position: 'absolute', left: 0, top: -48}}/>
                    }
                    <Text style={[styles.chordText, focusedId === chordId && {color: 'red'}]}>{name}</Text>
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
        width: '100%'
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
    chordGroup: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
})

export default Chord;
