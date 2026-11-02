import React, { useState, useEffect } from 'react';

interface SpokenTextProps {
  text: string;
  lang?: string; // ضفنا خاصية اللغة
  onComplete?: () => void;
}

export const SpokenText: React.FC<SpokenTextProps> = ({ text, lang = 'ar-EG', onComplete }) => {
  const words = text.split(' ');
  const [spokenWordIndex, setSpokenWordIndex] = useState<number>(-1);
  const isRTL = lang.startsWith('ar');

  useEffect(() => {
    window.speechSynthesis.cancel();
    setSpokenWordIndex(-1);

    // بنمسح الإيموجي والرموز بس، ونسيب الحروف العربية والإنجليزية
    const cleanText = text.replace(/[^\w\s\u0600-\u06FF]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    // اختيار أفضل صوت متاح للغة المطلوبة
    const targetVoice = voices.find(v => v.lang.startsWith(lang.substring(0, 2)));
    if (targetVoice) utterance.voice = targetVoice;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        let wordCounter = 0;
        for (let i = 0; i < charIndex; i++) {
          if (cleanText[i] === ' ') wordCounter++;
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
  }, [text, lang]);

  return (
    <span className="className" dir={isRTL ? 'rtl' : 'ltr'} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
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
            fontSize: '24px',
            fontWeight: 'bold',
            direction: isRTL ? 'rtl' : 'ltr'
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};