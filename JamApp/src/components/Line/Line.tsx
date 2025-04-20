import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Bar from '../Bar'
import { BarProps } from '../Bar/Bar'

export interface LineProps {
    sectionIndex: number;
    lineIndex: number;
    bars: BarProps[];
    lineLength?: number;
    newChord?: string;
}

const Line = ({
    sectionIndex,
    lineIndex,
    bars,
    lineLength = 4,
    newChord,
    ...props
}: LineProps): JSX.Element => {
    return (
        <View style={styles.container}>
            {bars.map((bar, barIndex) => (
                <Bar
                    key={`${sectionIndex}-${lineIndex}-${barIndex}`}
                    sectionIndex={sectionIndex}
                    lineIndex={lineIndex}
                    barIndex={barIndex}
                    chords={bar.chords}
                    // beats={bar.beats ?? 4} // fallback if beats is not in BarProps
                    newChord={newChord}
                    barId={''}                
                />
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