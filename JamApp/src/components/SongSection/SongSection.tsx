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
import { generateGhostLine, isLineFilled, isValidFocusedId } from '../../helpers/songEditor'
import { ILine } from '../../interfaces/Interfaces'
import { JSX } from 'react'
export interface SongSectionProps {
    songSectionId: string;
    sectionIndex: number;
    title?: string;
    lines: ILine[];
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
    sectionIndex,
    lines = [],
    // setLines = () => {},
    backgroundColor = '#ffffff', 
    lineLength = 4, 
    newChord, 
    // isEditing = true,
    ...props }: SongSectionProps): JSX.Element => {
    const { focusedId, handleFocus } = useFocus()
    const { song, initialLine, barsPerLine, chordsPerBar, ghostLine, setGhostLine, setSong } = useSongContext()
    const lastLine = lines[lines.length - 1];

    const isFocused = focusedId?.id === `${songSectionId}` && focusedId?.type === "edit";

    // const shouldShowGhostLine = isLineFilled(lastLine);
    // const ghostLine = shouldShowGhostLine ? generateGhostLine(barLength, chordsPerBar) : null;

    const handleOnPress = () => {
        console.log('NEW SECTION');
    }

    const handleTitleChange = (newTitle?: string) => {
        if(newTitle === title){
            handleFocus("", "other")
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
        handleFocus("", "other")
    },[title])

    const handleEditButtonPress = React.useCallback(() => {
        if (!isValidFocusedId(focusedId)) return;
        if(focusedId.id == `${songSectionId}` && focusedId.type === "edit") {
            handleFocus("", "other")
        } else {
            handleFocus(`${songSectionId}`, "edit")
        }
    }, [focusedId?.id])

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

    const handleActivateGhostLine = () => {
        setSong(draft => {
        const newLine = generateGhostLine(barsPerLine, chordsPerBar);
        draft.sections[sectionIndex].lines.push(newLine);
        });
    };

    // GENERATE A GHOST LINE IF THE LAST LINE IS FILLED
    React.useEffect(() => {
        const lastLine = song.sections[sectionIndex].lines.at(-1);
        if (isLineFilled(lastLine) && !ghostLine) {
            setGhostLine(generateGhostLine(barsPerLine, chordsPerBar));
        }
    }, [song]);

    return (
        <View style={[styles.container, {backgroundColor: isFocused ? 'rgba(205,152,152,0.2)' : backgroundColor}]} {...props}>
            <View style={styles.titleWrapper}>
                <Pressable style={styles.title} >
                    {/* <TextInput>{title}</TextInput> */}
                    {/* <Text>{title}</Text> */}
                    {/* <OptionSelector focusId={`TEXT_${songSectionId}`} setOption={handleTitleChange} text={title} options={['Verse', 'Chorus', 'Bridge']} backgroundColor='#ddaaaa' /> */}
                    <SectionTitle focusId={{id: `${songSectionId}`, type: "text"}} setOption={handleTitleChange} text={title} options={['Verse', 'Chorus', 'Bridge']} backgroundColor='#ddaaaa' />
                </Pressable>
                <Button 
                    onPress={handleEditButtonPress} 
                    icon={<EditIcon width={20} height={20} />}
                    style={{borderWidth: 0}}
                    focusId={{id: `${songSectionId}`, type: "edit"}}
                />
                <View>
                    <OptionSelectorVertical focusId={{id: `${songSectionId}`, type: "other"}} style={styles.sectionOptions} options={["Add Repeat", "Do something", "Delete"]} text={'icon'} setOption={function (value: React.SetStateAction<string>): void {
                        throw new Error('Function not implemented.')
                    } } />
                </View>
            </View>
            

            {lines.length > 0 && lines.map((line, index) => (
                <View style={styles.lineContainer} key={`${sectionIndex}-${index}`}>
                     <Line
                        key={`${sectionIndex}-${index}`}
                        sectionIndex={sectionIndex}
                        lineIndex={index}
                        bars={line.bars}
                        lineLength={line.lineLength}
                        newChord={newChord}
                    />
                    {focusedId && focusedId.id === `${songSectionId}` && focusedId.type === "edit" &&
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    }
                </View>
            ))}

            {ghostLine && (
                <Line
                    bars={ghostLine.bars}
                    sectionIndex={sectionIndex}
                    lineIndex={lines.length}
                    ghost
                    onActivate={handleActivateGhostLine}
                />
            )}
        </View>
    );
}



const styles = StyleSheet.create({
    // container: {
    //     flexDirection: 'column',
    //     justifyContent: 'space-between',
    //     // borderLeftWidth: 2,
    //     marginTop: 20,
    //     width: 672,

    // },
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 8,
        width: '100%',
        borderRadius: 4
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'lightgray',
        marginLeft: 24,
        marginRight: 16
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
    // titleWrapper: {
    //     position: 'absolute',
    //     zIndex: 1,
    //     top: -32,
    //     left: -20,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        // marginTop: 16,
        marginLeft: 8,
        marginBottom: -4,
    },
    
});

export default SongSection;