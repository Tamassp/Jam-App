import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import BaseModal from '../reusables/BaseModal/BaseModal'

interface NewSongModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (timeSignature: string, chordsPerBar: number) => void;
}

const NewSongModal = ({ visible, onClose, onCreate }: NewSongModalProps) => {
  const [selectedTimeSignature, setSelectedTimeSignature] = useState('4/4');
  const [selectedChordsPerBar, setSelectedChordsPerBar] = useState(1);

  const handleCreate = () => {
    onCreate(selectedTimeSignature, selectedChordsPerBar);
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={onClose}>
      <Text style={styles.title}>New Song Settings</Text>

      <Text style={styles.subtitle}>Time Signature</Text>
      <View style={styles.optionGroup}>
        <Pressable
          style={[
            styles.optionButton,
            selectedTimeSignature === '4/4' && styles.selected
          ]}
          onPress={() => setSelectedTimeSignature('4/4')}
        >
          <Text style={styles.optionText}>4/4</Text>
        </Pressable>
      </View>

      <Text style={styles.subtitle}>Chords Per Bar</Text>
      <View style={styles.optionGroup}>
        {[1, 2, 4].map(option => (
          <Pressable
            key={option}
            style={[
              styles.optionButton,
              selectedChordsPerBar === option && styles.selected
            ]}
            onPress={() => setSelectedChordsPerBar(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>Create</Text>
      </Pressable>
    </BaseModal>
  );
};

export default NewSongModal;

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { marginTop: 10, fontSize: 16, fontWeight: '600' },
  optionGroup: { flexDirection: 'row', gap: 8, marginVertical: 8 },
  optionButton: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selected: {
    borderColor: '#FF6F00',
    backgroundColor: '#FFECB3',
  },
  optionText: { fontSize: 16 },
  createButton: {
    marginTop: 20,
    backgroundColor: '#FF6F00',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  createButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
