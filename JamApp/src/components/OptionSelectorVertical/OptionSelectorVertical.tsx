import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Animated, TouchableOpacityProps, GestureResponderEvent, TextInput } from 'react-native';
import  Button, {ButtonProps} from '../reusables/Button/Button';
import { useFocus } from '../../context/FocusContext'
import { usePDF } from '../../context/PDFContext'

export interface OptionSelectorVerticalProps extends ButtonProps {
    //open: boolean
    focusId: string
    options: string[]
    text: string
    setOption: React.Dispatch<React.SetStateAction<string>>
}

const OptionSelectorVertical = ({
    //children,
    //open,
    focusId,
    options,
    text,
    setOption,
    style,
    ...props }: OptionSelectorVerticalProps): JSX.Element => {
    const { isPDFView } = usePDF();
    const { focusedId, handleFocus } = useFocus()
    const handleOnBlur = React.useCallback(() => {
        //setIsOpen(false)
        // handleFocus("")
    },[])
    if(isPDFView || focusedId != focusId) return null
    return (
        <View style={[styles.wrapper, style]}>
            
            {options && options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => setOption(option)}
                >
                    <Text>{option}</Text>
                </TouchableOpacity>
            ))}


        </View>
    )
}

export interface OptionSelectorVerticalStyles {
   wrapper: ViewStyle;
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        gap: 4,
        backgroundColor: '#f0f0f0',
        padding: 8,
        width: 128,
        // paddingVertical: 4,
        // paddingHorizontal: 6,
    },
});

export default OptionSelectorVertical