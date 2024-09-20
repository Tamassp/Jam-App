import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export type MyButtonProps = {
  icon?: string
  text: string;
  onPress: () => void;
};

export const MyButton = ({ onPress, icon, text }: MyButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {icon && <View>{icon}</View>}
      {text &&
        <Text style={styles.text}>{text}</Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'purple',
    borderRadius: 8,
  },
  text: { color: 'white' },
});
