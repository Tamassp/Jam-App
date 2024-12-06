import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

// Example JSON structure with different levels of chord nodes
const barsData = [
  {
    timeSignature: "4/4",
    chords: [
      {
        id: "C",
        children: []
      }
    ]
  },
  {
    timeSignature: "4/4",
    chords: [
      {
        children: [
          {
            id: "C",
            children: []
          },
          {
            id: "F",
            children: []
          }
        ]
      }
    ]
  },
  {
    timeSignature: "4/4",
    chords: [
      {
        children: [
          {
            children: [
              {
                id: "G",
                children: []
              },
              {
                id: "C",
                children: []
                }
            ]
          },
          {
            children: [
              {
                id: "G",
                children: []
              },
              null
            ]
          }
        ]
      }
    ]
  },
  {
    timeSignature: "4/4",
    chords: [
      {
        children: [
          null,
          {
            children: [
              {
                id: "G",
                children: []
              },
              {
                    id: "C",
                    children: []
                  }
            ]
          }
        ]
      }
    ]
  },
  {
    timeSignature: "4/4",
    chords: [
      {
        children: [
          null,
          {
            children: [
              {
                children: [
                    {
                        id: "G",
                        children: []
                    },
                    {
                        id: "C",
                        children: []
                    }
                ]
              },
              {
                    id: "C",
                    children: []
                  }
            ]
          }
        ]
      }
    ]
  },
//   {
//     timeSignature: "2/4",
//     chords: [
//       {
//         position: 0,
//         id: "C",
//         children: []
//       }
//     ]
//   },
//   {
//     timeSignature: "2/4",
//     chords: [
//       {
//         position: 0,
//         children: [
//           {
//             position: 0,
//             id: "C",
//             children: []
//           },
//           {
//             position: 0,
//             id: "F",
//             children: []
//           }
//         ]
//       }
//     ]
//   },
  {
    timeSignature: "3/4",
    chords: [
      {
        id: "C",
        children: []
      }
    ]
  },
  {
    timeSignature: "3/4",
    chords: [
      {
        children: [
          {
            id: "C",
            children: []
          },
          {
            id: "F",
            children: []
          },
          {
            id: "G",
            children: []
          }
        ]
      }
    ]
  },
  {
    timeSignature: "5/4",
    chords: [
      {
        children: [
          {
            children: [
              {
                id: "G",
                children: []
              },
              {
                id: "C",
                children: []
              }
            ]
          },
          {
            id: "D",
            children: []
          },
          {
            id: "A",
            children: []
          }
        ]
      }
    ]
  }
];

// Recursive component to render chords at any level
export const Chord = ({ chord, depth, barWidth, beats }) => {
  // Calculate width based on depth relative to the bar's width
    const splitNumber = beats % 2 == 0 ? 2 : beats;
  const width = barWidth / (splitNumber ** depth);
  console.log(width);
  if (!chord) {
    // Render an empty space that takes up half the bar width at the current depth level
    return <View style={[styles.chord, styles.emptyChord, { width }]} />;
  }

  // If the chord has children, recursively render them
  if (chord.children && chord.children.length > 0) {
    return (
      <View style={[styles.chordGroup, { width }]}>
        {chord.children.map((child, index) => (
          <Chord key={index} chord={child} depth={depth + 1} barWidth={barWidth} beats={beats} />
        ))}
      </View>
    );
  }

  // Render the actual chord if it's a leaf node
  return (
    <View style={[styles.chord, styles.filledChord, { width }]}>
      <Text style={styles.chordText}>{chord.id}</Text>
    </View>
  );
};

// Component to render a single bar
const Bar = ({ bar, barWidth }) => {
  const beats = parseInt(bar.timeSignature.split('/')[0], 10); // Extract beats from time signature

  return (
    <View style={[styles.bar, { width: barWidth }]}>
      <Text style={styles.timeSignature}>{bar.timeSignature}</Text>
      <View style={styles.chordContainer}>
        {bar.chords.map((chord, index) => (
          <Chord key={index} chord={chord} depth={0} barWidth={barWidth} beats={beats} />
        ))}
      </View>
    </View>
  );
};

// Main component to display all bars
const ChordChart = () => {
  const barWidth = 300; // Set a fixed or dynamic width for each bar component

  return (
    <View style={styles.container}>
      {barsData.map((bar, index) => (
        <Bar key={index} bar={bar} barWidth={barWidth} />
      ))}
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4
  },
  bar: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    maxWidth: 400,
    borderColor: 'black',
    borderLeftWidth: 2,
    height: 100
  },
  timeSignature: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chordGroup: {
    flexDirection: 'row',
  },
  chord: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 2,
    borderRadius: 5,
  },
  filledChord: {
    backgroundColor: '#4CAF50',
  },
  emptyChord: {
    backgroundColor: '#EEE',
  },
  chordText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ChordChart;
