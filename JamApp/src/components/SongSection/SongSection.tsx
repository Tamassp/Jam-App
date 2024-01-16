import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Bar, { BarProps } from '../Bar/Bar';
import { LineProps } from '../Line/Line'
import { Line } from '../Line'
import Button from '../Button/Button';

export interface SongSectionProps {
    songSectionId: string;
    title?: string;
    lines: LineProps[];
    backgroundColor?: string;
    // bars: BarProps[];
    lineLength?: number;
    newChord?: string;
    // isEditing?: boolean;
}

const SongSection = ({
    title = 'Section Title',
    songSectionId,
    lines = [], 
    backgroundColor = '#ffffff', 
    lineLength = 4, 
    newChord, 
    // isEditing = true,
    ...props }: SongSectionProps): JSX.Element => {
    const handleOnPress = () => {
        console.log('NEW SECTION');
    }
    return (
        <View style={[styles.container, {backgroundColor}]}>
            <View style={styles.title}>
                <Text>{title}</Text>
            </View>
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
        // borderLeftWidth: 2,
        marginTop: 20,
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
    title: {
        position: 'absolute',
        zIndex: 1,
        top: -20,
        left: -10,
        padding: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 2,
    },
    
});

export default SongSection;