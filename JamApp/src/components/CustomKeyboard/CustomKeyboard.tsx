import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent, TouchableOpacityProps } from 'react-native';
// import { SongContext } from '../../context/SongContext/SongContext';

export interface CustomKeyboardProps /*extends TouchableOpacityProps*/ {
    onPress: (e: GestureResponderEvent, key) => void;
}

const CustomKeyboard = ({ onPress /*onPress*/ }: CustomKeyboardProps): JSX.Element => {
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
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>{major}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                {minors.map((minor, index) => (
                    <TouchableOpacity onPress={(e) => onPress(e, minor)} key={index} style={styles.key}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>{minor}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: '100%',
        backgroundColor: '#f0f0f0',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    key: {
        width: 72,
        // backgroundColor: 'red',
        // borderRadius: 5,
        padding: 6,
        // paddingTop: 16,
        // paddingHorizontal: 10,
        // marginVertical: 4,
        // marginHorizontal: 2,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
    },
    textWrapper: {
        width: 64,
        height: 32,
        justifyContent: 'center',
        backgroundColor: 'gray',
        borderRadius: 5,
        marginVertical: 4,
        marginHorizontal: 2,
    },
    
});

export default CustomKeyboard;