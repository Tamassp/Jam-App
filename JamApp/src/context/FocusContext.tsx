import { createContext, useContext, useState } from 'react';

const FocusContext = createContext({});

export const FocusProvider = ({ children }) => {
  const [focusedId, setFocusedId] = useState<String>(null);

  const handleFocus = (id) => {
    console.log('handleFocus', id);
    
    setFocusedId(id);
  };

  return (
    <FocusContext.Provider value={{ focusedId, handleFocus }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  return useContext(FocusContext);
};