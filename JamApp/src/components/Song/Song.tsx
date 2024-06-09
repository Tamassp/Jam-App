import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import SongSection, { SongSectionProps } from '../SongSection/SongSection'

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

    return (
        <View style={styles.containerStyle}>
            <Text style={styles.titleStyle}>{title}</Text>
            <View style={styles.songHeaderStyles}>
                <Text>4/4</Text>
                
                <Text>Artist: {artist}</Text>
            </View>
            {songSections.map((songSection, index) => (
                <SongSection 
                    songSectionId={index.toString()}
                    key={index}
                    backgroundColor={songSection.backgroundColor} 
                    lines={songSection.lines} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {        
        width: '100%',
        maxWidth: 800,
        height: '100%',
        padding: 32,
        backgroundColor: '#f0f0f0',

    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        
    },
    songHeaderStyles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
});

export default Song;
