import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Animated, TouchableOpacityProps, GestureResponderEvent, TextInput } from 'react-native';
import  Button, {ButtonProps} from '../reusables/Button/Button';
import { useFocus } from '../../context/FocusContext'
import { usePDF } from '../../context/PDFContext'
import { JSX } from 'react'

export interface OptionSelectorProps extends ButtonProps {
    //open: boolean
    backgroundColor?: string
    focusId: string
    options: string[]
    text: string
    setOption: React.Dispatch<React.SetStateAction<string>>
}

const OptionSelector = ({
    //children,
    //open,
    backgroundColor,
    focusId,
    options,
    text,
    setOption,
    ...props }: OptionSelectorProps): JSX.Element => {
    const { isPDFView } = usePDF();
    const { focusedId, handleFocus } = useFocus()
    const [color, setColor] = React.useState(backgroundColor || 'transparent')
    const handleOnFocus = React.useCallback(() => {
        console.log("OptionSelector Focus Id", focusId)
        handleFocus(focusId)
        //setColor('red')
    },[focusId])

    // React.useEffect(() => {
    //     if(focusedId != focusId){
    //         setColor("transparent")
    //     }
    // },[focusedId])

    const handleOnBlur = React.useCallback(() => {
        //setIsOpen(false)
        // handleFocus("")
    },[])

    

    return (
        <View style={[styles.wrapper, {backgroundColor: color, borderRadius: focusedId == focusId ? 4 : 0}]}>
            <TextInput 
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                style={
                    {
                        // padding: 4,
                        //marginRight: 8,
                        fontSize: 16,
                    }
                }>{text}
            </TextInput>
            {!isPDFView && focusedId == focusId && (
                <View style={styles.optionsWrapper}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setOption(option)}
                            style={[styles.menuItem, {borderRightColor: index == options.length - 1 ? 'transparent' : '#ccc'}]}
                        >
                            <Text style={{fontSize: 16, textAlign: 'center' }}>{option}</Text>
                        </TouchableOpacity>
                        // <Button
                        //     key={index}
                        //     onPress={() => setOption(option)}
                        // >
                        //     <Text>{option}</Text>
                        // </Button>
                    ))}
                </View>
            )}


        </View>
    )
}

export interface OptionSelectorStyles {
   wrapper: ViewStyle;
}

const styles = StyleSheet.create({
    menuItem: {
        padding: 8,
        backgroundColor: '#fff',
        width: 72,
        borderRightWidth: 0.5,
    },
    optionsWrapper: {
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    wrapper: {
        flexDirection: 'row',
        gap: 16,
        paddingVertical: 4,
        paddingHorizontal: 6,
    },
});

export default OptionSelector