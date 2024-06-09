import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bar from '../Bar'
import { BarProps } from '../Bar/Bar'

export interface LineProps {
    lineId: string;
    bars: BarProps[];
    lineLength?: number;
    newChord?: string;
}

const Line = ({ 
    lineId,
    bars, 
    lineLength = 4, 
    newChord, 
    ...props 
}: LineProps): JSX.Element => {

    // if(bars.length < lineLength) {
    //     const initialBarLength = bars.length;
    //     for(let i = 0; i < lineLength - initialBarLength; i++) {
    //         bars.push({chords: [' 1']});       
    //     }
    // }

    return (
        <View style={styles.container}>
            {bars.map((bar, index) => (
                // <View key={index} style={styles.bar}>
                    <Bar barId={lineId + index} chords={bar.chords} newChord={newChord} />
                // </View>
            ))}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderLeftWidth: 2,
        flexWrap: 'wrap',
    },
    bar: {
        // backgroundColor: '#f0f0f0',
        // borderRadius: 5,
        padding: 5,
    },
    barText: {
        fontSize: 10,
    },
});

export default Line;