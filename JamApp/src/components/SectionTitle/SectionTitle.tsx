import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Animated, TouchableOpacityProps, GestureResponderEvent, TextInput, Keyboard } from 'react-native';
import  Button, {ButtonProps} from '../reusables/Button/Button'
import { useFocus } from '../../context/FocusContext'
import { usePDF } from '../../context/PDFContext'

// Define props interface
interface SectionTitleProps {
    backgroundColor?: string
    focusId: string
    options: string[]
    text: string
    setOption: React.Dispatch<React.SetStateAction<string>>
}

// Functional component
const SectionTitle: React.FC<SectionTitleProps> = ({ 
    backgroundColor,
    focusId,
    options,
    text,
    setOption,
}: SectionTitleProps): JSX.Element => {
    
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
        <View style={[styles.wrapper, {backgroundColor: color, borderRadius: focusedId == focusId ? 4 : 4}]}>
            <TextInput 
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                style={
                    {
                        // padding: 4,
                        //marginRight: 8,
                        padding: isPDFView ? 0 : 4,
                        fontSize: 16,
                    }
                }>{text}
            </TextInput>
            {!isPDFView && focusedId == focusId && (
                <View style={styles.optionsWrapper}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                if (Keyboard.isVisible) {
                                    Keyboard.dismiss(); // First dismiss the keyboard
                                    setTimeout(() => {
                                        setOption(option) // Then trigger the button click after delay
                                    }, 50); // Small delay to allow keyboard dismissal
                                } else {
                                    setOption(option) // Directly trigger if keyboard is already dismissed
                                }
                            }}
                            style={[styles.menuItem, {borderRightColor: index == options.length - 1 ? 'transparent' : '#ccc'}]}
                        >
                            <Text style={{fontSize: 16, textAlign: 'center' }}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
  );
};

// Define styles interface
interface ComponentStyles {
    wrapper: ViewStyle;
    optionsWrapper: ViewStyle;
    menuItem: ViewStyle;
}

// Create styles
const styles = StyleSheet.create<ComponentStyles>({
    menuItem: {
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: 72,
        borderRadius: 4,
    },
    optionsWrapper: {
        flexDirection: 'row',
        overflow: 'hidden',
        gap: 8
    },
    wrapper: {
        flexDirection: 'row',
        gap: 16,
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 4,
    },
});

export default SectionTitle;