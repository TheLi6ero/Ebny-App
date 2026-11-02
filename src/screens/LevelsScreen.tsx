import React, { useState, useEffect } from 'react';
import { Lock, Play, GraduationCap, ArrowRight, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';

interface LevelsScreenProps {
  onSelectLevel: (levelId: string) => void;
  onBack: () => void;
}

// القائمة الأساسية للمستويات (من غير ما نحدد مين مقفول ومين مفتوح)
const INITIAL_LEVELS = [
  { id: 'kg1', title: 'المستوى الأول (KG1)', subtitle: 'رياض أطفال - الترم الأول' },
  { id: 'kg2', title: 'المستوى الثاني (KG2)', subtitle: 'رياض أطفال - الترم الثاني' },
  { id: 'prim1', title: 'الصف الأول الابتدائي', subtitle: 'المرحلة الابتدائية' },
  { id: 'prim2', title: 'الصف الثاني الابتدائي', subtitle: 'المرحلة الابتدائية' },
];

export const LevelsScreen: React.FC<LevelsScreenProps> = ({ onSelectLevel, onBack }) => {
  const [levels, setLevels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // دالة بتشيك على الداتابيز هل المستوى فيه دروس ولا لأ
  useEffect(() => {
    const checkLevelsAvailability = async () => {
      try {
        const checkedLevels = await Promise.all(
          INITIAL_LEVELS.map(async (level) => {
            // بنشيك على العربي والإنجليزي.. لو أي واحد فيهم فيه دروس، المستوى هيتفتح
            const arabicRef = collection(db, 'curriculums', `eg_${level.id}_arabic`, 'lessons');
            const englishRef = collection(db, 'curriculums', `eg_${level.id}_english`, 'lessons');

            const [arabicSnap, englishSnap] = await Promise.all([
              getDocs(query(arabicRef, limit(1))),
              getDocs(query(englishRef, limit(1)))
            ]);

            // لو في دروس في العربي أو الإنجليزي، يبقى المستوى مفتوح
            const isLocked = arabicSnap.empty && englishSnap.empty;

            return { ...level, isLocked };
          })
        );

        setLevels(checkedLevels);
      } catch (error) {
        console.error("Error checking levels:", error);
        // لو حصل مشكلة في النت، بنقفلهم كلهم احتياطي
        setLevels(INITIAL_LEVELS.map(l => ({ ...l, isLocked: true })));
      } finally {
        setLoading(false);
      }
    };

    checkLevelsAvailability();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '30px 20px', direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* شريط الرجوع */}
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
        <button 
          onClick={onBack} 
          style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '50%', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <ArrowRight size={24} />
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', color: '#10b981' }}>
          <GraduationCap size={50} />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>اختر مستواك الدراسي</h1>
        <p style={{ color: '#94a3b8', fontWeight: 'bold' }}>رحلتك التعليمية تبدأ من هنا</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#10b981', marginTop: '50px' }}>
          <Loader2 size={40} className="animate-spin" />
          <p style={{ marginTop: '15px', fontWeight: 'bold' }}>جاري تحميل المستويات... ⏳</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '400px' }}>
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => {
                if (!level.isLocked) onSelectLevel(level.id);
              }}
              disabled={level.isLocked}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px', borderRadius: '20px', border: `2px solid ${level.isLocked ? '#334155' : '#10b981'}`,
                backgroundColor: level.isLocked ? '#1e293b' : 'rgba(16, 185, 129, 0.1)',
                cursor: level.isLocked ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: level.isLocked ? 0.7 : 1
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'right' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: level.isLocked ? '#94a3b8' : 'white', marginBottom: '4px' }}>
                  {level.title}
                </h3>
                <p style={{ fontSize: '14px', fontWeight: 'bold', color: level.isLocked ? '#64748b' : '#10b981' }}>
                  {level.isLocked ? 'قريباً جداً...' : level.subtitle}
                </p>
              </div>

              <div style={{ 
                width: '50px', height: '50px', borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: level.isLocked ? '#0f172a' : '#10b981',
                color: 'white'
              }}>
                {level.isLocked ? <Lock size={24} /> : <Play size={24} fill="currentColor" />}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};