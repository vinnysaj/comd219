"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { feedbackData, FeedbackCategory } from './feedbackData';
import { Button } from './ui/button';
import FeedbackCard from './FeedbackCard';
import ModuleHeader from './ModuleHeader';
import CategorySummary from './CategorySummary';
import IntroCard from './IntroCard';
import JourneyCard from './JourneyCard';

// Convert the feedbackData into a flat array of cards for easy navigation
const allFeedback = feedbackData.flatMap(module => 
  module.feedback.map(feedback => ({
    moduleNumber: module.module,
    moduleTopic: module.topic,
    ...feedback
  }))
);

// Pre-calculate category statistics
const categoryStats = {
  'Speech Content': { count: 0, positive: 0, improvement: 0 },
  'Delivery': { count: 0, positive: 0, improvement: 0 },
  'Visual Aids': { count: 0, positive: 0, improvement: 0 }
};

// Simplified logic to estimate if feedback is positive or needs improvement
allFeedback.forEach(feedback => {
  feedback.categories.forEach(category => {
    categoryStats[category].count++;
    
    // Very simple sentiment analysis - just for demonstration
    const content = feedback.content.toLowerCase();
    if (
      content.includes('excellent') || 
      content.includes('great') || 
      content.includes('good') || 
      content.includes('liked') || 
      content.includes('strong')
    ) {
      categoryStats[category].positive++;
    } else {
      categoryStats[category].improvement++;
    }
  });
});

// Define the viewMode type with string to avoid TypeScript narrowing issues
type ViewMode = string;

