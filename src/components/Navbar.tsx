import React from 'react';
import { Map, Home, User } from 'lucide-react';

export const Navbar = ({ currentScreen, setScreen }: { currentScreen: string, setScreen: (s: any) => void }) => {
  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '400px', zIndex: 50 }}>
      <nav style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '30px', padding: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        
        {/* الرئيسية -> تروح لشاشة الدول */}
        <button 
          onClick={() => setScreen('countries')}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: currentScreen === 'countries' ? '#10b981' : '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Home size={24} />
          <span style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '5px' }}>الرئيسية</span>
        </button>

        {/* رحلتي -> تروح لشاشة المستويات */}
        <button 
          onClick={() => setScreen('levels')}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: currentScreen === 'levels' || currentScreen === 'map' ? '#10b981' : '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Map size={24} />
          <span style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '5px' }}>رحلتي</span>
        </button>

        {/* ملفي */}
        <button 
          onClick={() => setScreen('profile')}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: currentScreen === 'profile' ? '#10b981' : '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <User size={24} />
          <span style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '5px' }}>ملفي</span>
        </button>

      </nav>
    </div>
  );
};