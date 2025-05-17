import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Animated, TouchableOpacityProps, GestureResponderEvent, TextInput } from 'react-native';
import  Button, {ButtonProps} from '../reusables/Button/Button';
import { useFocus } from '../../context/FocusContext'
import { usePDF } from '../../context/PDFContext'
import { JSX } from 'react'

export interface OptionSelectorVerticalProps extends ButtonProps {
    //open: boolean
    focusId: string
    options: string[]
    //text: string
    setOption: React.Dispatch<React.SetStateAction<string>>
}

const OptionSelectorVertical = ({
    //children,
    //open,
    focusId,
    options,
    //text,
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
                    style={[styles.menuItem, {borderBottomColor: index == options.length - 1 ? 'transparent' : '#ccc'}]}
                >
                    <Text style={{fontSize: 16}}>{option}</Text>
                </TouchableOpacity>
            ))}


        </View>
    )
}

export interface OptionSelectorVerticalStyles {
   wrapper: ViewStyle;
}

const styles = StyleSheet.create({
    menuItem: {
        padding: 8,
        backgroundColor: '#fff',
        width: 128,
        borderBottomWidth: 0.5,
    },
    wrapper: {
        flexDirection: 'column',
        borderRadius: 8,
        backgroundColor: '#fff',
        //clipping child to make it rounded
        overflow: 'hidden',
        width: 128,
        boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    },
});

export default OptionSelectorVertical