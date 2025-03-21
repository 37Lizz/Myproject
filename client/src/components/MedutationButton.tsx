import { useState } from 'react';
import { Button } from '@mui/material';
import type { JSX } from '@emotion/react/jsx-runtime';

type Props = {
meditation: string
}
const MeditationButton = ({ meditation }:Props):JSX.Element=> {

  const [isSpeaking, setIsSpeaking] = useState(false);

 


  const speak = (text:string):void => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU'; // Set the language to Russian

    // Start the speech synthesis
    speechSynthesis.speak(utterance);

    /**
     * Handler for when the speech synthesis ends
     */
    utterance.onend = () => {
      setIsSpeaking(false); // Reset the state
    };
  };

  /**
   * Function to stop the speech synthesis
   */
  const stopSpeaking = ():void => {
    speechSynthesis.cancel(); // Stop the speech synthesis
    setIsSpeaking(false); // Reset the state
  };

  /**
   * Handler for when the button is clicked
   */
  const handleClick = ():void => {
    if (isSpeaking) {
      stopSpeaking(); // Stop the speech synthesis if it is already playing
    } else {
      speak(meditation); // Start the speech synthesis
      setIsSpeaking(true); // Set the state to true
    }
  };

  return (
    <Button
      variant="contained"
      sx={{
        mt: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        position: 'relative',
        backgroundPosition: 'center',
        zIndex: 2,
        color: 'black',
        overflow: 'hidden',
      }}
      onClick={handleClick} // Correctly call the function
    >
      {isSpeaking ? 'Остановить медитацию' : 'Медитация'}
    </Button>
  );
};

export default MeditationButton;