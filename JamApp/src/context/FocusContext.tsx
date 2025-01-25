import React from 'react'
import { Keyboard } from 'react-native'

export interface IFocusContext {
  focusedId: string
  handleFocus: (draft: string) => React.Dispatch<React.SetStateAction<string>>
  holdId: string
  handleHold: (draft: string) => React.Dispatch<React.SetStateAction<string>>
}

const FocusContext = React.createContext({
  focusedId: "",
  handleFocus: (id: string) => {},
  holdId: "",
  handleHold: (id: string) => {}
})

export const FocusProvider = ({ children }) => {
  const [focusedId, setFocusedId] = React.useState<string>(null);
  const [holdId, setHoldId] = React.useState<string>(null);

  const handleFocus = (id: string) => {
    console.log('handleFocus', id);
    //It dissmisses even if the focus is on a text input
    if(Keyboard.isVisible() && !id.includes("TEXT")){
      Keyboard.dismiss()
    }
    setFocusedId(id);
    setHoldId(null);
  };

  const handleHold = (id: string) => {
    console.log('handleHold', id);
    //It dissmisses even if the focus is on a text input
    if(Keyboard.isVisible() && !id.includes("TEXT")){
      Keyboard.dismiss()
    }
    setFocusedId(id);
    setHoldId(id);
  };

  return (
    <FocusContext.Provider value={{ focusedId, handleFocus, holdId, handleHold }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  return React.useContext(FocusContext);
};