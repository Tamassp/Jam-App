import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Bar from './src/components/Bar/Bar';
import SongSection from './src/components/SongSection'
import Keyboard from './src/components/Keyboard/Keyboard'


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Open up App.js to start work app!</Text>
      <Bar chords={['C', 'Am']} />
      <Bar chords={['C', 'Am']} />
      <SongSection
        bars={[
          {
            chords:['Cm', 'G']
          },
          {
            chords:['C,', 'G']
          },
        ]}
      />
      <Keyboard />
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
