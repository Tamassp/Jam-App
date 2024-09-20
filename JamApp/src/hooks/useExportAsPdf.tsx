import { useRef, useState } from 'react';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

export const useExportAsPdf = () => {
  const viewShotRef = useRef(null); // Initialize with null
  const [pdfUri, setPdfUri] = useState(null);

  const captureView = async (saveToFile) => {
    try {
      if (viewShotRef.current) {
        // Ensure the ref is available before capturing
        const uri = await viewShotRef.current.capture(); // Capture the view as an image

        // Convert the captured image to a PDF
        const pdfPath = await createPdfFromImage(uri);

        if (saveToFile) {
          const filePath = `${FileSystem.documentDirectory}MyDocument.pdf`;
          await FileSystem.moveAsync({
            from: pdfPath,
            to: filePath,
          });
          console.log(`PDF saved to: ${filePath}`);
          setPdfUri(filePath);
        } else {
          // Share the PDF
          await Sharing.shareAsync(pdfPath);
        }
      } else {
        console.error("ViewShot ref is not set");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createPdfFromImage = async (imageUri) => {
    const html = `
      <html>
        <body style="margin: 0; padding: 0;">
          <img src="${imageUri}" style="width: 100%; height: auto;" />
        </body>
      </html>
    `;
    const { uri } = await Print.printToFileAsync({ html });
    return uri;
  };

  return {
    viewShotRef,  // Return the ref so it can be attached to the component
    pdfUri,
    captureView,
  };
};
