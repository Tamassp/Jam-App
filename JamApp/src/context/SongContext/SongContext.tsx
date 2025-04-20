import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Updater, useImmer } from 'use-immer'
import { IBar, IChord, ILine, ISong } from '../../interfaces/Interfaces'

export const initialChord: IChord = {
    name: '_',
}

export const initialBar: IBar = {
    timeSignature: "4/4",
    chords: [
    {
        // name: "",
        children: [
            {
                name: "",
                children: []
            },
            {
                name: "G",
                children: []
            }
        ]
    }
    // {
    //     name: "",
    //     children: []
    // },
    // {
    //     name: "G",
    //     children: []
    // }
    ]
}

const initialBar2: IBar = {
    timeSignature: "4/4",
    chords: [
    {
        name: "Dm",
        children: []
    }
    ]
}

const initialBar3: IBar = {
    timeSignature: "4/4",
    chords: [
    {
        children: [
            {
                children: [
                    {
                        name: "C",
                        children: []
                    },
                    {
                        name: "",
                        children: []
                    }
                ]
            },
            {
                name: "",
                children: []
            }
        ]
    }
    ]
}

export const initialLine: ILine = {
    lineColor: '#aaaaaa',
    bars: [
        initialBar,
        initialBar2,
        initialBar3
        // initialBar,
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
                initialLine
            ]
        }
    ],
    //the problem is it could be different locally
    //but that could be overwritten by the local component
    // barLength: 4,
}

export interface ISongContext {
    allSongs: ISong[],
    allSongKeys: string[]
    song: ISong,
    initialLine: ILine,
    initialBar: IBar,
    initialChord: IChord,
    barLength: number,
    setBarLength: (length: number) => void,
    getAllSongs: (keys: string[]) => Promise<ISong[]>,
    getAllSongKeys: () => Promise<string[]>,
    setSong: (draft) => Updater<ISong>,
    saveSong: (key: string) => void,
    loadSong: (key: string) => void,
}

export const SongContext = React.createContext({
    allSongs: [],
    allSongKeys: [],
    song: initialSong,
    initialLine: initialLine,
    initialBar: initialBar,
    initialChord: initialChord,
    barLength: 4,
    setBarLength: (length: number) => {},
    getAllSongs: async (keys: string[]) => [{}],
    getAllSongKeys: async () => [{}],
    setSong: (draft) => {},
    saveSong: (key) => {},
    loadSong: (key) => {},
})

export const SongProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [allSongs, setAllSongs] = useImmer<ISong[]>([])
    const [allSongKeys, setAllSongKeys] = useImmer<string[]>([])
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

    const getAllSongKeys = async () => {
        try {
            const keys: readonly string[] = await AsyncStorage.getAllKeys()
            // return [...keys] as string[] // Convert to mutable array
            setAllSongKeys([...keys] as string[])

            getAllSongs([...keys])
        } catch (error) {
            console.error('Error getting all keys:', error)
            return []
        }
    }

    const getAllSongs = async (keys: string[]) => {
        try {
            const songs: ISong[] = []
            for (const key of keys) {
                console.log('Key:', key)
                const jsonValue = await AsyncStorage.getItem(key)
                console.log('Raw value from storage:', jsonValue) // Debugging

                if (jsonValue != null) {
                    try {
                        const parsedValue = JSON.parse(jsonValue)
                        songs.push(parsedValue)
                    } catch (parseError) {
                        console.error(`Error parsing key "${key}":`, parseError)
                    }
                }
            }
            console.log('All songs:', songs)
            setAllSongs(songs)
            return songs
        } catch (error) {
            console.error('Error getting all songs:', error)
            return []
        }
    }

    return (
        <SongContext.Provider value={{ allSongs, allSongKeys, song, initialChord, initialBar, initialLine, barLength, setBarLength, getAllSongs, getAllSongKeys, setSong, saveSong, loadSong }}>
            {children}
        </SongContext.Provider>
    )
}

export const useSongContext = () => React.useContext(SongContext)