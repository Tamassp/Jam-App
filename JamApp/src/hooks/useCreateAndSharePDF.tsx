import { useRef } from 'react';
import { captureRef } from 'react-native-view-shot';
import RNImageToPdf from 'react-native-image-to-pdf';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const useCreateAndSharePDF = () => {
  const viewRef = useRef();

  const createAndSharePDF = async () => {
    try {
      // Capture the View as an image
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      console.log('Image saved to', uri);


      // // Create a temporary file in memory
      // const tempFileUri = FileSystem.cacheDirectory + 'shared-image.png';

      // Convert the image to a PDF
      await RNImageToPdf.create(uri, tempFileUri);

      // // Move the captured image to the temporary file
      // await FileSystem.moveAsync({
      //   from: uri,
      //   to: tempFileUri,
      // })

      // Share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(tempFileUri);

        // Optionally delete the temporary file after sharing
        await FileSystem.deleteAsync(tempFileUri);
      } else {
        alert('Sharing is not available on this platform');
      }

    } catch (error) {
      console.error('Failed to create or share file', error);
    }
  };

  return { viewRef, createAndSharePDF };
};

export default useCreateAndSharePDF;
