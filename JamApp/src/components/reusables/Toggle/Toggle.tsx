import * as React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Text, Animated } from 'react-native';

export interface ToggleProps {
    isActive?: boolean;
    fontSize?: number;
    label?: string;
    onToggle?: (isActive: boolean) => void;
    style?: ViewStyle;
}

const Toggle = ({
    isActive = false,
    fontSize = 16,
    label,
    onToggle,
    style,
}: ToggleProps): JSX.Element => {

    const [active, setActive] = React.useState(isActive);
    const animatedValue = React.useRef(new Animated.Value(isActive ? 1 : 0)).current;

    const handlePress = () => {
        const newActiveState = !active;
        setActive(newActiveState);
        if (onToggle) onToggle(newActiveState);

        Animated.timing(animatedValue, {
            toValue: newActiveState ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ccc', '#4CAF50'], // Change color to suit your needs
    });

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.toggleButton, style]}>
            <Animated.View style={[styles.buttonBackground, { backgroundColor }]}>
                <Text style={[styles.buttonText, { fontSize }]}>
                    {label || (active ? 'Active' : 'Inactive')}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    toggleButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        overflow: 'hidden',
    },
    buttonBackground: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        // fontSize: 16,
    },
});

export default Toggle;
