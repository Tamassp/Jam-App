import * as React from 'react';
import { JSX } from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native';

export interface LabelProps {
    text: string;
    style?: TextStyle;
}

const Label = ({ text, style }: LabelProps): JSX.Element => {
    return (
        <Text style={[styles.label, style]}>
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        color: 'black',
    },
});

export default Label;
