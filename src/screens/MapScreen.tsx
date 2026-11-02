import React, { useState, useEffect } from 'react';
import { Lock, Star, Play, ArrowRight } from 'lucide-react';
import { LessonScreen } from '../components/LessonScreen';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

// 1. ضفنا grade هنا عشان يستقبل KG1 أو KG2
export const MapScreen = ({ grade, onBack }: { grade: string, onBack: () => void }) => {
  const [subject, setSubject] = useState<'arabic' | 'english'>('arabic');
  
  // 2. ضفنا grade في الحالة بتاعة الدرس عشان نبعته لشاشة الأسئلة
  const [activeLesson, setActiveLesson] = useState<{ id: string, subject: string, grade: string } | null>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      try {
        // 3. هنا التعديل الأهم: بنستخدم grade عشان نحدد الداتابيز الصح
        const curriculumId = `eg_${grade}_${subject}`; 
        
        const lessonsRef = collection(db, 'curriculums', curriculumId, 'lessons');
        const q = query(lessonsRef, orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        
        const completed = JSON.parse(localStorage.getItem(`completed_${curriculumId}`) || '[]');

        const fetchedLessons = await Promise.all(snapshot.docs.map(async (doc) => {
          const data = doc.data();
          
          const questionsRef = collection(db, 'curriculums', curriculumId, 'lessons', doc.id, 'questions');
          const qSnapshot = await getDocs(query(questionsRef, limit(1)));
          const hasQuestions = !qSnapshot.empty;

          let status = 'locked'; 

          // لو في أسئلة، بنفتحه
          if (hasQuestions) {
            if (completed.includes(doc.id)) {
              status = 'completed';
            } else {
              status = 'current';
            }
          }

          return {
            id: doc.id,
            title: data.title || 'درس',
            status: status
          };
        }));
        
        setLessons(fetchedLessons);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching lessons: ", err);
        setError("حدث خطأ أثناء تحميل الدروس. تأكد من اتصالك.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [subject, activeLesson, grade]); // ضفنا grade هنا عشان لو المستوى اتغير الداتا تتحدث

  if (activeLesson) {
    // 4. بنبعت الـ grade لشاشة الدرس
    return <LessonScreen lessonId={activeLesson.id} subject={activeLesson.subject} grade={activeLesson.grade} onBack={() => setActiveLesson(null)} />;
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '250px', paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#0f172a', overflowY: 'auto' }}>
      
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'flex-start', padding: '0 20px', marginBottom: '15px' }}>
        <button onClick={onBack} style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '50%', color: 'white', border: 'none', cursor: 'pointer' }}>
          <ArrowRight size={24} />
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px', padding: '0 20px', marginBottom: '20px' }}>
        <button 
          onClick={() => setSubject('arabic')}
          style={{ flex: 1, padding: '12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: subject === 'arabic' ? '#10b981' : '#1e293b', color: subject === 'arabic' ? 'white' : '#94a3b8' }}
        >
          اللغة العربية 🇪🇬
        </button>
        <button 
          onClick={() => setSubject('english')}
          style={{ flex: 1, padding: '12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: subject === 'english' ? '#3b82f6' : '#1e293b', color: subject === 'english' ? 'white' : '#94a3b8' }}
        >
          English 🇬🇧
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
          {subject === 'arabic' ? 'رحلة التعلم 🚀' : 'Learning Journey 🚀'}
        </h1>
      </div>

      {loading ? (
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>جاري التحميل... ⏳</div>
      ) : error ? (
        <div style={{ color: '#f43f5e', fontSize: '18px', fontWeight: 'bold' }}>{error}</div>
      ) : lessons.length === 0 ? (
        <div style={{ color: '#94a3b8', fontSize: '18px', fontWeight: 'bold' }}>لا توجد دروس مضافة هنا بعد.</div>
      ) : (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width: '100%', maxWidth: '300px' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, width: '4px', backgroundColor: '#334155', zIndex: -1, borderRadius: '5px' }} />

          {lessons.map((node, index) => {
            const offset = index % 2 === 0 ? { transform: 'translateX(40px)' } : { transform: 'translateX(-40px)' };
            const themeColor = subject === 'arabic' ? '#10b981' : '#3b82f6';

            return (
              <div key={node.id} style={{ ...offset, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    // 5. بنبعت الـ grade وقت الدخول للدرس
                    if (node.status === 'current' || node.status === 'completed') setActiveLesson({ id: node.id, subject, grade });
                  }}
                  style={{
                    width: '80px', height: '80px', borderRadius: '50%', border: '4px solid',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: node.status === 'locked' ? 'not-allowed' : 'pointer',
                    backgroundColor: node.status === 'completed' ? '#fbbf24' : node.status === 'current' ? themeColor : '#1e293b',
                    borderColor: node.status === 'completed' ? '#f59e0b' : node.status === 'current' ? themeColor : '#334155',
                    color: 'white',
                    boxShadow: node.status === 'current' ? `0 0 20px ${themeColor}80` : 'none',
                  }}
                >
                  {node.status === 'locked' ? <Lock size={30} /> :
                   node.status === 'completed' ? <Star size={30} fill="currentColor" /> :
                   <Play size={30} fill="currentColor" />}
                </button>
                
                <span style={{ 
                  marginTop: '12px', fontWeight: 'bold', fontSize: '14px', color: 'white', 
                  backgroundColor: '#1e293b', padding: '6px 16px', borderRadius: '20px', 
                  whiteSpace: 'nowrap', border: '1px solid #334155', direction: subject === 'arabic' ? 'rtl' : 'ltr'
                }}>
                  {node.title}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};