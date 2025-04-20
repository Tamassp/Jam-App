import * as React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

export interface TitleSubtitleProps {
    title: string
    subTitle: string
    style?: TextStyle
}

const TitleSubtitle = ({ title, subTitle, style }: TitleSubtitleProps): JSX.Element => {
    return (
        <>
            <Text style={[styles.title, style]}>
                {title}
            </Text>
            <Text style={[styles.subTitle, style]}>
                {subTitle}
            </Text>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'regular',
    },
    subTitle: {
        fontSize: 14,
        fontWeight: 'light',
        marginTop: 4,
        marginLeft: 1
    }
});

export default TitleSubtitle;
