import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Animated, TouchableOpacityProps, GestureResponderEvent } from 'react-native';
import { useFocus } from '../../../context/FocusContext'

export interface ButtonProps extends TouchableOpacityProps {
    icon?: JSX.Element;
    focusId?: string;
}

const Button = ({
    children,
    icon,
    focusId,
    onPress,
    style,
    ...props }: ButtonProps): JSX.Element => {
    const {focusedId, handleFocus} = useFocus()
    const handleOnPress = React.useCallback(
        (e: GestureResponderEvent) => {
            if (onPress){
                onPress(e)
            }
        },
        [onPress],
    )

    // Hide the SECTION_EDIT button, if the text editor is focused
    if(focusedId && focusId === `EDIT_${focusedId.slice(-1)}`) return null
    return (
        <TouchableOpacity
            onPress={handleOnPress}
            style={[styles.wrapper, style]}
        >
            {icon && <View style={{opacity: focusId === focusedId ? 0.5 : 1}}>{icon}</View>}
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