import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bar, { BarProps } from '../Bar/Bar';
import { LineProps } from '../Line/Line'
import { Line } from '../Line'

export interface SongSectionProps {
    songSectionId: string;
    lines: LineProps[];
    backgroundColor?: string;
    // bars: BarProps[];
    lineLength?: number;
    newChord?: string;
}

const SongSection = ({ 
    songSectionId,
    lines = [], 
    backgroundColor = '#aaaaff', 
    lineLength = 4, 
    newChord, 
    ...props }: SongSectionProps): JSX.Element => {
    return (
        <View style={[styles.container, {backgroundColor}]}>
                {lines.length > 0 && lines.map((line, index) => (
                    <Line 
                        lineId={songSectionId + index}
                        key={index} 
                        bars={line.bars} 
                        newChord={newChord} />
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