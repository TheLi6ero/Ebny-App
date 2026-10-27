import React from 'react';
import { Globe, Lock, Play } from 'lucide-react';

interface CountriesScreenProps {
  onSelectCountry: (countryId: string) => void;
}

// قائمة بالدول العربية مع روابط صور الأعلام الحقيقية
const COUNTRIES = [
  { id: 'eg', name: 'مصر', flagUrl: 'https://flagcdn.com/w80/eg.png', isLocked: false, subtitle: 'المنهج المصري' },
  { id: 'sa', name: 'السعودية', flagUrl: 'https://flagcdn.com/w80/sa.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'ae', name: 'الإمارات', flagUrl: 'https://flagcdn.com/w80/ae.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'dz', name: 'الجزائر', flagUrl: 'https://flagcdn.com/w80/dz.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'ma', name: 'المغرب', flagUrl: 'https://flagcdn.com/w80/ma.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'tn', name: 'تونس', flagUrl: 'https://flagcdn.com/w80/tn.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'jo', name: 'الأردن', flagUrl: 'https://flagcdn.com/w80/jo.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'kw', name: 'الكويت', flagUrl: 'https://flagcdn.com/w80/kw.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'qa', name: 'قطر', flagUrl: 'https://flagcdn.com/w80/qa.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'bh', name: 'البحرين', flagUrl: 'https://flagcdn.com/w80/bh.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'om', name: 'عمان', flagUrl: 'https://flagcdn.com/w80/om.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'ye', name: 'اليمن', flagUrl: 'https://flagcdn.com/w80/ye.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'iq', name: 'العراق', flagUrl: 'https://flagcdn.com/w80/iq.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'sy', name: 'سوريا', flagUrl: 'https://flagcdn.com/w80/sy.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'lb', name: 'لبنان', flagUrl: 'https://flagcdn.com/w80/lb.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'ps', name: 'فلسطين', flagUrl: 'https://flagcdn.com/w80/ps.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'sd', name: 'السودان', flagUrl: 'https://flagcdn.com/w80/sd.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'ly', name: 'ليبيا', flagUrl: 'https://flagcdn.com/w80/ly.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'mr', name: 'موريتانيا', flagUrl: 'https://flagcdn.com/w80/mr.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'so', name: 'الصومال', flagUrl: 'https://flagcdn.com/w80/so.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'km', name: 'جزر القمر', flagUrl: 'https://flagcdn.com/w80/km.png', isLocked: true, subtitle: 'قريباً' },
  { id: 'dj', name: 'جيبوتي', flagUrl: 'https://flagcdn.com/w80/dj.png', isLocked: true, subtitle: 'قريباً' },
];

export const CountriesScreen: React.FC<CountriesScreenProps> = ({ onSelectCountry }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '30px 20px', direction: 'rtl', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* العنوان */}
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', color: '#10b981' }}>
          <Globe size={50} />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>اختر دولتك</h1>
        <p style={{ color: '#94a3b8', fontWeight: 'bold' }}>المناهج التعليمية العربية في مكان واحد</p>
      </div>

      {/* شبكة الدول (Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', width: '100%', maxWidth: '500px' }}>
        {COUNTRIES.map((country) => (
          <button
            key={country.id}
            onClick={() => {
              if (!country.isLocked) onSelectCountry(country.id);
            }}
            disabled={country.isLocked}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '20px 10px', borderRadius: '20px', 
              border: `2px solid ${country.isLocked ? '#334155' : '#10b981'}`,
              backgroundColor: country.isLocked ? '#1e293b' : 'rgba(16, 185, 129, 0.1)',
              cursor: country.isLocked ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              opacity: country.isLocked ? 0.7 : 1,
              position: 'relative'
            }}
          >
            {/* اسم الدولة بالعربي */}
            <h3 style={{ fontSize: '27px', fontWeight: 'bold', color: country.isLocked ? '#94a3b8' : 'white', marginBottom: '8px' }}>
              {country.name}
            </h3>

            {/* صورة العلم */}
            <img 
              src={country.flagUrl} 
              alt={country.name} 
              style={{ 
                width: '60px', 
                height: '40px', 
                objectFit: 'cover', 
                borderRadius: '5px', 
                marginBottom: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)' 
              }} 
            />

            {/* الحالة (قريباً أو المنهج) */}
            <p style={{ fontSize: '15px', fontWeight: 'bold', color: country.isLocked ? '#64748b' : '#10b981' }}>
              {country.subtitle}
            </p>

            {/* الأيقونة (قفل أو تشغيل) */}
            <div style={{ 
              position: 'absolute', top: '10px', left: '10px',
              backgroundColor: country.isLocked ? '#0f172a' : '#10b981',
              borderRadius: '50%', padding: '5px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {country.isLocked ? <Lock size={16} color="#64748b" /> : <Play size={16} color="white" fill="white" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};