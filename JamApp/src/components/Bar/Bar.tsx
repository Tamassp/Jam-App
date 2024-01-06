import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// export interface Chord {
//     name?: string;
//     perBass?: string;
//     chords?: Chord[];
// }

export interface BarProps {
    chords: string[] /*Chord[]*/;
    barLength?: number;
}

const Bar = ({ chords, barLength = 4, ...props }: BarProps): JSX.Element => {

    if (chords.length < barLength) {
        const initialChordsLength = chords.length;
        for (let i = 0; i < barLength - initialChordsLength; i++) {
            chords.push(' 1');
        }
    }

    return (
        <View style={styles.container}>
            {chords.map((chord, index) => (
                <View key={index} style={styles.chord}>
                    <Text style={styles.chordText}>{chord}</Text>
                </View>
            ))}
            {chords.length < 2 && 
                <View style={styles.chord}>
                    <Text style={styles.chordText}>{' 2'}</Text>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRightWidth: 1,
    },
    chord: {
        // backgroundColor: '#f0f0f0',
        // borderRadius: 5,
        padding: 5,
    },
    chordText: {
        fontSize: 10,
    },
});

export default Bar;