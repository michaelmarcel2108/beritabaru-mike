// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import defaultData from '@/data/prankData.json';
import NewsArticle from '@/components/NewsArticle';
import PrankNotificationModal from '@/components/PrankNotificationModal';
import AnniversaryReveal from '@/components/AnniversaryReveal';
import SettingsModal from '@/components/SettingsModal';

export default function Home() {
  const [data, setData] = useState(defaultData);
  const [showPrankModal, setShowPrankModal] = useState(false);
  const [isAnniversaryRevealed, setIsAnniversaryRevealed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load custom data from localStorage if exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem('prank_anniv_custom_data_v2');
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not read localStorage', e);
    }
  }, []);

  // Trigger the annoying unclosable notification after delay or scroll
  useEffect(() => {
    if (isAnniversaryRevealed) return;

    const delay = (data.prankConfig?.triggerDelaySeconds || 4) * 1000;
    const timer = setTimeout(() => {
      setShowPrankModal(true);
    }, delay);

    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowPrankModal(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data.prankConfig?.triggerDelaySeconds, isAnniversaryRevealed]);

  // When user saves in settings modal
  const handleSaveData = (newData: any) => {
    setData(newData);
    try {
      localStorage.setItem('prank_anniv_custom_data_v2', JSON.stringify(newData));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  // Reset to original JSON
  const handleResetData = () => {
    try {
      localStorage.removeItem('prank_anniv_custom_data_v2');
    } catch (e) {}
    setData(defaultData);
  };

  // Replay prank from start
  const handleResetPrank = () => {
    setIsAnniversaryRevealed(false);
    setShowPrankModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-trigger after 3 seconds
    setTimeout(() => {
      setShowPrankModal(true);
    }, 3000);
  };

  return (
    <main className="relative min-h-screen">
      {/* If anniversary has been revealed */}
      {isAnniversaryRevealed ? (
        <AnniversaryReveal 
          anniversaryData={data.anniversary}
          onResetPrank={handleResetPrank}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      ) : (
        /* Otherwise, show the Realistic Fake News Article */
        <>
          <NewsArticle 
            newsData={data.news}
            onTriggerPrank={() => setShowPrankModal(true)}
          />

          {/* Unclosable & Dodging Prank Notification Overlay */}
          {showPrankModal && (
            <PrankNotificationModal 
              prankConfig={data.prankConfig}
              onPrankComplete={() => {
                setShowPrankModal(false);
                setIsAnniversaryRevealed(true);
              }}
            />
          )}
        </>
      )}

      {/* Settings Modal (Always accessible) */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        currentData={data}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveData}
        onResetDefault={handleResetData}
      />
    </main>
  );
}

