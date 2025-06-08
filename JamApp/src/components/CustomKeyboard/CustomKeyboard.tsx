import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent, TouchableOpacityProps, Modal, PanResponder } from 'react-native';
import ToggleGroup from '../reusables/ToggleGroup/ToggleGroup'
import VerticalDivider from '../reusables/VerticalDivider/VerticalDivider'
import { JSX, useEffect, useState } from 'react'
import { TChordQuality, TKeyboardInteractionSource } from '../../interfaces/Interfaces'
import { useActiveChord } from '../../context/SongContext/ActiveChordContext'
import { useSongContext } from '../../context/SongContext/SongContext'
import { useFocus } from '../../context/FocusContext'
import { getChordById } from '../../helpers/songEditor'
// import { SongContext } from '../../context/SongContext/SongContext';

export interface CustomKeyboardProps /*extends TouchableOpacityProps*/ {
    onChordChange: (e: GestureResponderEvent, root: string, quality: TChordQuality, extensions: string[], interactionSource: TKeyboardInteractionSource) => void;
    onLongPressOption?: (option: string) => void;
}

const CustomKeyboard = ({ onChordChange, onLongPressOption /*onPress*/ }: CustomKeyboardProps): JSX.Element => {
    //HERE OR IN THE EDITOR?
    // const { setSong } = React.useContext(SongContext);

    // The keyboard can change slitely depending on the chosen key
    // The less sharps or flats the better (F#/Gb, G#m/Abm, etc.)

    const majors = ['Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Back']
    const minors = ['Ebm', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm', 'Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'Mpty']

    // We need current root, quality and extensions, if a chord is reselected
    const { activeChord, setActiveChord } = useActiveChord();
    const { focusedId } = useFocus();
    const { song,  } = useSongContext();

    // const [root, setRoot] = useState<string>("");
    // const [quality, setQuality] = useState<TChordQuality | undefined>();
    // const [extensions, setExtensions] = useState<string[]>([]);

    const [showPopup, setShowPopup] = React.useState(false);
  const [popupPosition, setPopupPosition] = React.useState({ x: 0, y: 0 });
  const [selectedOption, setSelectedOption] = React.useState(null);

  const options = ['F7', 'F9', 'F11']; // Example options for popup

  useEffect(() => {
    if (!focusedId) return;
    console.log('focusedId', focusedId);
    const chord = getChordById(song, focusedId);
    console.log('ACTIVECHORD', chord);
    if (chord) {
      setActiveChord({
        root: chord.root,
        quality: chord.quality,
        extensions: chord.extensions || [],
      });
    }
  }, [focusedId, song]);
  
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

    const [activeToggles, setActiveToggles] = React.useState<Set<string>>(new Set());
    const fifthToggles = ["b5", "#5"];
    const ninthToggles = ["b9", "#9"];
    const eleventhToggles = ["b11", "#11"];
    const thirteenthToggles = ["b13", "#13"];

    React.useEffect(() => {
        if (activeChord?.extensions) {
          setActiveToggles(new Set(activeChord.extensions));
        } else {
          setActiveToggles(new Set());
        }
      }, [activeChord]);

    const toggleExtension = (ext: string, isActive: boolean) => {
        if (!activeChord) return;
      
        const updatedExtensions = isActive
          ? [...(activeChord.extensions || []), ext]
          : (activeChord.extensions || []).filter(e => e !== ext);
      
        setActiveChord({
          ...activeChord,
          extensions: updatedExtensions,
        });
      
        setActiveToggles(prev => {
          const newSet = new Set(prev);
          if (isActive) newSet.add(ext);
          else newSet.delete(ext);
          return newSet;
        });
      
        onChordChange(null, activeChord.root, activeChord.quality, updatedExtensions, "extension");
      };

    return (
        <View style={styles.container}>
            <View style={[styles.row, {marginBottom: 8}]}>
                <ToggleGroup 
                    toggles={fifthToggles.map(label => ({
                        label: label[0], // just "b" or "#"
                        isActive: activeToggles.has(label)
                    }))}
                    onToggle={(index, isActive) => {
                        const extension = fifthToggles[index]; // "b5" or "#5"
                        toggleExtension(extension, isActive);
                    }}
                    mainToggle={{
                        label: "5",
                        isActive: activeToggles.has("5")
                    }}
                    onMainToggle={(isActive) => {
                        toggleExtension("5", isActive);
                    }}
                />
                <VerticalDivider />              
                <ToggleGroup 
                    mainToggle={
                        {
                            label: "6",
                            isActive: activeToggles.has("6")
                        }
                    }
                    onMainToggle={(isActive) => {
                        toggleExtension("6", isActive);

                    }}
                />
                <VerticalDivider />
                <ToggleGroup
                    toggles={[
                        {
                            label: "M", // Represents Major 7
                            isActive: activeToggles.has("M7"),
                        },
                    ]}
                    onToggle={(index, isActive) => {
                        toggleExtension("M7", isActive);
                    }}
                    mainToggle={{
                        label: "7",
                        isActive: activeToggles.has("7"),
                    }}
                    onMainToggle={(isActive) => {
                        toggleExtension("7", isActive);

                    }}
                />
                <VerticalDivider />
                <ToggleGroup 
                    toggles={ninthToggles.map(label => ({
                        label: label[0],
                        isActive: activeToggles.has(label)
                    }))}
                    onToggle={(index, isActive) => {
                        toggleExtension(ninthToggles[index], isActive);
                    }}
                    mainToggle={{
                        label: "9",
                        isActive: activeToggles.has("9")
                    }}
                    onMainToggle={(isActive) => {
                        toggleExtension("9", isActive);
                    }}
                />
                <VerticalDivider />
                <ToggleGroup 
                    toggles={eleventhToggles.map(label => ({
                        label: label[0],
                        isActive: activeToggles.has(label)
                    }))}
                    onToggle={(index, isActive) => {
                        toggleExtension(eleventhToggles[index], isActive);
                    }}
                    mainToggle={{
                        label: "11",
                        isActive: activeToggles.has("11")
                    }}
                    onMainToggle={(isActive) => {
                        toggleExtension("11", isActive);
                    }}
                />
                <VerticalDivider />
                <ToggleGroup 
                    toggles={thirteenthToggles.map(label => ({
                        label: label[0],
                        isActive: activeToggles.has(label)
                    }))}
                    onToggle={(index, isActive) => {
                        toggleExtension(thirteenthToggles[index], isActive);
                    }}
                    mainToggle={{
                        label: "13",
                        isActive: activeToggles.has("13")
                    }}
                    onMainToggle={(isActive) => {
                        toggleExtension("13", isActive);
                    }}
                />
            </View>
            <View style={styles.row}>
                {majors.map((majorChord, index) => {
                    const isActive = activeChord?.root === majorChord && activeChord?.quality === "Major"

                    return (
                    <TouchableOpacity
                        onPress={(e) => onChordChange(e, majorChord, "Major", [], "root")}
                        onLongPress={(e) => handleLongPress(e, majorChord)}
                        key={index}
                        style={[styles.key]} // apply highlight
                    >
                        <View style={[styles.textWrapper, isActive && styles.activeKey]}>
                        <Text style={styles.text}>{majorChord}</Text>
                        </View>
                    </TouchableOpacity>
                    );
                })}
            </View>
            <View style={styles.row}>
                {minors.map((minorChord, index) => {
                    const root = minorChord.replace("m", "");
                    const isActive = activeChord?.root === root && activeChord?.quality === "Minor"
                    return (
                    <TouchableOpacity
                        onPress={(e) => onChordChange(e, root, "Minor", [], "root")}
                        key={index}
                        style={[styles.key]} // apply highlight
                    >
                        <View style={[styles.textWrapper, isActive && styles.activeKey]}>
                            <Text style={[styles.text]}>{minorChord}</Text>
                        </View>
                    </TouchableOpacity>
                    );
                })}
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
    activeKey: {
        backgroundColor: '#FF6F00',
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