import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { CURRICULUM_DATA } from '../core/data/curriculum';
import { SpokenText } from './SpokenText';
import { RewardScreen } from './RewardScreen';
import { useAppStore } from '../core/store/useAppStore';

export const LessonScreen = ({ lessonId, onBack }: { lessonId: string, onBack: () => void }) => {
  const questions = CURRICULUM_DATA.arabic_kg1[lessonId as keyof typeof CURRICULUM_DATA.arabic_kg1] || [];
  
  const { user, setUser } = useAppStore();

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showReward, setShowReward] = useState(false);

  if (questions.length === 0) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <p>الأسئلة قيد التطوير...</p>
        <button onClick={onBack} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#334155', borderRadius: '10px', color: 'white' }}>عودة</button>
      </div>
    );
  }

  const question = questions[currentQIndex];
  const isCorrect = selectedAnswer === question.correct;

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-EG';
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (optionText: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(optionText);
    setIsAnswered(true);
    speak(optionText);

    if (optionText === question.correct) {
      setTimeout(() => speak('إجابة صحيحة'), 1000);
    } else {
      setTimeout(() => {
        speak('حاول مرة أخرى');
        setTimeout(() => {
          setIsAnswered(false);
          setSelectedAnswer(null);
        }, 1500);
      }, 1000);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // 1. التحقق مما إذا كان الدرس مكتملاً من قبل
      const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      const isFirstTime = !completed.includes(lessonId);
      
      // 2. إذا كانت أول مرة، نضيفه لقائمة المكتملة
      if (isFirstTime) {
        completed.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(completed));
      }
      
      // 3. تحديث المهارات والنجوم بناءً على (أول مرة) أو (إعادة)
      if (user) {
        const currentSkills = user.skills || { knowledge: 0, speed: 0, logic: 0, creativity: 0, focus: 0, consistency: 0 };
        
        // لو أول مرة: 50 نجمة، لو إعادة: 5 نجوم
        const pointsToAdd = isFirstTime ? 50 : 5; 
        
        // لو أول مرة: زيادة كاملة، لو إعادة: زيادة 1% بس
        const boost = isFirstTime ? 1 : 0.2;

        const updatedUser = {
          ...user,
          total_points: (user.total_points || 0) + pointsToAdd,
          skills: {
            knowledge: Math.min(100, currentSkills.knowledge + (5 * boost)),
            speed: Math.min(100, currentSkills.speed + (3 * boost)),
            logic: Math.min(100, currentSkills.logic + (4 * boost)),
            creativity: Math.min(100, currentSkills.creativity + (2 * boost)),
            focus: Math.min(100, currentSkills.focus + (3 * boost)),
            consistency: Math.min(100, currentSkills.consistency + (2 * boost)),
          }
        };
        setUser(updatedUser);
      }

      setShowReward(true);
    }
  };

  if (showReward) {
    return <RewardScreen onFinish={onBack} />;
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', direction: 'rtl' }}>
      
      {/* الشريط العلوي */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '50%', color: 'white', border: 'none', cursor: 'pointer' }}>
          <ArrowRight size={24} />
        </button>
        <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '20px', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '5px 15px', borderRadius: '20px' }}>
          {currentQIndex + 1} / {questions.length}
        </div>
      </div>

      {/* شريط التقدم */}
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#1e293b', height: '10px', borderRadius: '10px', marginBottom: '30px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#10b981', height: '100%', width: `${((currentQIndex) / questions.length) * 100}%`, transition: 'all 0.3s' }} />
      </div>

      {/* السؤال */}
      <div style={{ marginBottom: '30px', minHeight: '80px', textAlign: 'center' }}>
        <SpokenText text={question.text} />
      </div>

      {/* الخيارات */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', width: '100%', maxWidth: '400px' }}>
        {question.options.map((option) => {
          let bgColor = '#1e293b';
          let borderColor = '#334155';
          let textColor = 'white';

          if (isAnswered) {
            if (option.text === question.correct) {
              bgColor = 'rgba(16, 185, 129, 0.2)'; borderColor = '#10b981'; textColor = '#10b981';
            } else if (option.text === selectedAnswer) {
              bgColor = 'rgba(244, 63, 94, 0.2)'; borderColor = '#f43f5e'; textColor = '#f43f5e';
            } else {
              bgColor = '#1e293b'; textColor = '#64748b'; 
            }
          }

          return (
            <button
              key={option.text}
              onClick={() => handleAnswer(option.text)}
              disabled={isAnswered && isCorrect}
              style={{
                position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '20px', borderRadius: '20px', border: `3px solid ${borderColor}`, backgroundColor: bgColor,
                transition: 'all 0.2s', minHeight: '140px', cursor: (isAnswered && isCorrect) ? 'default' : 'pointer', color: textColor
              }}
            >
              {option.imageUrl ? (
                <>
                  <img src={option.imageUrl} alt={option.text} style={{ width: '60px', height: '60px', marginBottom: '10px', objectFit: 'contain' }} />
                  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{option.text}</span>
                </>
              ) : (
                <span style={{ fontSize: '40px', fontWeight: 'bold' }}>{option.text}</span>
              )}

              {isAnswered && option.text === question.correct && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#10b981' }}><CheckCircle2 size={28} /></div>
              )}
              {isAnswered && option.text === selectedAnswer && !isCorrect && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#f43f5e' }}><XCircle size={28} /></div>
              )}
            </button>
          );
        })}
      </div>

      {/* زرار التالي */}
      {isAnswered && isCorrect && (
        <div style={{ marginTop: '30px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={24} /> ممتاز يا بطل!
          </div>
          
          <button 
            onClick={handleNext}
            style={{
              width: '100%', padding: '15px', borderRadius: '15px', fontWeight: 'bold', fontSize: '18px', color: 'white', border: 'none', cursor: 'pointer',
              backgroundColor: '#10b981'
            }}
          >
            {currentQIndex === questions.length - 1 ? 'إنهاء الدرس 🎉' : 'السؤال التالي'}
          </button>
        </div>
      )}

      {/* رسالة الخطأ */}
      {isAnswered && !isCorrect && (
        <div style={{ marginTop: '30px', color: '#f43f5e', fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <XCircle size={24} /> حاول مرة أخرى.
        </div>
      )}

    </div>
  );
};