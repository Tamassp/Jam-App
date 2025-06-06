import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FocusProvider } from './src/context/FocusContext';
import Bar from './src/components/Bar/Bar';
import SongSection from './src/components/SongSection'
import Keyboard from './src/components/CustomKeyboard/CustomKeyboard'
import Line from './src/components/Line/Line'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import SongEditor from './src/components/SongEditor/SongEditor'
import MenuBar from './src/components/MenuBar/MenuBar';
import Main from './src/pages/Main'
import { SongProvider } from './src/context/SongContext/SongContext'
import { ActiveChordProvider } from './src/context/SongContext/ActiveChordContext';
import { PDFProvider } from './src/context/PDFContext'
// import StorybookUIRoot from './.storybook'
//export { default } from './.storybook';



// type Song = {
//   songSection: SongSectionProps
//   key: string
//   tempo: number
// }
const JamApp = 'true';

const App = () => {

  

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
    <SongProvider>
      <ActiveChordProvider>
        <FocusProvider>
          <PDFProvider>
            <Main />
          </PDFProvider>
        </FocusProvider>
      </ActiveChordProvider>
    </SongProvider>

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

export default App ;
