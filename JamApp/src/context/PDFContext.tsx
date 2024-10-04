import React from 'react'
import { Keyboard } from 'react-native'

export interface IPDFContext {
  isPDFView: boolean
  setIsPDFView: (draft: boolean) => React.Dispatch<React.SetStateAction<boolean>>
}

const PDFContext = React.createContext({
  isPDFView: false,
    setIsPDFView: (draft: boolean) => {}
})

export const PDFProvider = ({ children }) => {
    const [isPDFView, setIsPDFView] = React.useState<boolean>(false);

  return (
    <PDFContext.Provider value={{ isPDFView, setIsPDFView }}>
      {children}
    </PDFContext.Provider>
  );
};

export const usePDF = () => {
  return React.useContext(PDFContext);
};