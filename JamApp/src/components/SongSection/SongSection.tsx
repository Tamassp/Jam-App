import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bar, { BarProps } from '../Bar/Bar';

export interface SongSectionProps {
    bars: BarProps[];
}

const SongSection = ({ bars, ...props }: SongSectionProps): JSX.Element => {
    return (
        <View style={styles.container}>
            {bars.map((bar, index) => (
                <Bar key={index} chords={bar.chords} />
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

export default SongSection;