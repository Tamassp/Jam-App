import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, Pressable, TextInput } from 'react-native';
import Bar, { BarProps } from '../Bar/Bar';
import { LineProps } from '../Line/Line'
import { Line } from '../Line'
import Button from '../Button/Button';
import { useSongContext } from '../../context/SongContext/SongContext';
import OptionSelector from '../OptionSelector/OptionSelector'

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
    const { initialLine, setSong } = useSongContext()

    const handleOnPress = () => {
        console.log('NEW SECTION');
    }

    const handleTitleChange = (title?: string) => {
        // UPDATE THE TITLE
        if(!title) {
            console.log("Default NEW TITLE")
            setSong(draft => {
                draft.sections[songSectionId].title = 'NEW TITLE'
            })
        }
        else {
            console.log('TITLE CHANGE: ' + title)
            setSong(draft => {
                draft.sections[songSectionId].title = title
            })
        }
        
    }

    const handleNewLine = React.useCallback(() => {
        console.log("NEW LINE")
        console.log(lines)

        setSong(draft => {
            draft.sections[songSectionId].lines.push(initialLine)
        })


    },[])

    const handleDeleteLine = React.useCallback((index: number) => {
        console.log("DELETE LINE")
        console.log(lines)
        setSong(draft => {
            // DELETE LINE BASED ON INDEX
            draft.sections[songSectionId].lines.splice(index, 1);
        })
    },[lines])

    const handleCopyLine = React.useCallback((index: number) => {
        console.log("COPY LINE")
        console.log("LINES: " + lines)
        console.log("LINEID: " + index)
        // MAKE A COPY OF THE LINE
        const copiedLine = lines[index]
        console.log(copiedLine)
        setSong(draft => {
            // INSERT THE COPIED LINE INTO THE ARRAY
            draft.sections[songSectionId].lines.splice(index, 0, copiedLine);
        })
    },[lines])

    React.useEffect(() => {
        //CONSOLE LOG THE WHOLE LINE OBJECT
        console.log("LINES: " + JSON.stringify(lines))
    }, [lines])

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <Pressable style={styles.title} >
                {/* <TextInput>{title}</TextInput> */}
                {/* <Text>{title}</Text> */}
                <OptionSelector focusId={`TEXT_${songSectionId}`} setOption={handleTitleChange} text={title} options={['Verse', 'Chorus', 'Bridge']} />
            </Pressable>
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
                    <Pressable onPress={() => handleDeleteLine(index)} style={{backgroundColor: 'red', padding: 8, margin: 2}}>
                        <Text>-</Text>
                    </Pressable>
                    <Pressable onPress={() => handleCopyLine(index)} style={{backgroundColor: 'red', padding: 8, margin: 2}}>
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