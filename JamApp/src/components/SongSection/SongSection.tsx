import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, Pressable, TextInput, Keyboard } from 'react-native';
import Bar, { BarProps } from '../Bar/Bar';
import { LineProps } from '../Line/Line'
import { Line } from '../Line'
import Button from '../reusables/Button/Button';
import { useSongContext } from '../../context/SongContext/SongContext';
import OptionSelector from '../OptionSelector/OptionSelector'
import OptionSelectorVertical from '../OptionSelectorVertical/OptionSelectorVertical'
import EditIcon from '../../icons/EditIcon'
import { useFocus } from '../../context/FocusContext'
import TriangleIcon from '../../icons/TriangleIcon'
import SectionTitle from '../SectionTitle/SectionTitle'
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
    const { focusedId, handleFocus } = useFocus()
    const { initialLine, setSong } = useSongContext()
    // const [isEditOpen, setIsEditOpen] = React.useState<boolean>(false);

    const handleOnPress = () => {
        console.log('NEW SECTION');
    }

    const handleTitleChange = (newTitle?: string) => {
        if(newTitle === title){
            handleFocus("")
            return
        }

        // UPDATE THE TITLE
        if(!newTitle) {
            console.log("Default NEW TITLE")
            setSong(draft => {
                draft.sections[songSectionId].title = 'NEW TITLE'
            })
        }
        else {
            console.log('TITLE CHANGE: ' + newTitle)
            setSong(draft => {
                draft.sections[songSectionId].title = newTitle
            })
        }
    }

    React.useEffect(() => {
        handleFocus("")
    },[title])

    const handleEditButtonPress = React.useCallback(() => {
        // setIsEditOpen(!isEditOpen)
        if(focusedId == `EDIT_${songSectionId}`) {
            handleFocus("")
        } else {
            handleFocus(`EDIT_${songSectionId}`)
        }
    }, [focusedId])

    const handleNewLine = React.useCallback((index: number) => {
        console.log("NEW LINE")
        console.log(lines)

        setSong(draft => {
            // ADD A NEW LINE TO THE ARRAY AFTER THE CURRENT LINE
            draft.sections[songSectionId].lines.splice(index + 1, 0, initialLine);
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
            <View style={styles.titleWrapper}>
                <Pressable style={styles.title} >
                    {/* <TextInput>{title}</TextInput> */}
                    {/* <Text>{title}</Text> */}
                    {/* <OptionSelector focusId={`TEXT_${songSectionId}`} setOption={handleTitleChange} text={title} options={['Verse', 'Chorus', 'Bridge']} backgroundColor='#ddaaaa' /> */}
                    <SectionTitle focusId={`TEXT_${songSectionId}`} setOption={handleTitleChange} text={title} options={['Verse', 'Chorus', 'Bridge']} backgroundColor='#ddaaaa' />
                </Pressable>
                <Button 
                    onPress={handleEditButtonPress} 
                    icon={<EditIcon width={20} height={20} />}
                    style={{borderWidth: 0}}
                    focusId={`EDIT_${songSectionId}`}
                />
                <View>
                    <OptionSelectorVertical focusId={`EDIT_${songSectionId}`} style={styles.sectionOptions} options={["Add Repeat", "Do something", "Delete"]} text={'icon'} setOption={function (value: React.SetStateAction<string>): void {
                        throw new Error('Function not implemented.')
                    } } />
                </View>
            </View>
            

            {lines.length > 0 && lines.map((line, index) => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Line 
                        lineId={songSectionId + index}
                        key={index} 
                        bars={line.bars} 
                        newChord={newChord} />
                    <Pressable onPress={() => handleNewLine(index)} style={{backgroundColor: 'red', padding: 8, margin: 2}}>
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
        width: 672
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
    sectionOptions: {
        position: 'absolute',
        zIndex: 1,
        top: -16,
        left: 0,
        // marginTop: 16

    },
    title: {
        // position: 'absolute',
        zIndex: 1,
        // top: -20,
        // left: -10,
        //padding: 5,
        // backgroundColor: 'lightgreen',
        // borderRadius: 2,
    },
    titleWrapper: {
        position: 'absolute',
        zIndex: 1,
        top: -32,
        left: -20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 5,
        
        // backgroundColor: '#f0f0f0',
    },
    
});

export default SongSection;