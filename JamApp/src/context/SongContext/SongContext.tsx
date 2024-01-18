import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Updater, useImmer } from 'use-immer'
import { ISong } from '../../interfaces/Interfaces'

export const initialSong: ISong = {
    title: 'New Title',
    author: 'New Author',
    sections: [
        {
            name: 'Intro',
            // backgroundColor: '#aaaaaa',
            lines: [
                {
                    bars: [
                        {
                            chords: [
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                            ]
                        },
                        {
                            chords: [
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                            ]
                        },
                        {
                            chords: [
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                            ]
                        },
                        {
                            chords: [
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                                {
                                    name: '_',
                                },
                            ]
                        },
                        
                    ]
                },
            ]
        }
    ]
}

export interface ISongContext {
    song: ISong,
    setSong: (draft) => Updater<ISong>,
    saveSong: () => void,
    loadSong: () => void,
}

export const SongContext = React.createContext({
    song: initialSong,
    setSong: (draft) => {},
    saveSong: () => {},
    loadSong: () => {},
})

export const SongProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [song, setSong] = useImmer<ISong>(initialSong);

    

    const saveSong = async () => {
        try {
            const jsonValue = JSON.stringify(song)
            await AsyncStorage.setItem('@song', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const loadSong = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@song')
            if (jsonValue != null) {
                setSong(JSON.parse(jsonValue))
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SongContext.Provider value={{ song, setSong, saveSong, loadSong }}>
            {children}
        </SongContext.Provider>
    )
}

export const useSongContext = () => React.useContext(SongContext)