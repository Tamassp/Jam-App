import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent, TouchableOpacityProps } from 'react-native';
// import { SongContext } from '../../context/SongContext/SongContext';

export interface KeyboardProps /*extends TouchableOpacityProps*/ {
    onPress: (e: GestureResponderEvent, key) => void;
}

const Keyboard = ({ onPress /*onPress*/ }: KeyboardProps): JSX.Element => {
    //HERE OR IN THE EDITOR?
    // const { setSong } = React.useContext(SongContext);

    // The keyboard can change slitely depending on the chosen key
    // The less sharps or flats the better (F#/Gb, G#m/Abm, etc.)

    const majors = ['Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Back']
    const minors = ['Ebm', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm', 'Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'Mpty']

//     const handleOnPress = React.useCallback(
//     (e: GestureResponderEvent) => {
//       if (onPress) onPress(e)
//     },
//     [onPress],
//   )

    // const handleOnPress  = (e: GestureResponderEvent, key: string) => {
    //     console.log(key);
    //     newKeys?.push(key);
    // }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {majors.map((major, index) => (
                    <TouchableOpacity onPress={(e) => onPress(e, major)} key={index} style={styles.key}>
                        <Text style={styles.text}>{major}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                {minors.map((minor, index) => (
                    <TouchableOpacity onPress={(e) => onPress(e, minor)} key={index} style={styles.key}>
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