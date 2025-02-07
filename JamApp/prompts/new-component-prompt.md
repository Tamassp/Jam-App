# New Component Prompt

## Description

Generate a **React Native functional component** with TypeScript that includes:

- A **typed props interface**.
- Default values for props where applicable.
- Proper use of **React best practices**.
- A structured **StyleSheet for component styling**.

## Requirements

- The component should **import React and necessary React Native components**.
- Define a **Props interface** for typed properties.
- Implement **default values for props** to ensure robustness.
- Use a **separate StyleSheet** for styling.
- Return a structured `View` with properly applied styles.

## Code Template

```tsx
import React from "react"
import { StyleSheet, View, ViewStyle, Text } from "react-native"

// Define props interface
interface NewComponentProps {
  size?: number
  label?: string
}

// Functional component
const NewComponent = ({
  size = 1,
  label = "Default Label",
}: ComponentProps): JSX.Element => {
  return (
    <View style={[{ height: 16 * size }, styles.container]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

// Define styles interface
interface ComponentStyles {
  container: ViewStyle
  label: ViewStyle
}

// Create styles
const styles = StyleSheet.create<ComponentStyles>({
  container: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
})

export default NewComponent
```
