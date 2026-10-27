import React, { useState, useEffect } from 'react';
import { KG1_TREE } from '../core/data/levelsData';
import { Lock, Star, Play } from 'lucide-react';
import { LessonScreen } from '../components/LessonScreen';

export const MapScreen = () => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [treeData, setTreeData] = useState(KG1_TREE); // حالة البيانات اللي بتظهر

  // تحديث الشجرة بناءً على الدروس المحفوظة
  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    
    let currentUnlocked = false;

    const updatedTree = KG1_TREE.map((node) => {
      if (completed.includes(node.id)) {
        return { ...node, status: 'completed' }; // لو متحفظ إنه خلصه
      } else if (!currentUnlocked) {
        currentUnlocked = true;
        return { ...node, status: 'current' }; // أول حرف مش متخلص = متاح
      } else {
        return { ...node, status: 'locked' }; // الباقي مقفول
      }
    });

    setTreeData(updatedTree);
  }, [activeLesson]); // بيحدث لما نرجع من الدرس

  // لو في درس مفتوح، اعرض شاشة الدرس
  if (activeLesson) {
    return <LessonScreen lessonId={activeLesson} onBack={() => setActiveLesson(null)} />;
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '250px', paddingTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#0f172a', overflowY: 'auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>رحلة التعلم 🚀</h1>
        <p style={{ color: '#94a3b8', fontWeight: 'bold' }}>أكمل الدروس لتفتح المستويات التالية</p>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width: '100%', maxWidth: '300px' }}>
        
        <div style={{ position: 'absolute', top: 0, bottom: 0, width: '4px', backgroundColor: '#334155', zIndex: -1, borderRadius: '5px' }} />

        {treeData.map((node, index) => {
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
                  transition: 'all 0.3s ease'
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