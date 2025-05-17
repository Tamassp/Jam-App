import React, { JSX } from 'react';
import { StyleSheet, View, ViewStyle, TextStyle, Text } from 'react-native';

interface DividerProps {
    // probably charts will be pulled from context
    size?: number;
}

const ChartList = ({
    // Implement props for the ChartList component here
    size = 1,
}: DividerProps): JSX.Element => {

    return (
        <View style={[{height: 16 * size},styles.container]}>

        </View>
    );
};

interface ChartListStyles {
    // Define styles for the ChartList component here
    container: ViewStyle;
}

const styles = StyleSheet.create<ChartListStyles>({
    container: {
        
    },
});

export default ChartList;
