import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FocusProvider } from './src/context/FocusContext';
import Bar from './src/components/Bar/Bar';
import SongSection from './src/components/SongSection'
import Keyboard from './src/components/Keyboard/Keyboard'
import Line from './src/components/Line/Line'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import SongEditor from './src/components/SongEditor/SongEditor'

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
              chords: ['C', 'Am']
            },
            {
              chords: ['C', 'Am']
            },
            {
              chords: ['C', 'Am']
            },
            {
              chords: ['C', 'Am']
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
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <Text>Open up App.js to start work app!</Text> */}
      <SongEditor song={song} />
      <StatusBar style="auto" />
    </View>
    </FocusProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
