import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bar, { BarProps } from '../Bar/Bar';
import { LineProps } from '../Line/Line'
import { Line } from '../Line'

export interface SongSectionProps {
    lines: LineProps[];
    // bars: BarProps[];
    lineLength?: number;
}

const SongSection = ({ lines = [], lineLength = 4, ...props }: SongSectionProps): JSX.Element => {
    return (
        <View style={styles.container}>
                {lines.length > 0 && lines.map((line, index) => (
                    <Line key={index} bars={line.bars} />
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
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
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRightWidth: 1,
    },
});

export default SongSection;