import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { SpokenText } from '../components/SpokenText';
import { RewardScreen } from '../components/RewardScreen';
import { useAppStore } from '../core/store/useAppStore';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const LessonScreen = ({ lessonId, onBack }: { lessonId: string, onBack: () => void }) => {
  const { user, setUser } = useAppStore();
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showReward, setShowReward] = useState(false);

  // جلب الأسئلة من Firebase
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsRef = collection(db, 'curriculums', 'eg_kg1_arabic', 'lessons', lessonId, 'questions');
        const snapshot = await getDocs(questionsRef);
        
        const fetchedQuestions = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        
        setQuestions(fetchedQuestions);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("حدث خطأ أثناء تحميل الأسئلة.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [lessonId]);

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

    const isCorrect = optionText === questions[currentQIndex].correct;

    if (isCorrect) {
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
      // عند إكمال الدرس
      const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
      const isFirstTime = !completed.includes(lessonId);
      
      if (isFirstTime) {
        completed.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(completed));
      }
      
      // تحديث المهارات والنجوم
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

  if (loading) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
        جاري تحميل الأسئلة... ⏳
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <p style={{ color: '#f43f5e', fontSize: '18px', fontWeight: 'bold' }}>{error}</p>
        <button onClick={onBack} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#334155', borderRadius: '10px', color: 'white', border: 'none', cursor: 'pointer' }}>عودة</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>لا توجد أسئلة لهذا الدرس حالياً.</p>
        <button onClick={onBack} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#334155', borderRadius: '10px', color: 'white', border: 'none', cursor: 'pointer' }}>عودة</button>
      </div>
    );
  }

  if (showReward) {
    return <RewardScreen onFinish={onBack} />;
  }

  const question = questions[currentQIndex];
  const isCorrect = selectedAnswer === question.correct;

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
        {question.options?.map((option: any) => {
          // لو الخيار جاي كـ String أو كـ Object (عشان يدعم الطريقتين)
          const optionText = typeof option === 'string' ? option : option.text;
          const optionImage = typeof option === 'object' ? option.imageUrl : null;

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
                padding: '20px', borderRadius: '20px', border: `3px solid ${borderColor}`, backgroundColor: bgColor,
                transition: 'all 0.2s', minHeight: '140px', cursor: (isAnswered && isCorrect) ? 'default' : 'pointer', color: textColor
              }}
            >
              {optionImage ? (
                <>
                  <img src={optionImage} alt={optionText} style={{ width: '60px', height: '60px', marginBottom: '10px', objectFit: 'contain' }} />
                  <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{optionText}</span>
                </>
              ) : (
                <span style={{ fontSize: '30px', fontWeight: 'bold' }}>{optionText}</span>
              )}

              {isAnswered && optionText === question.correct && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#10b981' }}><CheckCircle2 size={28} /></div>
              )}
              {isAnswered && optionText === selectedAnswer && !isCorrect && (
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
          <button onClick={handleNext} style={{ width: '100%', padding: '15px', borderRadius: '15px', fontWeight: 'bold', fontSize: '18px', color: 'white', border: 'none', cursor: 'pointer', backgroundColor: '#10b981' }}>
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