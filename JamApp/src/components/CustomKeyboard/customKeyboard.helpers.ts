// const toggleExtension = (ext: string, isActive: boolean) => {
//     if (!activeChord) return;
  
//     const updatedExtensions = isActive
//       ? [...(activeChord.extensions || []), ext]
//       : (activeChord.extensions || []).filter(e => e !== ext);
  
//     setActiveChord({
//       ...activeChord,
//       extensions: updatedExtensions,
//     });
  
//     setActiveToggles(prev => {
//       const newSet = new Set(prev);
//       if (isActive) newSet.add(ext);
//       else newSet.delete(ext);
//       return newSet;
//     });
  
//     onChordChange(null, activeChord.root, activeChord.quality, updatedExtensions, "extension");
//   };