import * as React from 'react';
import { JSX } from 'react'
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Animated, GestureResponderEvent } from 'react-native';

export interface CheckboxProps {
    checked?: boolean;
    label?: string;
    onToggle?: (checked: boolean) => void;
    style?: ViewStyle;
}

const Checkbox = ({
    checked = false,
    label,
    onToggle,
    style,
}: CheckboxProps): JSX.Element => {

    const [isChecked, setIsChecked] = React.useState(checked);

    const handlePress = React.useCallback(
        (e: GestureResponderEvent) => {
            const newCheckedState = !isChecked;
            setIsChecked(newCheckedState);
            if (onToggle) onToggle(newCheckedState);
        },
        [isChecked, onToggle]
    );

    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[styles.checkboxWrapper, style]}
        >
            <View style={[styles.checkbox, isChecked && styles.checked]}>
                {isChecked && <Animated.Text style={styles.checkmark}>✓</Animated.Text>}
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checked: {
        backgroundColor: '#2196F3',
    },
    checkmark: {
        color: 'white',
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        color: 'black',
    },
});

export default Checkbox;
