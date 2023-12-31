import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  const [keys, setKeys] = useState([])
  const [bars, setBars] = useState([])
  const [lines, setLines] = useState([])
  const [newLine, setNewLine] = useState({bars: []})

  const song = {
    songSection: {
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

  useLayoutEffect(() => {
    setLines([...lines, {bars: bars}])
  }, [])

  const handleKey = (e , key) => {
    console.log(key);
    setKeys([...keys, key])
  }

  useEffect(() => {
    console.log(keys);
    console.log(keys[keys.length - 1]);
    // if(bars.length === 0) {
    //   setLines([...lines, {bars: bars}])
    // }
    setBars([...bars, {chords: [keys[keys.length - 1]]}])
    // setNewLine({ bars: [...newLine.bars, {chords: [keys[keys.length - 1]]}]})
    
  }
  , [keys])

  useEffect(() => {
    if(bars.length > 3) {
      setLines([...lines, {bars: bars}])
      setBars([])
    }
  }
  , [bars])

  // useEffect(() => {
  //   console.log(lines);
  // }
  // , [lines])
  
  const handleNewLine = (e) => {
    // setNewLine({bars: []})
    console.log(newLine);
    setLines([...lines, newLine])
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Open up App.js to start work app!</Text>
      {/* <Bar chords={['C', 'Am']} />
      <Bar chords={['C', 'Am']} />
      <Line bars={bars} /> */}
      {/* <SongSection
        lines={lines || []}
      /> */}
      <TouchableOpacity onPress={(e)=> handleNewLine(e)}>
        <Text>new line</Text>
      </TouchableOpacity>
      <SongEditor />
      <Keyboard onPress={handleKey} />
      <StatusBar style="auto" />
    </View>
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
