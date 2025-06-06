import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Toggle from '../Toggle/Toggle'
import { JSX } from 'react'

export interface ToggleGroupProps {
    toggles?: { label: string; isActive?: boolean }[];
    onToggle?: (index: number, isActive: boolean) => void;
    mainToggle?: { label: string; isActive?: boolean };
    onMainToggle?: (isActive: boolean) => void;
    style?: ViewStyle;
}

const ToggleGroup = ({
    toggles,
    onToggle,
    mainToggle,
    onMainToggle,
    style,
}: ToggleGroupProps): JSX.Element => {
    React.useEffect(() => {
        console.log("ToggleGroup received isActive:", toggles);
    }, [toggles]);
    return (
        <View style={[styles.container, style]}>
            {toggles && toggles.map((toggle, index) => (
                <Toggle
                    key={index}
                    label={toggle.label}
                    isActive={toggle.isActive}
                    onToggle={(isActive) => onToggle(index, isActive)}
                    style={styles.toggle}
                />
            ))}
            {mainToggle && (
            <Toggle
                label={mainToggle.label}
                isActive={mainToggle.isActive}
                onToggle={onMainToggle}
                style={styles.mainToggle}
                backgroundStyle={{ paddingHorizontal: 20 }}
                fontSize={20}
            />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    toggle: {
        // flex: 1,
        marginHorizontal: 5,
    },
    mainToggle: {
        // flex: 1.2, // Adjust the flex value to make it bigger than the rest
        marginHorizontal: 5,
        // paddingHorizontal: 15, // Extra padding for a larger appearance
    },
});

export default ToggleGroup;
