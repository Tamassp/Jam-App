import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Updater, useImmer } from 'use-immer'
import { IBar, IChord, ILine, ISong } from '../../interfaces/Interfaces'

export const initialChord: IChord = {
    name: '_',
}

export const initialBar: IBar = {
    chords: [
        initialChord,
        initialChord,
        initialChord,
        initialChord,
    ]
}

export const initialLine: ILine = {
    bars: [
        initialBar,
        initialBar,
        initialBar,
        initialBar,
    ]
}

export const initialSong: ISong = {
    title: 'New Title',
    author: 'New Author',
    sections: [
        {
            name: 'Intro',
            // backgroundColor: '#aaaaaa',
            lines: [
                initialLine,
            ]
        }
    ],
    //the problem is it could be different locally
    //but that could be overwritten by the local component
    // barLength: 4,
}

export interface ISongContext {
    song: ISong,
    initialLine: ILine,
    initialBar: IBar,
    initialChord: IChord,
    setSong: (draft) => Updater<ISong>,
    saveSong: () => void,
    loadSong: () => void,
}

export const SongContext = React.createContext({
    song: initialSong,
    initialLine: initialLine,
    initialBar: initialBar,
    initialChord: initialChord,
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
        <SongContext.Provider value={{ song, initialChord, initialBar, initialLine, setSong, saveSong, loadSong }}>
            {children}
        </SongContext.Provider>
    )
}

export const useSongContext = () => React.useContext(SongContext)