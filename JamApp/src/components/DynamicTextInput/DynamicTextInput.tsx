import React, { JSX } from 'react';
import { TextInput } from 'react-native'

export interface DynamicTextInputProps extends React.ComponentProps<typeof TextInput> {
    // Define the props for your component here
}

const DynamicTextInput = ({
    children, 
    style, 
    ...props
}: DynamicTextInputProps): JSX.Element => {
    const [inputWidth, setInputWidth] = React.useState(0)

    return (
        <TextInput 
            onContentSizeChange={(e) => setInputWidth(e.nativeEvent.contentSize.width)}
            style={[style, { width: inputWidth + 32 }]}
            {...props}>
            {children}
        </TextInput>
    );
};

export default DynamicTextInput;