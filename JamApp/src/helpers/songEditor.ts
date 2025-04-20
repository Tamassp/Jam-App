import { IChord, TChordPath, ISong, TLeafChordWithPath } from "../interfaces/Interfaces"

function isLeafChord(chord: IChord): boolean {
  return !chord.subChords || chord.subChords.length === 0;
}

function collectLeafChordsWithPaths(
  chord: IChord,
  basePath: TChordPath,
  chordIndexChain: number[],
  result: TLeafChordWithPath[]
) {
  const currentPath: TChordPath = {
    ...basePath,
    chordIndices: [...chordIndexChain],
  };

  if (isLeafChord(chord)) {
    result.push({ chord, path: currentPath });
  } else if (chord.subChords) {
    chord.subChords.forEach((sub, idx) => {
      collectLeafChordsWithPaths(sub, basePath, [...chordIndexChain, idx], result);
    });
  }
}

function getAllLeafChordsWithPaths(song: ISong): TLeafChordWithPath[] {
  const result: TLeafChordWithPath[] = [];

  song.sections.forEach((section, sectionIndex) => {
    section.lines.forEach((line, lineIndex) => {
      line.bars.forEach((bar, barIndex) => {
        bar.chords.forEach((chord, chordIndex) => {
          collectLeafChordsWithPaths(
            chord,
            { sectionIndex, lineIndex, barIndex, chordIndices: [chordIndex] },
            [chordIndex],
            result
          );
        });
      });
    });
  });

  return result;
}

export function findNextLeafChordWithPath(song: ISong, currentChordPathId: string): TLeafChordWithPath | null {
  const allLeaves = getAllLeafChordsWithPaths(song); // returns LeafChordWithPath[]
  const index = allLeaves.findIndex(item => chordPathToId(item.path) === currentChordPathId);

  if (index >= 0 && index < allLeaves.length - 1) {
    return allLeaves[index + 1];
  }

  return null;
}

export function chordPathToId(path: TChordPath): string {
  const base = [path.sectionIndex, path.lineIndex, path.barIndex]
    .map(n => n.toString().padStart(2, '0'));
  const chordPart = path.chordIndices.map(n => n.toString().padStart(2, '0'));
  return [...base, ...chordPart].join("-");
}

//OLD SOLUTION
// export function getNextItem(song, path) {
//     let currentNode = song.sections; // Start at the root object
//     let parentStack = []; // Stack to track the hierarchy
//     console.log("song", song);
//     console.log("songSections", song.sections);
//     // Traverse down the hierarchy to the current node
//     for (let index of path) { //MAYBE SECTIONS NEEDED. THERE IS A PROBLEM THAT THE LINES ARE NOT BEING RECOGNIZED
//         console.log("index", index);
//         console.log("currentNode", currentNode);
//         console.log("currentNodeLines", currentNode.lines);
//         console.log("currentNode.lines?.[index]", currentNode.lines?.[index])
//         currentNode = currentNode?.[index] || 
//                       currentNode.lines?.[index] || 
//                       currentNode.bars?.[index] || 
//                       currentNode.chords?.[index] || 
//                       currentNode.children?.[index] || []; // Move to the next node
//         parentStack.push({ node: currentNode, index }); // Keep track of the parent node
//     }
//     console.log("parentStack1", parentStack);

//    // Helper function to generate hierarchical ID
//     const generateId = () =>
//         console.log("parentStackGENERATE", parentStack)
//         parentStack.map(({ index }) => String(index)).join(""); // No padding here since digits directly represent hierarchy levels.

//     // Function to find the next sibling or move up
//     const findNext = () => {
//         // TRAVERSE SHOULD START FROM THE LEAF NODES NOT FROM THE ROOT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//         while (parentStack.length > 0) {
//             const { node, index } = parentStack[parentStack.length - 1]; // Get the current parent
//             const siblings = node.lines || node.bars || node.chords || node.children || []; //node.sections??
//             //why does it break after the first iteration?
//             if (index + 1 < siblings.length) {
//                 // If there is a next sibling
//                 console.log("siblings", siblings);
//                 console.log("parentStack3", parentStack);
//                 parentStack[parentStack.length - 1].index += 1; // Increment the index
//                 return generateId(); // Generate the ID for the next sibling
//             }
//             console.log("Sections", parentStack);
//             parentStack.pop(); // No sibling, move up
//         }
//         return null; // No more nodes
//     };

//     // Check if the current node has children
//     if (currentNode.children && currentNode.children.length > 0) {
//         parentStack.push({ node: currentNode, index: 0 }); // Go to the first child
//         return generateId(); // Generate the ID for the first child
//     }

//     // Otherwise, find the next sibling or move up
//     return findNext();
// }


// // NOT A GOOD APPROACH BECAUSE THE NEXT CHORD CAN BE IN A DIFFERENT LINE OR SECTION (BUT STILL IT CAN BE INCREMENTED IN THAT EDGE CASE)
// // Function to get the next chord ID / leaf node
// export function getNextChord(songsections, path: string) {
//     //GET THE SECTION, LINE, BAR, AND CHORD IDS

//     const sectionId = parseInt(path.slice(0,1)); // Get the section ID
//     const lineId = parseInt(path.slice(1,2)) // Get the bar ID
//     const barId = parseInt(path.slice(2,3)); // Get the bar ID

//     const chordPath = path.slice(3); // Get the chord path
//     console.log("chordPath", chordPath);
//     // const chordStack = chordPath.slice(); // Clone the chord path

//     // GO TO THE CHORDS AND GET THE NEXT CHORD
//     const section = songsections[sectionId]; // Get the section
//     const line = section.lines[lineId]; // Get the line
//     const bar = line.bars[barId]; // Get the bar

//     console.log("section", section);
//     console.log("line", line);
//     console.log("bar", bar);
//     // Traverse the chord path
//     let currentNode = bar;
//     for (let index of chordPath) {
//         currentNode = currentNode.children[index]; // Move to the next chord
//         console.log("currentNode", currentNode);
//     }

    

//     // Helper function to generate hierarchical ID
//     const generateId = () => chordStack.join(""); // No padding here since digits directly represent hierarchy levels.

// }