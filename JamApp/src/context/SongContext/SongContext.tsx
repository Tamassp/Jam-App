import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Updater, useImmer } from 'use-immer'
import { IBar, IChord, ILine, ISong } from '../../interfaces/Interfaces'
import { buildChordTree } from '../../helpers/songEditor'
import { JSX } from 'react'

export const initialChord: IChord = {
    root: '_',
}

export const initialBar: IBar = {
    timeSignature: "4/4",
    chords: [
    {
        root: "",
        extensions: [],
        subChords: []
        // subChords: [
        //     {
        //         root: "",
        //         extensions: [],
        //         subChords: []
        //     },
        //     {
        //         root: "",
        //         extensions: [],
        //         subChords: []
        //     }
        // ]
    }
    // {
    //     root: "",
    //     subChords: []
    // },
    // {
    //     root: "G",
    //     subChords: []
    // }
    ]
}

const initialBar2: IBar = {
    timeSignature: "4/4",
    chords: [
    {
        root: "",
        extensions: [],
        subChords: []
    }
    ]
}

const initialBar3: IBar = {
    timeSignature: "4/4",
    chords: [
    {
        subChords: [
            {
                subChords: [
                    {
                        root: "",
                        extensions: [],
                        subChords: []
                    },
                    {
                        root: "",
                        extensions: [],
                        subChords: []
                    }
                ]
            },
            {
                root: "",
                extensions: [],
                subChords: []
            }
        ]
    }
    ]
}

export const initialLine: ILine = {
    lineColor: '#aaaaaa',
    bars: [
        initialBar,
        initialBar,
        initialBar,
        initialBar,
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
                // initialLine
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
    barsPerLine: number,
    chordsPerBar: number,
    ghostLine: ILine | null,
    setGhostLine: (line: ILine | null) => void,
    setBarsPerLine: (length: number) => void,
    setChordsPerBar: (length: number) => void,
    createNewSong: (timeSignature: string, chordsPerBar: number) => void,
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
    barsPerLine: 4,
    chordsPerBar: 1,
    ghostLine: null,
    setGhostLine: (line: ILine | null) => {},
    setBarsPerLine: (length: number) => {},
    setChordsPerBar: (length: number) => {},
    createNewSong: (timeSignature: string, chordsPerBar: number) => {},
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
    const [barsPerLine, setBarsPerLine] = React.useState<number>(4)
    const [chordsPerBar, setChordsPerBar] = React.useState<number>(4)
    const [ghostLine, setGhostLine] = React.useState<ILine | null>(null)

    React.useEffect(()=>{
        console.log(JSON.stringify(song))
    },[song])

    React.useEffect(() => {
        console.log('Bars Per Line:', barsPerLine);
        console.log('Chords per bar:', chordsPerBar);
    }, [barsPerLine, chordsPerBar]);

    const createNewSong = (timeSignature: string, chordsPerBar: number) => {
        setChordsPerBar(chordsPerBar)

        const bars = Array.from({ length: 4 }, (_, barIndex) => ({
            timeSignature,
            number: barIndex,
            chords: [buildChordTree(chordsPerBar)]
        }));

        const newSong: ISong = {
            title: "New Title",
            author: "New Author",
            sections: [
                {
                    title: "Intro",
                    lines: [
                        {
                            number: 0,
                            bars,
                            lineColor: '#aaaaaa',
                        }
                    ]
                }
            ]
        };

        setSong(newSong);
        setChordsPerBar(chordsPerBar);
    };

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
        <SongContext.Provider value={{ allSongs, allSongKeys, song, initialChord, initialBar, initialLine, barsPerLine, chordsPerBar, ghostLine, setGhostLine, setBarsPerLine, setChordsPerBar, createNewSong, getAllSongs, getAllSongKeys, setSong, saveSong, loadSong }}>
            {children}
        </SongContext.Provider>
    )
}

export const useSongContext = () => React.useContext(SongContext)