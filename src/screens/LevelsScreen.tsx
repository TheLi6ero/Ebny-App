import React from 'react';
import { Lock, Play, GraduationCap } from 'lucide-react';

interface LevelsScreenProps {
  onSelectLevel: (levelId: string) => void;
}

const LEVELS = [
  { id: 'kg1', title: 'المستوى الأول (KG1)', subtitle: 'رياض أطفال - الترم الأول', isLocked: false },
  { id: 'kg2', title: 'المستوى الثاني (KG2)', subtitle: 'رياض أطفال - الترم الثاني', isLocked: true },
  { id: 'primary1', title: 'الصف الأول الابتدائي', subtitle: 'المرحلة الابتدائية', isLocked: true },
  { id: 'primary2', title: 'الصف الثاني الابتدائي', subtitle: 'المرحلة الابتدائية', isLocked: true },
];

export const LevelsScreen: React.FC<LevelsScreenProps> = ({ onSelectLevel }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '30px 20px', direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', color: '#10b981' }}>
          <GraduationCap size={50} />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>اختر مستواك الدراسي</h1>
        <p style={{ color: '#94a3b8', fontWeight: 'bold' }}>رحلتك التعليمية تبدأ من هنا</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '400px' }}>
        {LEVELS.map((level) => (
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
              <h3 style={{ fontSize: '20px', fontWeight: '900', color: level.isLocked ? '#94a3b8' : 'white', marginBottom: '4px' }}>
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
    </div>
  );
};