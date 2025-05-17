import * as React from 'react';
import { JSX } from 'react'
import { Text, StyleSheet, ViewStyle, View } from 'react-native';

export interface VerticalDividerProps {
    style?: ViewStyle;
}

const VerticalDivider = ({ style }: VerticalDividerProps): JSX.Element => {
    return (
        <View style={{
                width: 2,
                backgroundColor: 'black',
                opacity: 0.25,
                height: 48,
                marginHorizontal: 4,
        }}/>
    );
}

const styles = StyleSheet.create({
    container: {
        fontSize: 16,
        color: 'black',
    },
});

export default VerticalDivider;