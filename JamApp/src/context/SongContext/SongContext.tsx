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
            //name: 'Intro',
            title: 'Intro',
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
    allSongs: string[]
    song: ISong,
    initialLine: ILine,
    initialBar: IBar,
    initialChord: IChord,
    barLength: number,
    setBarLength: (length: number) => void,
    getAllSongs: () => Promise<string[]>,
    setSong: (draft) => Updater<ISong>,
    saveSong: (key: string) => void,
    loadSong: (key: string) => void,
}

export const SongContext = React.createContext({
    allSongs: [],
    song: initialSong,
    initialLine: initialLine,
    initialBar: initialBar,
    initialChord: initialChord,
    barLength: 4,
    setBarLength: (length: number) => {},
    getAllSongs: async () => [{}],
    setSong: (draft) => {},
    saveSong: (key) => {},
    loadSong: (key) => {},
})

export const SongProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [allSongs, setAllSongs] = useImmer<string[]>([])
    const [song, setSong] = useImmer<ISong>(initialSong);
    const [barLength, setBarLength] = React.useState<number>(4)

    React.useEffect(()=>{
        console.log(JSON.stringify(song))
    },[song])

    const saveSong = async (key: string) => {
        try {
            const jsonValue = JSON.stringify(song)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const loadSong = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            if (jsonValue != null) {
                setSong(JSON.parse(jsonValue))
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getAllSongs = async () => {
        try {
            const keys: readonly string[] = await AsyncStorage.getAllKeys()
            // return [...keys] as string[] // Convert to mutable array
            setAllSongs([...keys] as string[])
        } catch (error) {
            console.error('Error getting all keys:', error)
            return []
        }
    }

    return (
        <SongContext.Provider value={{ allSongs, song, initialChord, initialBar, initialLine, barLength, setBarLength, getAllSongs, setSong, saveSong, loadSong }}>
            {children}
        </SongContext.Provider>
    )
}

export const useSongContext = () => React.useContext(SongContext)