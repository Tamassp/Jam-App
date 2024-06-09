import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, Pressable } from 'react-native';
import Bar, { BarProps } from '../Bar/Bar';
import { LineProps } from '../Line/Line'
import { Line } from '../Line'
import Button from '../Button/Button';
import { SongContext } from '../../context/SongContext/SongContext';

export interface SongSectionProps {
    songSectionId: string;
    title?: string;
    lines: LineProps[];
    // setLines?: React.Dispatch<React.SetStateAction<LineProps[]>>;
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
    // setLines = () => {},
    backgroundColor = '#ffffff', 
    lineLength = 4, 
    newChord, 
    // isEditing = true,
    ...props }: SongSectionProps): JSX.Element => {
    const { initialLine, setSong } = React.useContext(SongContext);

    const handleOnPress = () => {
        console.log('NEW SECTION');
    }
    const handleNewLine = React.useCallback(() => {
        console.log("NEW LINE")
        console.log(lines)

        setSong(draft => {
            draft.sections[songSectionId].lines.push(initialLine)
        })


    },[])

    const handleDeleteLine = React.useCallback(() => {
        console.log("DELETE LINE")
        console.log(lines)
        setSong(draft => {
            // Delete the line based on id
            draft.sections[songSectionId].lines.pop()
        })
    },[])

    const handleCopyLine = React.useCallback(() => {
        console.log("COPY LINE")
        console.log(lines)
        setSong(draft => {
            // Copy the line based on id
            draft.sections[songSectionId].lines.push(lines[0])
        })
    },[])

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <View style={styles.title}>
                <Text>{title}</Text>
            </View>
            {lines.length > 0 && lines.map((line, index) => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Line 
                        lineId={songSectionId + index}
                        key={index} 
                        bars={line.bars} 
                        newChord={newChord} />
                    <Pressable onPress={handleNewLine} style={{backgroundColor: 'red', padding: 8, margin: 2}}>
                        <Text>+</Text>
                    </Pressable>
                    <Pressable onPress={handleDeleteLine} style={{backgroundColor: 'red', padding: 8, margin: 2}}>
                        <Text>-</Text>
                    </Pressable>
                    <Pressable onPress={handleCopyLine} style={{backgroundColor: 'red', padding: 8, margin: 2}}>
                        <Text>Copy</Text>
                    </Pressable>
                </View>
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