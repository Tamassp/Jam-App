import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent, TouchableOpacityProps, Modal, PanResponder } from 'react-native';
import ToggleGroup from '../reusables/ToggleGroup/ToggleGroup'
import VerticalDivider from '../reusables/VerticalDivider/VerticalDivider'
import { JSX } from 'react'
// import { SongContext } from '../../context/SongContext/SongContext';

export interface CustomKeyboardProps /*extends TouchableOpacityProps*/ {
    onPress: (e: GestureResponderEvent, key) => void;
    onLongPressOption?: (option: string) => void;
}

const CustomKeyboard = ({ onPress, onLongPressOption /*onPress*/ }: CustomKeyboardProps): JSX.Element => {
    //HERE OR IN THE EDITOR?
    // const { setSong } = React.useContext(SongContext);

    // The keyboard can change slitely depending on the chosen key
    // The less sharps or flats the better (F#/Gb, G#m/Abm, etc.)

    const majors = ['Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Back']
    const minors = ['Ebm', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm', 'Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'Mpty']

    const [showPopup, setShowPopup] = React.useState(false);
  const [popupPosition, setPopupPosition] = React.useState({ x: 0, y: 0 });
  const [selectedOption, setSelectedOption] = React.useState(null);

  const options = ['F7', 'F9', 'F11']; // Example options for popup

  // Initialize PanResponder and attach it dynamically on long press
  // Using useMemo to ensure PanResponder is created once and does not recreate unnecessarily
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          // Calculate the index based on moveX relative to initial popup position (popupPosition.x)
          const relativeX = gestureState.moveX - popupPosition.x;
          const optionIndex = Math.floor(relativeX / 50); // Adjust for option width if needed
          console.log('optionIndex', optionIndex);
          console.log('options.length', options[Math.min(Math.max(0, optionIndex), options.length - 1)]);
          setSelectedOption(options[Math.min(Math.max(0, optionIndex), options.length - 1)]);
        },
        onPanResponderRelease: () => {
          if (selectedOption) {
            onLongPressOption(selectedOption);
          }
          setShowPopup(false);
          setSelectedOption(null);
        },
      }),
    [options, onLongPressOption, selectedOption, popupPosition]
  );

  //TEST
  React.useEffect(() => {
    console.log('selectedOption', selectedOption);
  }, [selectedOption]);

  const handleLongPress = (e, major) => {
    console.log('LONG PRESS', major);
    const { pageX, pageY } = e.nativeEvent;
    setPopupPosition({ x: pageX, y: pageY });
    setShowPopup(true);
    
  };

//   const handlePressOut = () => {
//     if (selectedOption) {
//       onLongPressOption(selectedOption);
//     }
//     setShowPopup(false);
//     setSelectedOption(null);
//   };

    return (
        <View style={styles.container}>
            <View style={[styles.row, {marginBottom: 8}]}>
                <ToggleGroup toggles={
                    [
                        {
                            label: "b"
                        },
                        {
                            label: "#",
                        },
                    ]
                }
                onToggle={(index) => console.log(index)}
                mainToggle={
                    {
                        label: "5",
                    }
                }
                onMainToggle={() => console.log("main")}
                />
                <VerticalDivider />              
                <ToggleGroup 
                mainToggle={
                    {
                        label: "6",
                    }
                }
                onMainToggle={() => console.log("main")}
                />
                <VerticalDivider />
                <ToggleGroup toggles={
                    [
                        {
                            label: "M"
                        },
                    ]
                }
                onToggle={(index) => console.log(index)}
                mainToggle={
                    {
                        label: "7",
                    }
                }
                onMainToggle={() => console.log("main")}
                />
                <VerticalDivider />
                <ToggleGroup toggles={
                    [
                        {
                            label: "b"
                        },
                        {
                            label: "#",
                        }
                    ]
                }
                onToggle={(index) => console.log(index)}
                mainToggle={
                    {
                        label: "9",
                    }
                }
                onMainToggle={() => console.log("main")}
                />
                <VerticalDivider />
                <ToggleGroup toggles={
                    [
                        {
                            label: "b"
                        },
                        {
                            label: "#",
                        }
                    ]
                }
                onToggle={(index) => console.log(index)}
                mainToggle={
                    {
                        label: "11",
                    }
                }
                onMainToggle={() => console.log("main")}
                />
                <VerticalDivider />
                <ToggleGroup toggles={
                    [
                        {
                            label: "b"
                        },
                        {
                            label: "#",
                        }
                    ]
                }
                onToggle={(index) => console.log(index)}
                mainToggle={
                    {
                        label: "13",
                    }
                }
                onMainToggle={() => console.log("main")}
                />
            </View>
            <View style={styles.row}>
                {majors.map((major, index) => (
                    <TouchableOpacity 
                        onPress={(e) => onPress(e, major)}
                        onLongPress={(e) => handleLongPress(e, major)} 
                        key={index} style={styles.key}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>{major}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.row}>
                {minors.map((minor, index) => (
                    <TouchableOpacity onPress={(e) => onPress(e, minor)} key={index} style={styles.key}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.text}>{minor}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            {showPopup && (
        <Modal transparent animationType="none" visible={showPopup}>
          <View style={[styles.popup, { top: popupPosition.y - 80, left: popupPosition.x - 20 }]}>
            <View {...panResponder.panHandlers} style={{flexDirection: 'row'}}>
              {options.map((option, index) => (
                <Text
                  key={index}
                  style={[
                    styles.popupOption,
                    selectedOption === option && styles.selectedOption,
                  ]}
                >
                  {option}
                </Text>
              ))}
            </View>
          </View>
        </Modal>
      )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 180,
        width: '100%',
        // backgroundColor: 'rgba(31, 31, 31, 0.8)',
        backgroundColor: 'rgba(217, 217, 217, 0.95)',
        borderRadius: 4,
        padding: 4,
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    key: {
        width: 72,
        // backgroundColor: 'red',
        // borderRadius: 5,
        padding: 6,
        // paddingTop: 16,
        // paddingHorizontal: 10,
        // marginVertical: 4,
        // marginHorizontal: 2,
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
    },
    textWrapper: {
        width: 64,
        height: 32,
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 5,
        marginVertical: 4,
        marginHorizontal: 2,
    },

    popup: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  popupOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    backgroundColor: '#ddd',
  },
    
});

export default CustomKeyboard;