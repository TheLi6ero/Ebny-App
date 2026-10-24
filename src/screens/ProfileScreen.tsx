import React from 'react';
import { User, Star, Brain } from 'lucide-react';
import { useAppStore } from '../core/store/useAppStore'; // استوردنا الـ Store

export const ProfileScreen = () => {
  // بنسحب بيانات المستخدم من المتجر مباشرة
  const { user } = useAppStore();

  // لو مفيش مستخدم (لدواعي الأمان)
  if (!user) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>جاري التحميل...</div>;

  // بنستخدم المهارات من الستور، ولو مش موجودة بنحط قيم افتراضية
  const skills = user.skills || { knowledge: 0, speed: 0, logic: 0, creativity: 0, focus: 0, consistency: 0 };

  const renderHexagon = (data: number[], maxRadius: number, color: string, opacity: number) => {
    const cx = 120;
    const cy = 120;
    const points = data.map((value, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const r = (value / 100) * maxRadius;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
    return <polygon points={points} fill={color} fillOpacity={opacity} stroke={color} strokeWidth="2" />;
  };

  const cx = 120;
  const cy = 120;
  const maxRadius = 80;
  const labelRadius = 105;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '30px 20px', direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* كارت الطفل */}
      <div style={{ backgroundColor: '#1e293b', width: '100%', maxWidth: '400px', borderRadius: '25px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', border: '2px solid #334155', marginBottom: '30px' }}>
        <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <User size={40} />
        </div>
        <div>
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '900', marginBottom: '5px' }}>{user.name || 'بطل المنصة'}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fbbf24', fontWeight: 'bold' }}>
            <Star size={18} fill="currentColor" />
            <span>{user.total_points || 0} نجمة</span>
            <span style={{ color: '#64748b', margin: '0 10px' }}>|</span>
            <span style={{ color: '#10b981' }}>المستوى الأول (KG1)</span>
          </div>
        </div>
      </div>

      {/* الشكل السداسي للمهارات */}
      <div style={{ backgroundColor: '#1e293b', width: '100%', maxWidth: '400px', borderRadius: '25px', padding: '20px', border: '2px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{ color: 'white', fontSize: '22px', fontWeight: '900' }}>مهاراتي</span>
          <Brain size={28} color="#f43f5e" />
        </div>
        
        <svg viewBox="0 0 240 240" style={{ width: '100%', maxWidth: '320px', overflow: 'visible' }}>
          
          {/* الشبكة الخلفية */}
          {[0.25, 0.5, 0.75, 1].map((level) => (
            <polygon key={level} points={Array.from({ length: 6 }).map((_, i) => {
              const angle = (Math.PI / 3) * i - Math.PI / 2;
              return `${cx + (maxRadius * level) * Math.cos(angle)},${cy + (maxRadius * level) * Math.sin(angle)}`;
            }).join(' ')} fill="none" stroke="#334155" strokeWidth="1" />
          ))}
          
          {/* محاور الشكل */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            return <line key={i} x1={cx} y1={cy} x2={cx + maxRadius * Math.cos(angle)} y2={cy + maxRadius * Math.sin(angle)} stroke="#334155" strokeWidth="1" />;
          })}

          {/* بيانات الطفل */}
          {renderHexagon([
            skills.knowledge, skills.logic, skills.creativity,
            skills.focus, skills.consistency, skills.speed
          ], maxRadius, '#10b981', 0.4)}

          {/* النصوص */}
          {[
            { label: 'المعرفة', value: Math.round(skills.knowledge), angle: -90 },
            { label: 'الذكاء', value: Math.round(skills.logic), angle: -30 },
            { label: 'الإبداع', value: Math.round(skills.creativity), angle: 30 },
            { label: 'التركيز', value: Math.round(skills.focus), angle: 90 },
            { label: 'الاستمرارية', value: Math.round(skills.consistency), angle: 150 },
            { label: 'السرعة', value: Math.round(skills.speed), angle: 210 },
          ].map((item, i) => {
            const rad = (item.angle * Math.PI) / 180;
            const x = cx + labelRadius * Math.cos(rad);
            const y = cy + labelRadius * Math.sin(rad);
            return (
              <g key={i}>
                <text x={x} y={y - 5} fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">{item.label}</text>
                <text x={x} y={y + 10} fill="#10b981" fontSize="13" fontWeight="900" textAnchor="middle">{item.value}%</text>
              </g>
            );
          })}
        </svg>
      </div>

    </div>
  );
};