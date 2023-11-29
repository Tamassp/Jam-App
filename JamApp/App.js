import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Bar from './src/components/Bar/Bar';
import SongSection from './src/components/SongSection'
import Keyboard from './src/components/Keyboard/Keyboard'
import { useEffect, useState } from 'react';


export default function App() {

  const [keys, setKeys] = useState([])
  const [bars, setBars] = useState([{chords:['C', 'Dm']}])

  const handleKey = (e , key) => {
    console.log(key);
    setKeys([...keys, key])
  }

  useEffect(() => {
    console.log(keys);
    console.log(keys[keys.length - 1]);
    setBars([...bars, {chords: [keys[keys.length - 1]]}])
  }
  , [keys])

  useEffect(() => {
    console.log(bars);
  }
  , [bars])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Open up App.js to start work app!</Text>
      <Bar chords={['C', 'Am']} />
      <Bar chords={['C', 'Am']} />
      <SongSection
        bars={bars || []}
      />
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
