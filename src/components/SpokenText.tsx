import React, { useState, useEffect } from 'react';

interface SpokenTextProps {
  text: string;
  onComplete?: () => void;
}

export const SpokenText: React.FC<SpokenTextProps> = ({ text, onComplete }) => {
  const words = text.split(' ');
  const [spokenWordIndex, setSpokenWordIndex] = useState<number>(-1);

  useEffect(() => {
    window.speechSynthesis.cancel();
    setSpokenWordIndex(-1);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-EG';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        let wordCounter = 0;
        for (let i = 0; i < charIndex; i++) {
          if (text[i] === ' ') wordCounter++;
        }
        setSpokenWordIndex(wordCounter);
      }
    };

    utterance.onend = () => {
      setSpokenWordIndex(-1);
      if (onComplete) onComplete();
    };

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text]);

  return (
    <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', direction: 'rtl' }}>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            transition: 'all 0.2s ease',
            color: spokenWordIndex === index ? '#10b981' : 'white', 
            transform: spokenWordIndex === index ? 'scale(1.15)' : 'scale(1)',
            textShadow: spokenWordIndex === index ? '0 0 15px rgba(16, 185, 129, 0.8)' : 'none',
            padding: '0 4px',
            fontSize: '28px',
            fontWeight: 'bold'
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};