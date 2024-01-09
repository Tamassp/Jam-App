import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chord from '../Chord'
import { ChordProps } from '../Chord/Chord'

// export interface Chord {
//     name?: string;
//     perBass?: string;
//     chords?: Chord[];
// }

export interface BarProps {
    barId: string;
    chords: ChordProps[] /*Chord[]*/;
    barLength?: number;
    newChord?: string;
}

const Bar = React.memo( function Bar ({
    barId,
    chords, 
    barLength, 
    newChord,
     ...props 
}: BarProps): JSX.Element {
    barLength = barLength || 4;
    const addNewChord = () => {
        if (newChord) {
            console.log('newChord', newChord);
            
            // chords.push(newChord);
        }
    }

    // React.useEffect
    // (() => {
    //     addNewChord();
    // }, [newChord]);

    if (chords.length < barLength) {
        const initialChordsLength = chords.length;
        for (let i = 0; i < barLength - initialChordsLength; i++) {
            // chords.push(' 1');
        }
    }

    React.useLayoutEffect(() => {
        console.log('BarID', barId);
    }, [barId])
        

    return (
        <View style={styles.container}>
            {chords.map((chord, index) => (
                <Chord key={index} chordId={barId + index} name={chord.name} />
            ))}
            {/* {chords.length < 2 && 
                <Chord name=' 1' />
            } */}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRightWidth: 1,
    },
    
});

export default Bar;