import React, { useEffect } from 'react';
import { Star, Trophy, ArrowRight } from 'lucide-react';

interface RewardScreenProps {
  onFinish: () => void;
}

// مكون بسيط لعمل قصاصات الورق بدون أي مكتبة
const Confetti = () => {
  const colors = ['#10b981', '#fbbf24', '#38bdf8', '#f43f5e', '#a855f7'];
  
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
      {Array.from({ length: 50 }).map((_, i) => {
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 2 + 2; // بين 2 و 4 ثواني
        const animationDelay = Math.random() * 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-20px',
              left: `${left}%`,
              width: '10px',
              height: '15px',
              backgroundColor: color,
              animation: `fall ${animationDuration}s linear ${animationDelay}s infinite`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes bounce-star {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
};

export const RewardScreen: React.FC<RewardScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // نطق رسالة التهنئة
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('مبروك يا بطل! لقد أكملت الدرس بنجاح');
      utterance.lang = 'ar-EG';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return (
    <div style={{ position: 'relative', backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', direction: 'rtl', overflow: 'hidden' }}>
      
      <Confetti />

      {/* النجمة والكأس */}
      <div style={{ position: 'relative', marginBottom: '30px', zIndex: 10 }}>
        <div style={{ position: 'absolute', top: '-20px', left: '-20px', color: '#fbbf24', opacity: 0.8 }}>
          <Star size={40} fill="currentColor" />
        </div>
        <div style={{ position: 'absolute', bottom: '-10px', right: '-30px', color: '#38bdf8', opacity: 0.8 }}>
          <Star size={30} fill="currentColor" />
        </div>
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', padding: '30px', borderRadius: '50%', border: '4px solid #10b981', boxShadow: '0 0 40px rgba(16, 185, 129, 0.3)' }}>
          <Trophy size={80} color="#fbbf24" fill="#fbbf24" />
        </div>
      </div>

      {/* النصوص */}
      <h1 style={{ color: 'white', fontSize: '36px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center', textShadow: '0 4px 20px rgba(16, 185, 129, 0.5)', zIndex: 10 }}>
        مبروك يا بطل! 🎉
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '20px', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center', zIndex: 10 }}>
        لقد أكملت هذا المستوى بنجاح
      </p>

      {/* النجوم */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '50px', zIndex: 10 }}>
        <Star size={40} color="#fbbf24" fill="#fbbf24" style={{ animation: 'bounce-star 1s infinite' }} />
        <Star size={50} color="#fbbf24" fill="#fbbf24" style={{ animation: 'bounce-star 1s infinite 0.2s' }} />
        <Star size={40} color="#fbbf24" fill="#fbbf24" style={{ animation: 'bounce-star 1s infinite 0.4s' }} />
      </div>

      {/* زرار العودة */}
      <button 
        onClick={onFinish}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10,
          backgroundColor: '#10b981', color: 'white', padding: '18px 40px', 
          borderRadius: '20px', fontSize: '22px', fontWeight: 'bold', 
          border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <ArrowRight size={28} />
        العودة للرحلة
      </button>

    </div>
  );
};