import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chord from '../Chord'
import { ChordProps } from '../Chord/Chord'
import { useSongContext } from '../../context/SongContext/SongContext'

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
    const { barLength: globalBarLength } = useSongContext()
    barLength = barLength || globalBarLength;
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
        <View style={[styles.container, barLength == 4 ? {width: '50%'} : {width: '25%'}]}>
            {chords.slice(0, barLength).map((chord, index) => (
                <View style={{width: `${100 / barLength}%`}}>
                    <Chord key={index} chordId={barId + index} name={chord.name} />
                </View>
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
        // justifyContent: 'space-around',
        borderRightWidth: 1,
        padding: 5,
        backgroundColor: '#bada55'
    },
    
});

export default Bar;