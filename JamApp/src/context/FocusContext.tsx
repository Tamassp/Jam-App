import React from 'react'
import { Keyboard } from 'react-native'
import { getChordById } from '../helpers/songEditor'
import { useActiveChord } from './SongContext/ActiveChordContext'
import { useSongContext } from './SongContext/SongContext'

type TFocusType = 'chord' | 'text' | 'edit' | 'other'
export interface IFocusedId {
  id: string
  type: TFocusType
}
export interface IFocusContext {
  focusedId: IFocusedId
  handleFocus: (draft: string, isChordEditing?: boolean) => React.Dispatch<React.SetStateAction<string>>
  secondaryFocusedId?: string
  handleSecondaryFocus?: (draft: string) => React.Dispatch<React.SetStateAction<string>>
  holdId: string
  handleHold: (draft: string) => React.Dispatch<React.SetStateAction<string>>
}

const FocusContext = React.createContext({
  focusedId: { id: null, type: 'other' } as IFocusedId,
  handleFocus: (id: string, type: TFocusType, isChordEditing?: boolean ) => {},
  secondaryFocusedId: "",
  handleSecondaryFocus: (id: string) => {},
  holdId: "",
  handleHold: (id: string) => {}
})

export const FocusProvider = ({ children }) => {
  const [focusedId, setFocusedId] = React.useState<IFocusedId>(null);
  const [secondaryFocusedId, setSecondaryFocusedId] = React.useState<string>(null);
  const [holdId, setHoldId] = React.useState<string>(null);
  const { setIsEditing } = useActiveChord()
  const { song } = useSongContext()

  const handleFocus = (id: string, type: TFocusType, isChordEditing: boolean) => {
    console.log('handleFocus', id);
    //It dissmisses even if the focus is on a text input
    if(Keyboard.isVisible() && !id.includes("TEXT")){
      Keyboard.dismiss()
    }
    setFocusedId({ id: id, type });
    setHoldId(null);

    // Set IsEditing mode in case of chord focus
    const chord = getChordById(song, id);
    if (
      //chord &&
      //chord.root && 
      isChordEditing
    ) {
        setIsEditing(true); // ✅ We're editing this chord
    } else {
        setIsEditing(false); // ✅ New chord entry
    }
  };

  const handleSecondaryFocus = (id: string) => {
    console.log('handleSecondaryFocus', id);
    //It dissmisses even if the focus is on a text input
    if(Keyboard.isVisible() && !id.includes("TEXT")){
      Keyboard.dismiss()
    }
    setSecondaryFocusedId(id);
  };

  const handleHold = (id: string) => {
    console.log('handleHold', id);
    //It dissmisses even if the focus is on a text input
    if(Keyboard.isVisible() && !id.includes("TEXT")){
      Keyboard.dismiss()
    }
    setFocusedId({ id: id, type: 'chord' });
    setHoldId(id);
  };

  return (
    <FocusContext.Provider value={{ focusedId, handleFocus, secondaryFocusedId, handleSecondaryFocus, holdId, handleHold }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  return React.useContext(FocusContext);
};