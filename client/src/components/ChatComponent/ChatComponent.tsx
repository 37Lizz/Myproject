import React, { useState } from 'react';

interface ChatComponentProps {
  onSendRoute: (coordinates: number[]) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ onSendRoute }) => {
  const [input, setInput] = useState('');

  const handleSend = () : void=> {
    if (input.trim()) {
      // Предположим, что пользователь вводит координаты через запятую
      const coordinates = input.split(',').map(Number);
      if (coordinates.length === 2 && !Number.isNaN(coordinates[0]) && !Number.isNaN(coordinates[1])) {
        onSendRoute(coordinates);
        setInput('');
      } else {
        alert('Введите корректные координаты (например, 55.75, 37.57)');
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите координаты (например, 55.75, 37.57)"
      />
      <button onClick={handleSend}>Отправить</button>
    </div>
  );
};

export default ChatComponent;