const FeedbackPresentation: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('intro');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentCard = allFeedback[currentCardIndex];
  // We now consider the journey screen as an additional "virtual" card in the sequence
  const isLastFeedbackCard = currentCardIndex === allFeedback.length - 1;
  const showJourneyPrompt = isLastFeedbackCard && viewMode === 'feedback';
  
  const startPresentation = () => {
    setViewMode('feedback');
  };
  
  const showJourney = () => {
    setViewMode('journey');
  };
  
  const backToStart = () => {
    setCurrentCardIndex(0);
    setViewMode('feedback');
  };
  
  const goToNextCard = () => {
    if (currentCardIndex < allFeedback.length - 1 && !isAnimating) {
      // Not at the last card yet, go to next feedback card
      setAnimationDirection('next');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCardIndex(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else if (isLastFeedbackCard && viewMode === 'feedback' && !isAnimating) {
      // At the last feedback card, show the journey card
      showJourney();
    } else if (viewMode === 'journey') {
      // From journey card, go back to first card
      backToStart();
    }
  };
  
  const goToPrevCard = () => {
    if (currentCardIndex > 0 && !isAnimating) {
      setAnimationDirection('prev');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCardIndex(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };
  
  const toggleSummary = () => {
    setViewMode(viewMode === 'summary' ? 'feedback' : 'summary');
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === 'intro') {
        if (e.key === 'Enter' || e.key === ' ') {
          startPresentation();
        }
        return;
      }
      
      if (viewMode === 'journey') {
        if (e.key === 'Escape' || e.key === 'Backspace') {
          backToStart();
        }
        return;
      }
      
      if (e.key === 'ArrowRight') {
        goToNextCard();
      } else if (e.key === 'ArrowLeft') {
        goToPrevCard();
      } else if (e.key === 's' || e.key === 'S') {
        toggleSummary();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCardIndex, isAnimating, viewMode]);
  
  // Fix for horizontal scrolling
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);
  
  // Different views based on mode
  if (viewMode === 'intro') {
    return (
      <div className="container mx-auto py-8 md:py-16 px-4 min-h-screen flex flex-col justify-center">
        <IntroCard onStart={startPresentation} />
      </div>
    );
  }
  
  if (viewMode === 'journey') {
    return (
      <div className="container mx-auto py-8 md:py-16 px-4 min-h-screen flex flex-col justify-center">
        <JourneyCard 
          onBackToStart={backToStart} 
          categoryStats={categoryStats as {
            [key in FeedbackCategory]: {
              count: number;
              positive: number;
              improvement: number;
            };
          }} 
        />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 md:py-16 px-4 overflow-x-hidden">
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">Speech Feedback Journey</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A reflection on my growth as a presenter through feedback from my instructor and classmates
        </p>
      </motion.div>
      
      {/* Summary View with AnimatePresence */}
      <AnimatePresence mode="wait">
        {viewMode === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <CategorySummary 
              categories={categoryStats as {
                [key in FeedbackCategory]: {
                  count: number;
                  positive: number;
                  improvement: number;
                };
              }} 
              isVisible={true} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Feedback Cards with AnimatePresence */}
      <AnimatePresence mode="wait">
        {viewMode === 'feedback' && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-hidden"
          >
            <div className="mb-8 relative h-24">
              {feedbackData.map(module => (
                <ModuleHeader 
                  key={module.module}
                  module={module.module}
                  topic={module.topic}
                  isActive={module.module === currentCard.moduleNumber}
                />
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCardIndex}
                initial={{ 
                  opacity: 0, 
                  x: animationDirection === 'next' ? 100 : -100 
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0 
                }}
                exit={{ 
                  opacity: 0, 
                  x: animationDirection === 'next' ? -100 : 100 
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
              >
                <FeedbackCard 
                  author={currentCard.author}
                  role={currentCard.role}
                  content={currentCard.content}
                  categories={currentCard.categories}
                  currentCardIndex={currentCardIndex}
                  totalCards={allFeedback.length}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation Controls */}
      {viewMode !== 'intro' && (
        <motion.div 
          className="flex justify-center items-center mt-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Back button - conditionally shown based on view mode */}
          {(viewMode === 'feedback' || viewMode === 'summary') && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                onClick={goToPrevCard}
                disabled={currentCardIndex === 0 || isAnimating || viewMode === 'summary'}
                variant="outline"
                className="rounded-full h-12 w-12 p-0 flex items-center justify-center"
              >
                <span className="text-xl">←</span>
              </Button>
            </motion.div>
          )}
          
          {/* Summary toggle button - only shown in feedback or summary modes */}
          {(viewMode === 'feedback' || viewMode === 'summary') && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={toggleSummary}
                variant="secondary"
                className="px-4"
              >
                {viewMode === 'summary' ? 'Show Feedback' : 'View Summary'}
              </Button>
            </motion.div>
          )}
          
          {/* Back to start button - only shown in journey mode */}
          {viewMode === 'journey' && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={backToStart}
                variant="secondary"
                className="px-4"
              >
                Back to Feedback
              </Button>
            </motion.div>
          )}
          
          {/* Next/Continue button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              onClick={goToNextCard}
              disabled={(isLastFeedbackCard && viewMode === 'summary') || isAnimating}
              variant={showJourneyPrompt || viewMode === 'journey' ? "default" : "outline"}
              className={`rounded-full h-12 w-12 p-0 flex items-center justify-center ${(showJourneyPrompt || viewMode === 'journey') ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : ''}`}
            >
              <span className="text-xl">→</span>
            </Button>
          </motion.div>
        </motion.div>
      )}
      
      {/* Keyboard shortcuts info based on mode */}
      {(viewMode === 'feedback' || viewMode === 'summary') && (
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Keyboard shortcuts: Arrow keys to navigate, {"'S'"} to toggle summary</p>
          {showJourneyPrompt && (
            <p className="mt-2 text-indigo-500 dark:text-indigo-400 animate-pulse">
              Click the right arrow to view your speech journey summary →
            </p>
          )}
        </div>
      )}
      
      {/* Journey mode hint */}
      {viewMode === 'journey' && (
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Navigate with buttons or press Escape to go back to feedback</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackPresentation;