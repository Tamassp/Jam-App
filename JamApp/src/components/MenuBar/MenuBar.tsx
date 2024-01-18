import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Button from '../Button'

export interface MenuBarProps {
    onNewSheet?: () => void;
    onSave?: () => void;
    onExport?: () => void;
}

const MenuBar = ({
    onNewSheet,
    onSave,
    onExport,
    ...props }: MenuBarProps): JSX.Element => {
    
    const handleNewSong = () => {
        onNewSheet();
    }

    
    return (
        <View style={styles.wrapper}>
            <Button onPress={handleNewSong}>+ New Song</Button>
            <Button onPress={onSave}>Save</Button>
            <Button onPress={onExport}>Export</Button>
        </View>
    );
}

export interface MenuBarStyles {
   wrapper: ViewStyle;
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 24,
        left: 0,
        zIndex: 10,
        // backgroundColor: 'lightgray',
        paddingVertical: 4,
        paddingHorizontal: 6,
        width: '100%',
        // height: 48,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        // width: 500,
    },
});

export default MenuBar;