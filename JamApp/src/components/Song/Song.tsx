import * as React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import SongSection, { SongSectionProps } from '../SongSection/SongSection'
import { useFocus } from '../../context/FocusContext'
import { useSongContext } from '../../context/SongContext/SongContext'
import { ISong } from '../../interfaces/Interfaces'
import DynamicTextInput from '../DynamicTextInput/DynamicTextInput'


export interface SongProps {
    title: string;
    artist: string;
    songSections: SongSectionProps[];
}

const Song = ({
    title = "Title",
    artist = "Artist",
    songSections = [],
    ...props
}: SongProps): JSX.Element => {
    // Implement the component logic here
     const {setSong} = useSongContext();
     const [inputWidth, setInputWidth] = React.useState(0)

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
    return (
        <View style={styles.containerStyle}>
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
                <DynamicTextInput 
                    onFocus={handleOnArtistClick} 
                    onChangeText={(newText) => onArtistChange(newText)} 
                    style={styles.artistStyle}
                    >
                    {artist}
                </DynamicTextInput>
            </View>
            {songSections.map((songSection, index) => (
                <SongSection 
                    songSectionId={index.toString()}
                    key={index}
                    backgroundColor={songSection.backgroundColor} 
                    lines={songSection.lines}
                    title={songSection.title} />
            ))}
        </View>
    );
};

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
        height: '100%',
        padding: 32,
        backgroundColor: '#f0f0f0',

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
