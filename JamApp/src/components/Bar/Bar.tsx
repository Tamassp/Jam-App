import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface BarProps {
    chords: string[];
}

const Bar = ({ chords, ...props }: BarProps): JSX.Element => {
    return (
        <View style={styles.container}>
            {chords.map((chord, index) => (
                <View key={index} style={styles.chord}>
                    <Text style={styles.chordText}>{chord}</Text>
                </View>
            ))}
            {chords.length < 2 && 
                <View style={styles.chord}>
                    <Text style={styles.chordText}>{' '}</Text>
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