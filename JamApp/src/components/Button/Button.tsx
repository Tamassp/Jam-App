import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Animated, TouchableOpacityProps, GestureResponderEvent } from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
    icon?: JSX.Element;
}

const Button = ({
    children,
    icon,
    onPress,
    style,
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
            style={[styles.wrapper, style]}
        >
            {icon && <View>{icon}</View>}
            {children &&
                <Animated.View>
                    <Animated.Text>{children}</Animated.Text>
                </Animated.View>
            }
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