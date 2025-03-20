import { useState } from "react";



type ChatComponentProps = {
  onSendRoute: (coordinates: number[]) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ onSendRoute }) => {
  const [card, setCard] = useState('');



const username = '638907';
const password = 'f540ff95475af08fb5c34e9235fbb30dded6c12b';

// Encode the credentials in base64
const auth = btoa(`${username}:${password}`);

// Set the Authorization header
const headers = new Headers({
  'Authorization': `Basic ${auth}`
});



// Send the request
fetch('https://json.astrologyapi.com/v1/sun_sign_prediction/daily/aries', { headers })
  .then(response => {
    // Do something with the response
  })
  .catch(error => {
    // Handle errors
  });