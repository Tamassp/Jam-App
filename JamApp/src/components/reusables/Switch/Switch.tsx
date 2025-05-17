import * as React from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, ViewStyle } from 'react-native';
import Label from '../Label/Label'
import { JSX } from 'react'

export interface SwitchProps {
    isOn?: boolean;
    label?: string;
    onToggle?: (isOn: boolean) => void;
    style?: ViewStyle;
}

const Switch = ({
    isOn = false,
    label,
    onToggle,
    style,
}: SwitchProps): JSX.Element => {

    const [switchState, setSwitchState] = React.useState(isOn);
    const animatedValue = React.useRef(new Animated.Value(isOn ? 1 : 0)).current;

    const handleToggle = () => {
        const newState = !switchState;
        setSwitchState(newState);
        if (onToggle) onToggle(newState);

        Animated.timing(animatedValue, {
            toValue: newState ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ccc', '#2196F3'],
    });

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 22],
    });

    return (
        <View style={[styles.switchWrapper, style]}>
            {label && <Label text={label} style={styles.label} />}
            <TouchableOpacity onPress={handleToggle} style={styles.switch}>
                <Animated.View style={[styles.track, { backgroundColor }]} />
                <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    switchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginRight: 8,
    },
    switch: {
        width: 40,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 2,
        position: 'relative',
    },
    track: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: '#ccc',
    },
    thumb: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'white',
    },
});

export default Switch;
