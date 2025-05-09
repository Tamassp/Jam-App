import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Chord, { ChordProps } from '../Chord/Chord'
import { useSongContext } from '../../context/SongContext/SongContext'
import { IBar } from '../../interfaces/Interfaces'


// export interface Chord {
//     name?: string;
//     perBass?: string;
//     chords?: Chord[];
// }

export interface BarProps extends IBar{
    sectionIndex: number;
    lineIndex: number;
    barIndex: number;
    barId: string;
    barLength?: number;
    newChord?: string;
}

const Bar = React.memo( function Bar ({
    sectionIndex,
    lineIndex,
    barIndex,
    barId,
    chords, 
    barLength, 
    newChord,
    timeSignature = '4/4',
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

    React.useLayoutEffect(() => {
        console.log('BarID', barId);
    }, [barId])
        
    const beats = parseInt(timeSignature.split('/')[0], 10); // Extract beats from time signature


    return (
        <View style={[styles.container, {width: '50%'}]}>
            <View style={styles.chordContainer}>
                {chords.map((chord, chordIndex) => {
                    const chordPath = [
                        sectionIndex,
                        lineIndex,
                        barIndex,
                        chordIndex
                    ].map(n => n.toString().padStart(2, '0')).join('-');

                    return (
                        <Chord
                        key={chordPath}
                        chordId={chordPath}
                        name={chord.name}
                        subChords={chord.subChords}
                        beats={beats}
                        depth={0}
                        />
                    );
                    })}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        borderRightWidth: 1,
        padding: 5,
        // backgroundColor: '#bada55'
    },
    chordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    
});

export default Bar;