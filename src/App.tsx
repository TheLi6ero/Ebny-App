import React, { useState } from 'react';
import { PlatformLayout } from './components/PlatformLayout';
import { Navbar } from './components/Navbar';
import { CountriesScreen } from './screens/CountriesScreen';
import { LevelsScreen } from './screens/LevelsScreen';
import { MapScreen } from './screens/MapScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { seedDatabase } from './seedData'; // استوردنا الدالة

function App() {
  const [currentScreen, setCurrentScreen] = useState<'countries' | 'levels' | 'map' | 'profile'>('countries');
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  return (
    <PlatformLayout themeColor="#10b981">
      
      {/* زرار مؤقت لإدخال البيانات (امسحه بعد ما تخلص) */}
      <button 
        onClick={seedDatabase}
        style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 999, backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        إدخال البيانات (مؤقت)
      </button>

      {currentScreen === 'countries' && (
        <CountriesScreen onSelectCountry={(countryId) => {
          setActiveCountry(countryId);
          if (countryId === 'eg') setCurrentScreen('levels');
        }} />
      )}

      {currentScreen === 'levels' && activeCountry === 'eg' && (
        <LevelsScreen 
          onSelectLevel={() => setCurrentScreen('map')} 
          onBack={() => setCurrentScreen('countries')} 
        />
      )}

      {currentScreen === 'map' && (
        <MapScreen onBack={() => setCurrentScreen('levels')} />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen />
      )}

      <Navbar currentScreen={currentScreen} setScreen={setCurrentScreen} />
    </PlatformLayout>
  );
}

export default App;