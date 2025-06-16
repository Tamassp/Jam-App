import * as React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import Chord, { ChordProps } from '../Chord/Chord'
import { useSongContext } from '../../context/SongContext/SongContext'
import { IBar } from '../../interfaces/Interfaces'
import { JSX } from 'react'

// export interface Chord {
//     name?: string;
//     perBass?: string;
//     chords?: Chord[];
// }

export interface BarProps extends IBar, ViewProps {
    sectionIndex: number;
    lineIndex: number;
    barIndex: number;
    barId: string;
    barLength?: number;
    newChord?: string;
    ghost?: boolean;
    onActivate?: () => void;
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
    ghost = false,
    onActivate,
     ...props 
}: BarProps): JSX.Element {
    const { barLength: globalBarLength } = useSongContext()
    barLength = barLength || globalBarLength;

    React.useLayoutEffect(() => {
        console.log('BarID', barId);
        console.log("chordRoot", chords[0]?.root);
        console.log("chordExtensions", chords[0]?.extensions);
    }, [barId])
        
    const beats = parseInt(timeSignature.split('/')[0], 10); // Extract beats from time signature


    return (
        <View style={[styles.container]} {...props}>
            <View style={[styles.chordContainer, ghost && { borderColor: 'rgba(0, 0, 0, 0.3)' }]}>
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
                        root={chord.root}
                        extensions={chord.extensions}
                        subChords={chord.subChords}
                        beats={beats}
                        depth={0}
                        ghost={ghost}
                        onActivate={onActivate}
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
        flex: 1,
        backgroundColor: 'transparent',
        // justifyContent: 'space-around',
        // borderWidth: 1,
        // borderRightWidth: 1,
        // borderColor: '#ccc',
        // padding: 5,
        //height: 32,
        // backgroundColor: '#bada55'
    },
    chordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 48,
        // backgroundColor: '#f0f0f0',
        borderLeftWidth: 1,
    },

});

export default Bar;