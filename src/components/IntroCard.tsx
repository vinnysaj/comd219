"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface IntroCardProps {
  onStart: () => void;
}

const IntroCard: React.FC<IntroCardProps> = ({ onStart }) => {
  return (
    <motion.div 
      className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 md:p-8">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Speech Feedback Reflection
        </motion.h1>
        <motion.p 
          className="text-blue-100 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          A journey through my growth as a presenter
        </motion.p>
      </div>
      
      <div className="p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Welcome to My Presentation Journey
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Throughout this speech course, I&apos;ve received valuable feedback from my instructor and classmates. 
            This interactive presentation analyzes that feedback, showing my growth across three key areas:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { 
                icon: '📝', 
                title: 'Speech Content', 
                description: 'Organization, clarity and relevance of material' 
              },
              { 
                icon: '🎤', 
                title: 'Delivery', 
                description: 'Voice, posture, eye contact, and presentation style' 
              },
              { 
                icon: '📊', 
                title: 'Visual Aids', 
                description: 'Slides and visual elements that enhance the message' 
              }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + (index * 0.2), duration: 0.5 }}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Navigate through my feedback journey using the arrow buttons or keyboard arrows. 
            Press &apos;S&apos; at any time to view the summary of all feedback by category.
          </p>
          
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onStart}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-2 rounded-full text-lg"
              >
                Begin My Journey
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroCard;