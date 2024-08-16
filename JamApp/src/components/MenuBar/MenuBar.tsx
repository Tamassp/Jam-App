import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Button from '../Button'

export interface MenuBarProps {
    onNewSheet?: () => void;
    onSave?: () => void;
    onExport?: () => void;
    onChartListOpen?: () => void;
}

const MenuBar = ({
    onNewSheet,
    onSave,
    onExport,
    onChartListOpen,
    ...props }: MenuBarProps): JSX.Element => {
    
    const handleNewSong = () => {
        onNewSheet();
    }

    const handleOpenChartsList = () => {
        onChartListOpen()
    }

    
    return (
        <View style={styles.wrapper}>
            <View style={styles.chartsMenu}>
                 <Button onPress={handleOpenChartsList}>Charts</Button>
                 <Button onPress={handleNewSong}>+ New Song</Button>
            </View>
            <View style={styles.songMenu}>
                {/* MOVED TO CHARTS MENU */}
                {/* <Button onPress={handleNewSong}>+ New Song</Button> */}
                <Button onPress={onSave}>Save</Button>
                <Button onPress={onExport}>Export</Button>
            </View>
        </View>
    );
}

export interface MenuBarStyles {
   wrapper: ViewStyle;
}

const styles = StyleSheet.create({
    chartsMenu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
        alignItems: 'center',
    },
    songMenu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
        alignItems: 'center',
    },
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
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
        // width: 500,
    },
});

export default MenuBar;