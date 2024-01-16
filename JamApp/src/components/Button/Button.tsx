import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Animated, TouchableOpacityProps, GestureResponderEvent } from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
}

const Button = ({
    children,
    onPress,
    ...props }: ButtonProps): JSX.Element => {

    const handleOnPress = React.useCallback(
        (e: GestureResponderEvent) => {
        if (onPress) onPress(e)
        },
        [onPress],
    )

    return (
        <TouchableOpacity
            onPress={handleOnPress}
            style={styles.wrapper}
        >
            <Animated.View>
                <Animated.Text>{children}</Animated.Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

export interface ButtonStyles {
   wrapper: ViewStyle;
}

const styles = StyleSheet.create({
    wrapper: {
        borderColor: 'black',
        borderWidth: 1,
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 6,
    },
});

export default Button;