import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface KeyboardProps {

}

const Keyboard = ({  }: KeyboardProps): JSX.Element => {

    const majors = ['Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#']
    const minors = ['Ebm', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm', 'Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m']

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {majors.map((major, index) => (
                    <TouchableOpacity key={index} style={styles.key}>
                        <Text style={styles.text}>{major}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                {minors.map((minor, index) => (
                    <TouchableOpacity key={index} style={styles.key}>
                        <Text style={styles.text}>{minor}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        backgroundColor: '#f0f0f0',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    key: {
        width: 64,
        backgroundColor: 'gray',
        borderRadius: 5,
        padding: 5,
        marginVertical: 4,
        marginHorizontal: 2,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
    },
    
});

export default Keyboard;