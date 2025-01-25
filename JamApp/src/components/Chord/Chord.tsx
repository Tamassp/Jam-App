import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, GestureResponderEvent } from 'react-native'
import { IChord } from '../../interfaces/Interfaces'
import { useFocus } from '../../context/FocusContext'
import { usePDF } from '../../context/PDFContext'
import { useSongContext } from '../../context/SongContext/SongContext'
import OptionSelectorVertical from '../OptionSelectorVertical/OptionSelectorVertical'


export interface ChordProps extends IChord {
    chordId: string;
    children: IChord[];
    depth?: number;
    beats?: number;
}

const Chord = ({
    chordId,
    name = 'C',
    depth = 0,
    beats = 4,
    // perBass,
    // type = 'Major',
    children,
    ...props
}: ChordProps): JSX.Element => {
    const { focusedId, handleFocus, holdId, handleHold } = useFocus();
    const { isPDFView, setIsPDFView } = usePDF();
    const { setSong } = useSongContext();

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
            // case 'Triplet':
            //     handleTriplet();
            //     break;
            default:
                break;
        }
    }

    const handleSplit = () => {
        setSong(draft => {
            console.log('Draft', draft.sections?.['0']);
            console.log('Draft', draft.sections?.['0']?.lines?.['0'].bars?.['0']?.chords?.['0'].children)
            if (
                draft.sections?.['0']?.lines?.['0'].bars?.['0']?.chords?.['0'].children
            ) {
                draft.sections?.['0']?.lines?.['0'].bars?.['1']?.chords.splice(0, 1, {
                    children: [
                        { name: "", children: [] },
                        { name: "", children: [] }
                    ]
                });
            } else {
                console.error("The required structure is missing!");
            }
        }
        )
    }

    if (children && children.length > 0) {
        return (
        <View style={[styles.chordGroup, { width: "100%" } as ViewStyle]}>
            {children.map((child, index) => (
                <Chord key={index} chordId={chordId + index} name={child.name} depth={depth + 1} children={child.children}/>
            ))}
        </View>
        );
    }
    // console.log('widthPercentage', widthPercentage);
    // console.log('ChordId', chordId);
    return (
        <TouchableOpacity style={[styles.container, { width: widthPercentage } as ViewStyle]} onPress={() => handleFocus(chordId)} onLongPress={(e) => handleLongPress(e, depth)}>
            {name === '' ? (
                !isPDFView && 
                    <View style={[styles.placeholder, focusedId === chordId && {backgroundColor: '#FF6F00'}]}/>
                )
                :
                <>
                    {holdId === chordId &&
                        <OptionSelectorVertical focusId={chordId} options={['Split', 'Triplet']} setOption={(option) => handleOption(option)} style={{position: 'absolute', left: 0, top: -48}}/>
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
