import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bar from '../Bar'
import { BarProps } from '../Bar/Bar'

export interface LineProps {
    bars: BarProps[];
    lineLength?: number;
}

const Line = ({ bars, lineLength = 4, ...props }: LineProps): JSX.Element => {

    if(bars.length < lineLength) {
        const initialBarLength = bars.length;
        console.log('barslenght', bars.length);
        console.log('lineLength', lineLength);
        console.log('bars', bars, ">>", bars.length);
        for(let i = 0; i < lineLength - initialBarLength; i++) {
            console.log('YEEE');
            bars.push({chords: [' 1']});
            
            
        }
        console.log('bars', bars, ">>", bars.length);
    }

    return (
        <View style={styles.container}>
            {bars.map((bar, index) => (
                <View key={index} style={styles.bar}>
                    <Bar chords={bar.chords} />
                </View>
            ))}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderLeftWidth: 2,
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