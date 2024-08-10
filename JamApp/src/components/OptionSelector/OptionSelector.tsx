import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Animated, TouchableOpacityProps, GestureResponderEvent, TextInput } from 'react-native';
import  Button, {ButtonProps} from '../Button/Button';
import { useFocus } from '../../context/FocusContext'

export interface OptionSelectorProps extends ButtonProps {
    //open: boolean
    focusId: string
    options: string[]
    text: string
    setOption: React.Dispatch<React.SetStateAction<string>>
}

const OptionSelector = ({
    //children,
    //open,
    focusId,
    options,
    text,
    setOption,
    ...props }: OptionSelectorProps): JSX.Element => {
    const { focusedId, handleFocus } = useFocus()
    const [color, setColor] = React.useState("")
    const handleOnFocus = React.useCallback(() => {
        console.log(focusId)
        handleFocus(focusId)
        setColor('red')
    },[focusId])

    React.useEffect(() => {
        if(focusedId != focusId){
            setColor("transparent")
        }
    },[focusedId])

    const handleOnBlur = React.useCallback(() => {
        //setIsOpen(false)
        // handleFocus("")
    },[])

    return (
        <View style={[styles.wrapper, {backgroundColor: color}]}>
            <TextInput onFocus={handleOnFocus}
                onBlur={handleOnBlur}>{text}</TextInput>
            {focusedId == focusId && options.map((option, index) => (
                <Button
                    key={index}
                    onPress={() => setOption(option)}
                >
                    <Text>{option}</Text>
                </Button>
            ))}


        </View>
    )
}

export interface OptionSelectorStyles {
   wrapper: ViewStyle;
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        gap: 4,
        // paddingVertical: 4,
        // paddingHorizontal: 6,
    },
});

export default OptionSelector