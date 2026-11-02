import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { SpokenText } from '../components/SpokenText';
import { RewardScreen } from '../components/RewardScreen';
import { useAppStore } from '../core/store/useAppStore';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

// 1. ضفنا grade هنا عشان يستقبل الـ KG1 أو KG2
export const LessonScreen = ({ lessonId, subject, grade, onBack }: { lessonId: string, subject: string, grade: string, onBack: () => void }) => {
  const { user, setUser } = useAppStore();
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const isEnglish = subject === 'english';

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // 2. هنا التعديل المهم: بنستخدم grade عشان نحدد المسار الصح
        const curriculumId = `eg_${grade}_${subject}`;
        
        const questionsRef = collection(db, 'curriculums', curriculumId, 'lessons', lessonId, 'questions');
        const snapshot = await getDocs(questionsRef);
        const fetchedQuestions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setQuestions(fetchedQuestions);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [lessonId, subject, grade]); // ضفنا grade في الـ dependencies

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const cleanText = text.replace(/[^\w\s\u0600-\u06FF]/g, '').trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      if (isEnglish) {
        utterance.lang = 'en-US';
        const voices = window.speechSynthesis.getVoices();
        const engVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || 
                         voices.find(v => v.lang === 'en-US') || 
                         voices.find(v => v.lang.startsWith('en'));
        if (engVoice) utterance.voice = engVoice;
      } else {
        utterance.lang = 'ar-EG';
        const voices = window.speechSynthesis.getVoices();
        const arVoice = voices.find(v => v.lang.startsWith('ar'));
        if (arVoice) utterance.voice = arVoice;
      }
      
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (optionText: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(optionText);
    setIsAnswered(true);
    speak(optionText);

    const isCorrect = optionText === questions[currentQIndex].correct;

    if (isCorrect) {
      setTimeout(() => speak(isEnglish ? 'Correct answer' : 'إجابة صحيحة'), 1000);
    } else {
      setTimeout(() => {
        speak(isEnglish ? 'Try again' : 'حاول مرة أخرى');
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
      // 3. هنا كمان بنستخدم grade عشان نحفظ التقدم للمستوى الصح
      const curriculumId = `eg_${grade}_${subject}`;
      const completed = JSON.parse(localStorage.getItem(`completed_${curriculumId}`) || '[]');
      const isFirstTime = !completed.includes(lessonId);
      
      if (isFirstTime) {
        completed.push(lessonId);
        localStorage.setItem(`completed_${curriculumId}`, JSON.stringify(completed));
      }
      
      if (user) {
        const currentSkills = user.skills || { knowledge: 0, speed: 0, logic: 0, creativity: 0, focus: 0, consistency: 0 };
        const pointsToAdd = isFirstTime ? 50 : 5; 
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

  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading... ⏳</div>;
  
  if (questions.length === 0) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <p>No questions found.</p>
        <button onClick={onBack} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#334155', borderRadius: '10px', color: 'white' }}>Go Back</button>
      </div>
    );
  }

  if (showReward) return <RewardScreen onFinish={onBack} />;

  const question = questions[currentQIndex];
  const isCorrect = selectedAnswer === question.correct;
  const themeColor = isEnglish ? '#3b82f6' : '#10b981';

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', direction: isEnglish ? 'ltr' : 'rtl' }}>
      
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '50%', color: 'white', border: 'none', cursor: 'pointer', transform: isEnglish ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <ArrowRight size={24} />
        </button>
        <div style={{ color: themeColor, fontWeight: 'bold', fontSize: '20px', backgroundColor: `${themeColor}20`, padding: '5px 15px', borderRadius: '20px' }}>
          {currentQIndex + 1} / {questions.length}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#1e293b', height: '10px', borderRadius: '10px', marginBottom: '30px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: themeColor, height: '100%', width: `${((currentQIndex) / questions.length) * 100}%`, transition: 'all 0.3s' }} />
      </div>

      <div style={{ marginBottom: '30px', minHeight: '80px', textAlign: 'center', width: '100%' }}>
        <SpokenText text={question.text} lang={isEnglish ? 'en-US' : 'ar-EG'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', width: '100%', maxWidth: '400px' }}>
        {question.options?.map((option: any) => {
          const optionText = typeof option === 'string' ? option : option.text;
          
          let bgColor = '#1e293b';
          let borderColor = '#334155';
          let textColor = 'white';

          if (isAnswered) {
            if (optionText === question.correct) {
              bgColor = 'rgba(16, 185, 129, 0.2)'; borderColor = '#10b981'; textColor = '#10b981';
            } else if (optionText === selectedAnswer) {
              bgColor = 'rgba(244, 63, 94, 0.2)'; borderColor = '#f43f5e'; textColor = '#f43f5e';
            } else {
              bgColor = '#1e293b'; textColor = '#64748b'; 
            }
          }

          return (
            <button
              key={optionText}
              onClick={() => handleAnswer(optionText)}
              disabled={isAnswered && isCorrect}
              style={{
                position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '15px', borderRadius: '20px', border: `3px solid ${borderColor}`, backgroundColor: bgColor,
                transition: 'all 0.2s', minHeight: '140px', cursor: (isAnswered && isCorrect) ? 'default' : 'pointer', color: textColor,
                direction: isEnglish ? 'ltr' : 'rtl'
              }}
            >
              <span style={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'center' }}>{optionText}</span>

              {isAnswered && optionText === question.correct && (
                <div style={{ position: 'absolute', top: '10px', right: isEnglish ? 'auto' : '10px', left: isEnglish ? '10px' : 'auto', color: '#10b981' }}><CheckCircle2 size={24} /></div>
              )}
              {isAnswered && optionText === selectedAnswer && !isCorrect && (
                <div style={{ position: 'absolute', top: '10px', right: isEnglish ? 'auto' : '10px', left: isEnglish ? '10px' : 'auto', color: '#f43f5e' }}><XCircle size={24} /></div>
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && isCorrect && (
        <div style={{ marginTop: '30px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <div style={{ color: themeColor, fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={24} /> {isEnglish ? 'Great job!' : 'ممتاز يا بطل!'}
          </div>
          <button onClick={handleNext} style={{ width: '100%', padding: '15px', borderRadius: '15px', fontWeight: 'bold', fontSize: '18px', color: 'white', border: 'none', cursor: 'pointer', backgroundColor: themeColor }}>
            {currentQIndex === questions.length - 1 ? (isEnglish ? 'Finish Lesson 🎉' : 'إنهاء الدرس 🎉') : (isEnglish ? 'Next Question' : 'السؤال التالي')}
          </button>
        </div>
      )}

      {isAnswered && !isCorrect && (
        <div style={{ marginTop: '30px', color: '#f43f5e', fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <XCircle size={24} /> {isEnglish ? 'Try again.' : 'حاول مرة أخرى.'}
        </div>
      )}

    </div>
  );
};