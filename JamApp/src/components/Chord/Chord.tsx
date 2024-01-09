import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { IChord } from '../../interfaces/Interfaces'
import { useFocus } from '../../context/FocusContext'


export interface ChordProps extends IChord {
    chordId: string;
}

const Chord = ({
    chordId,
    name = 'C',
    perBass,
    type = 'Major',
    ...props
}: ChordProps): JSX.Element => {
    const { focusedId, handleFocus } = useFocus();

    const [hasFocus, setFocus] = React.useState(false);

    const handleChordPress = (e: any) => {
        console.log('CHORDPRESS', name);
        console.log('ChordID', chordId);
        console.log('focusedId', focusedId);
        
        // setFocus(true)
    }

    // React.useEffect(() => {
    //     console.log('ChordID', chordId);
    //     console.log('focusedId', focusedId);
    // }, [handleFocus])

    

    return (
        <TouchableOpacity style={styles.chord} onPress={() => handleFocus(chordId)}>
            <Text style={[styles.chordText, focusedId === chordId && {color: 'red'}]}>{name}</Text>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    chord: {
        padding: 5,
    },
    chordText: {
        fontSize: 24,
    },
})

export default Chord;
