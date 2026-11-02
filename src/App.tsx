import React, { useState } from 'react';
import { PlatformLayout } from './components/PlatformLayout';
import { Navbar } from './components/Navbar';
import { CountriesScreen } from './screens/CountriesScreen';
import { LevelsScreen } from './screens/LevelsScreen';
import { MapScreen } from './screens/MapScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminScreen } from './screens/AdminScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'countries' | 'levels' | 'map' | 'profile' | 'admin'>('countries');
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  
  // 1. ضفنا دي عشان نحفظ المستوى المختار (KG1 أو KG2)
  const [activeLevel, setActiveLevel] = useState<string>('kg1'); 

  return (
    <PlatformLayout themeColor="#10b981">
      
      {currentScreen !== 'admin' && (
        <button 
          onClick={() => setCurrentScreen('admin')}
          style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 999, backgroundColor: '#3b82f6', color: 'white', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', border: 'none' }}
        >
          لوحة الإدارة ⚙️
        </button>
      )}

      {currentScreen === 'countries' && (
        <CountriesScreen onSelectCountry={(countryId) => {
          setActiveCountry(countryId);
          if (countryId === 'eg') setCurrentScreen('levels');
        }} />
      )}

      {currentScreen === 'levels' && activeCountry === 'eg' && (
        <LevelsScreen 
          // 2. بنحفظ المستوى اللي داس عليه
          onSelectLevel={(levelId) => {
            setActiveLevel(levelId); 
            setCurrentScreen('map');
          }} 
          onBack={() => setCurrentScreen('countries')} 
        />
      )}

      {currentScreen === 'map' && (
        // 3. بنبعت المستوى لشاشة الشجرة
        <MapScreen 
          grade={activeLevel} 
          onBack={() => setCurrentScreen('levels')} 
        />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen />
      )}

      {currentScreen === 'admin' && (
        <AdminScreen onBack={() => setCurrentScreen('countries')} />
      )}

      <Navbar currentScreen={currentScreen} setScreen={setCurrentScreen} />
    </PlatformLayout>
  );
}

export default App;