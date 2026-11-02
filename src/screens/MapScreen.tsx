import React, { useState, useEffect } from 'react';
import { Lock, Star, Play, ArrowRight } from 'lucide-react';
import { LessonScreen } from '../components/LessonScreen';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export const MapScreen = ({ onBack }: { onBack: () => void }) => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // جلب الدروس من Firebase
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsRef = collection(db, 'curriculums', 'eg_kg1_arabic', 'lessons');
        const q = query(lessonsRef, orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        
        const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
        let foundCurrent = false;

        const fetchedLessons = snapshot.docs.map((doc) => {
          const data = doc.data();
          
          // تحديد حالة الدرس (مكتمل / حالي / مقفول)
          let status = 'locked';
          if (completed.includes(doc.id)) {
            status = 'completed';
          } else if (!foundCurrent) {
            status = 'current';
            foundCurrent = true; // أول درس مش مكتمل بيبقى هو الحالي والباقي بيتقفل
          }

          return {
            id: doc.id,
            title: data.title || 'درس بدون اسم',
            status: status
          };
        });
        
        setLessons(fetchedLessons);
      } catch (err: any) {
        console.error("Error fetching lessons: ", err);
        setError("حدث خطأ أثناء تحميل الدروس. تأكد من اتصالك بالإنترنت.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [activeLesson]); // بنحدث الداتا لما نرجع من الدرس

  // لو في درس مفتوح، اعرض شاشة الدرس
  if (activeLesson) {
    return <LessonScreen lessonId={activeLesson} onBack={() => setActiveLesson(null)} />;
  }

  if (loading) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
        جاري تحميل الدروس... ⏳
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

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '250px', paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#0f172a', overflowY: 'auto' }}>
      
      {/* زرار الرجوع */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'flex-start', padding: '0 20px', marginBottom: '10px' }}>
        <button onClick={onBack} style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '50%', color: 'white', border: 'none', cursor: 'pointer' }}>
          <ArrowRight size={24} />
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>رحلة التعلم 🚀</h1>
        <p style={{ color: '#94a3b8', fontWeight: 'bold' }}>أكمل الدروس لتفتح المستويات التالية</p>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width: '100%', maxWidth: '300px' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, width: '4px', backgroundColor: '#334155', zIndex: -1, borderRadius: '5px' }} />

        {lessons.map((node, index) => {
          const offset = index % 2 === 0 ? { transform: 'translateX(40px)' } : { transform: 'translateX(-40px)' };

          return (
            <div key={node.id} style={{ ...offset, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                onClick={() => {
                  if (node.status === 'current' || node.status === 'completed') setActiveLesson(node.id);
                }}
                style={{
                  width: '80px', height: '80px', borderRadius: '50%', border: '4px solid',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: node.status === 'locked' ? 'not-allowed' : 'pointer',
                  backgroundColor: node.status === 'completed' ? '#fbbf24' : node.status === 'current' ? '#10b981' : '#1e293b',
                  borderColor: node.status === 'completed' ? '#f59e0b' : node.status === 'current' ? '#059669' : '#334155',
                  color: 'white',
                  boxShadow: node.status === 'current' ? '0 0 20px rgba(16, 185, 129, 0.5)' : 'none',
                }}
              >
                {node.status === 'locked' ? <Lock size={30} /> :
                 node.status === 'completed' ? <Star size={30} fill="currentColor" /> :
                 <Play size={30} fill="currentColor" />}
              </button>
              
              <span style={{ 
                marginTop: '12px', fontWeight: 'bold', fontSize: '14px', color: 'white', 
                backgroundColor: '#1e293b', padding: '6px 16px', borderRadius: '20px', 
                whiteSpace: 'nowrap', border: '1px solid #334155'
              }}>
                {node.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};