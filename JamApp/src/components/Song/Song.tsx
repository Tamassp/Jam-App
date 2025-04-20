import * as React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import SongSection, { SongSectionProps } from '../SongSection/SongSection'
import { useFocus } from '../../context/FocusContext'
import { initialLine, useSongContext } from '../../context/SongContext/SongContext'
import { ISong } from '../../interfaces/Interfaces'
import DynamicTextInput from '../DynamicTextInput/DynamicTextInput'
import Button from '../reusables/Button'
import { forwardRef, Ref } from 'react'
import Divider from '../Divider'


export interface SongProps {
    title: string;
    artist: string;
    songSections: SongSectionProps[];
    handleNewSection: () => void;
}

const Song = forwardRef<View, SongProps>(({
  title = "Title",
  artist = "Artist",
  songSections = [],
  handleNewSection,
  ...props
}, ref: Ref<View>) => {
    // Implement the component logic here
     const {setBarLength, setSong} = useSongContext();
     const [inputWidth, setInputWidth] = React.useState(0)
     const [isEditing, setIsEditing] = React.useState(true)
     
     

    const {handleFocus} = useFocus()
    const handleOnTitleClick = React.useCallback(() => {
        handleFocus("TEXT_TITLE")
    },[])
    
    const onTitleChange = React.useCallback((newTitle: string) => {
        setSong((draft: ISong) => {
            draft.title = newTitle
        });
    },[])

    const handleOnArtistClick = React.useCallback(() => {
        handleFocus("TEXT_ARTIST")
    },[])

    const onArtistChange = React.useCallback((newArtist: string) => {
        setSong((draft: ISong) => {
            draft.author = newArtist
        });
    },[])

    // const handleNewSection = () => {
    //     console.log("NEW SECTION");
    //     setSong(draft => {
    //         draft.sections.push({songSectionId: '1', lines: [initialLine]});
    //     });
    //     // handleNewLine(sectionIndex+1);
    //     setSectionIndex(sectionIndex + 1);

    // }
    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.containerStyle}>
            <View ref={ref}>
                <View style={styles.titleSectionStyle}>
                    <DynamicTextInput 
                        onFocus={handleOnTitleClick} 
                        onChangeText={(newText) => onTitleChange(newText)} 
                        style={styles.titleStyle}
                        >
                        {title}
                    </DynamicTextInput>
                </View>
                <View style={styles.songHeaderStyles}>
                    <Text>4/4</Text>
                    <Button onPress={() => setBarLength(2)}>
                        set barlength to 2
                    </Button>
                    <Button onPress={() => setBarLength(1)}>
                        set barlength to 1
                    </Button>
                    <DynamicTextInput 
                        onFocus={handleOnArtistClick} 
                        onChangeText={(newText) => onArtistChange(newText)} 
                        style={styles.artistStyle}
                        >
                        {artist}
                    </DynamicTextInput>
                </View>
                <View style={{gap: 16}}>
                    {songSections.map((songSection, sectionIndex) => (
                        <SongSection 
                            songSectionId={sectionIndex.toString()}
                            key={sectionIndex}
                            backgroundColor={songSection.backgroundColor}
                            lines={songSection.lines}
                            title={songSection.title} 
                            sectionIndex={sectionIndex} />
                    ))}
                </View>
            </View>
            {isEditing && 
                <View style={styles.newSection}>
                    <Button onPress={handleNewSection}>New Section</Button>
                </View>
                }
            <Divider size={16} />
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    artistStyle: {
        textAlign: 'center',
        fontSize: 24,
        // fontWeight: 'bold',
        backgroundColor: 'rgba(255,77,0,0.5)',
    },
    containerStyle: {        
        width: '100%',
        maxWidth: 800,
        // height: '100%',
        padding: 32,
        // backgroundColor: '#f0f0f0',

    },
    newSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    titleSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        backgroundColor: 'rgba(255,77,0,0.5)',
        
        
    },
    songHeaderStyles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
});

export default Song;
