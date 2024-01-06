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
        <View>
           <Text>Title: {title}</Text>
            <Text>Artist: {artist}</Text>
            {songSections.map((songSection, index) => (
                <SongSection key={index} lines={songSection.lines} />
            ))}
        </View>
    );
};

export default Song;
