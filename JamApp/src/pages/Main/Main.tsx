import * as React from 'react';
import { useCallback } from 'react';
import { View, StyleSheet, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import MenuBar from '../../components/MenuBar/MenuBar'
import SongEditor from '../../components/SongEditor/SongEditor'
import { StatusBar } from 'expo-status-bar';
import { ISong } from '../../interfaces/Interfaces'
import { useImmer } from "use-immer";
import ChartList from '../../components/ChartList'
import { useFocus } from '../../context/FocusContext'



export interface MainProps {
    onNewSheet?: () => void;
    onSave?: () => void;
    onExport?: () => void;
}

const Main = ({
    onNewSheet,
    onSave,
    onExport,
    ...props }: MainProps): JSX.Element => {
    
    const emptySong: ISong = {
        title: '',
        author: '',
        sections: [],
    }


    const testSong: ISong = 
    {
        title: 'The Worst Title',
        author: 'The Worst Author',
        sections: [
            {
                backgroundColor: '#aaaaaa',
                lines: [
                {
                    bars: [
                    {
                        chords: [
                            {
                                name: 'C',
                            },
                            {
                                name: 'G',
                            },
                            {
                                name: 'E',
                            },
                            {
                                name: 'F',
                            },
                        ]
                    },
                    {
                        chords: [
                            {
                                name: 'Gm',
                            },
                            {
                                name: 'Gm',
                            },
                            {
                                name: 'Em',
                            },
                            {
                                name: 'Fm',
                            },
                        ]
                    },
                    ]
                },
                    {
                    bars: [
                    {
                        chords: [
                            {
                                name: 'C',
                            },
                            {
                                name: 'G',
                            },
                            {
                                name: 'E',
                            },
                            {
                                name: 'F',
                            },
                        ]
                    },
                    {
                        chords: [
                            {
                                name: 'Gm',
                            },
                            {
                                name: 'Gm',
                            },
                            {
                                name: 'Em',
                            },
                            {
                                name: 'Fm',
                            },
                        ]
                    },
                    ]
                },
                ]
            }
        ]

    }

    const [song, setSong] = useImmer<ISong>(testSong);

    const handleNewSong = () => {
    //Initialize new song
    setSong(emptySong);
    // console.log('New song');
    console.log(song.title);
    
    }

    const { handleFocus } = useFocus()

    return (
        <View style={styles.wrapper}>
            {/* <MenuBar onNewSheet={handleNewSong}/> */}
            {/* <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start work app!</Text> */}
            <>
            {song &&
                <SongEditor  />
            }
            {/* <ChartList style={styles.chartList} /> */}
            <StatusBar style="auto" />
            </>
        </View>
    );
}

export interface MainStyles {
    chartList: ViewStyle;
    wrapper: ViewStyle;
}

const styles = StyleSheet.create({
    chartList: {
        position: 'absolute',
        top: 24,
        left: 24,
        zIndex: 1,
        margin: 16,
    },
    wrapper: {
        width: '100%',
        height: '100%',
        // flex: 1,
        // borderWidth:
        backgroundColor: '#555555',
        // alignItems: 'center',
        // justifyContent: 'center', 
    },
});

export default Main;