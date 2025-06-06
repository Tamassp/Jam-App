import React from 'react';
import { IChord } from '../../interfaces/Interfaces'

export interface IActiveChordContext {
  activeChord: IChord | null;
  setActiveChord: (draft: IChord | null) => void;
  clearActiveChord: () => void;
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
}

const ActiveChordContext = React.createContext<IActiveChordContext>({
  activeChord: null,
  setActiveChord: () => {},
  clearActiveChord: () => {},
  isEditing: false,
  setIsEditing: () => {},
});

export const ActiveChordProvider = ({ children }) => {
  const [activeChord, setActiveChord] = React.useState<IChord | null>(null);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const handleSetActiveChord = (updatedChord: IChord | null) => {
    setActiveChord(updatedChord);
  };

  const clearActiveChord = () => {
    setActiveChord(null);
  };

  return (
    <ActiveChordContext.Provider value={{ activeChord, setActiveChord: handleSetActiveChord, clearActiveChord, isEditing, setIsEditing }}>
      {children}
    </ActiveChordContext.Provider>
  );
};

export const useActiveChord = () => React.useContext(ActiveChordContext);
