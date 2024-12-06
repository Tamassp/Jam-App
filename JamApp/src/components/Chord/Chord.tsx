import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { IChord } from '../../interfaces/Interfaces'
import { useFocus } from '../../context/FocusContext'
import { usePDF } from '../../context/PDFContext'


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
    const { focusedId, handleFocus } = useFocus();
    const { isPDFView, setIsPDFView } = usePDF();

    // Calculate width based on depth relative to the bar's width
    const splitNumber = beats % 2 == 0 ? 2 : beats;
    const widthPercentage = `${100 / (splitNumber ** depth)}%`;
    


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
        <TouchableOpacity style={[styles.container, { width: widthPercentage } as ViewStyle]} onPress={() => handleFocus(chordId)}>
            {name === '' ? (
                !isPDFView && 
                    <View style={[styles.placeholder, focusedId === chordId && {backgroundColor: '#FF6F00'}]}/>
                )
                :
                <Text style={[styles.chordText, focusedId === chordId && {color: 'red'}]}>{name}</Text>
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
