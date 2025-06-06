import { IChord, TChordPath, ISong, TLeafChordWithPath, ILine, SplitRow, IBar } from "../interfaces/Interfaces"

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

export function getChordRef(chords: IChord[], path: number[]): IChord | null {
  if (path.length === 0) return null;

  const currentIndex = path[0];
  const remainingPath = path.slice(1);

  if (!chords[currentIndex]) return null;

  if (remainingPath.length === 0) {
    return chords[currentIndex]; // leaf
  }

  if (!chords[currentIndex].subChords) {
    return null;
  }

  return getChordRef(chords[currentIndex].subChords!, remainingPath);
}

export function getParentChordRef(
  chords: IChord[],
  path: number[]
): { parent: IChord | null; index: number } | null {
  if (path.length < 2) return null; // no parent

  const parentPath = path.slice(0, -1); // all but last
  const targetIndex = path[path.length - 1];

  const parentChord = getChordRef(chords, parentPath);
  if (!parentChord || !parentChord.subChords) return null;

  return {
    parent: parentChord,
    index: targetIndex
  };
}

export function splitLineIntoRows(bars: IBar[], maxChordsPerRow: number) {
  const rows: { bars: IBar[]; chordsInRow: number }[] = [];
  let currentRowBars: IBar[] = [];
  let currentChordCount = 0;

  for (const bar of bars) {
    const chordCountInBar = bar.chords.reduce(
      (acc, chord) => acc + countLeafChords(chord),
      0
    );

    if (currentChordCount + chordCountInBar > maxChordsPerRow && currentRowBars.length > 0) {
      // push current row and start new one
      rows.push({ bars: currentRowBars, chordsInRow: currentChordCount });
      currentRowBars = [];
      currentChordCount = 0;
    }

    currentRowBars.push(bar);
    currentChordCount += chordCountInBar;
  }

  // push any leftover bars into the last row
  if (currentRowBars.length > 0) {
    rows.push({ bars: currentRowBars, chordsInRow: currentChordCount });
  }

  return rows;
}

export function countLeafChords(chord: IChord): number {
  if (!chord.subChords || chord.subChords.length === 0) {
    return 1;
  }

  return chord.subChords.reduce((acc, subChord) => acc + countLeafChords(subChord), 0);
}

export function buildChordTree(totalChords: number): IChord {
  if (totalChords <= 1) {
    return { root: "", subChords: [] };
  }

  const half = Math.floor(totalChords / 2);
  const remainder = totalChords - half;

  return {
    root: "",
    subChords: [
      buildChordTree(half),
      buildChordTree(remainder),
    ]
  };
}

export function generateGhostLine(barsPerLine: number, chordsPerBar: number): ILine {
  const createChordTree = (n: number): IChord => {
    if (n <= 1) return { root: "", subChords: [] };
    const half = Math.floor(n / 2);
    const rest = n - half;
    return {
      root: "",
      subChords: [createChordTree(half), createChordTree(rest)],
    };
  };

  const bars: IBar[] = Array.from({ length: barsPerLine }, (_, barIndex) => ({
    number: barIndex,
    timeSignature: '4/4',
    chords: [createChordTree(chordsPerBar)],
  }));

  return {
    number: -1, // ghost indicator
    bars,
    lineColor: '#ddd', // optional for ghost effect
  };
}

export function containsChordName(chord: IChord): boolean {
  if (chord.root && chord.root.trim() !== '') return true;
  return chord.subChords?.some(containsChordName) ?? false;
}

export function isLineFilled(line: ILine): boolean {
  return line.bars.every(bar => {
    const totalLeaves = bar.chords.reduce((acc, chord) => acc + countLeafChords(chord), 0);
    const filledLeaves = bar.chords.reduce(
      (acc, chord) => acc + countFilledLeafChords(chord),
      0
    );
    return filledLeaves >= totalLeaves;
  });
}

function countFilledLeafChords(chord: IChord): number {
  if (!chord.subChords || chord.subChords.length === 0) {
    return chord.root && chord.root.trim() !== '' ? 1 : 0;
  }
  return chord.subChords.reduce((acc, sub) => acc + countFilledLeafChords(sub), 0);
}

export function getChordById(song: ISong, chordId: string): IChord | null {
  if (!chordId || !song) return null;

  const idParts = chordId.split("-");
  if (idParts.length < 4) return null;

  const sectionIndex = parseInt(idParts[0], 10);
  const lineIndex = parseInt(idParts[1], 10);
  const barIndex = parseInt(idParts[2], 10);
  const chordPath = idParts.slice(3).map(part => parseInt(part, 10)); // chordIndex + subChord path

  const section = song.sections[sectionIndex];
  const line = section?.lines[lineIndex];
  const bar = line?.bars[barIndex];

  if (!bar || !bar.chords) return null;

  return getChordRef(bar.chords, chordPath);
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