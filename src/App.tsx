import React, { useState } from 'react';
import { PlatformLayout } from './components/PlatformLayout';
import { Navbar } from './components/Navbar';
import { LevelsScreen } from './screens/LevelsScreen';
import { MapScreen } from './screens/MapScreen';
import { ProfileScreen } from './screens/ProfileScreen'; // تأكد إن الملف ده موجود في مجلد screens

function App() {
  const [currentScreen, setCurrentScreen] = useState<'levels' | 'map' | 'profile'>('levels');

  return (
    <PlatformLayout themeColor="#10b981">
      
      {currentScreen === 'levels' && (
        <LevelsScreen onSelectLevel={() => setCurrentScreen('map')} />
      )}

      {currentScreen === 'map' && (
        <MapScreen onBack={() => setCurrentScreen('levels')} />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen />
      )}

      {/* تأكد إن المكون ده بياخد الـ props */}
      <Navbar currentScreen={currentScreen} setScreen={setCurrentScreen} />
      
    </PlatformLayout>
  );
}

export default App;