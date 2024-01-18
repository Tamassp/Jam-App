import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FocusProvider } from './src/context/FocusContext';
import Bar from './src/components/Bar/Bar';
import SongSection from './src/components/SongSection'
import Keyboard from './src/components/Keyboard/Keyboard'
import Line from './src/components/Line/Line'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import SongEditor from './src/components/SongEditor/SongEditor'
import MenuBar from './src/components/MenuBar/MenuBar';
import Main from './src/pages/Main'

// type Song = {
//   songSection: SongSectionProps
//   key: string
//   tempo: number
// }

export default function App() {

  

  const [song, setSong] = useState(
    {
    songSection: {
      backgroundColor: '#aaffaa',
      lines: [
        {
          bars: [
            {
              chords: ['_', '_']
            },
            {
              chords: ['_', '_']
            },
            {
              chords: ['_', '_']
            },
            {
              chords: ['_', '_']
            }
          ]
        },
        {
          bars: [
            {
              chords: ['D', 'Am']
            },
            {
              chords: ['D', 'Am']
            },
            {
              chords: ['D', 'Am']
            },
            {
              chords: ['D', 'Am']
            }
          ]
        },
      ]
    },
    key: 'C',
    tempo: 120
  }
  )
  

  return (
    <FocusProvider>
      <Main />
    </FocusProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
