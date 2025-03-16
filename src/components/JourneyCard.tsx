"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FeedbackCategory } from './feedbackData';

interface JourneyCardProps {
  onBackToStart: () => void;
  categoryStats?: {
    [key in FeedbackCategory]: {
      count: number;
      positive: number;
      improvement: number;
    };
  };
}

const JourneyCard: React.FC<JourneyCardProps> = ({ categoryStats = {
  'Speech Content': { count: 8, positive: 5, improvement: 3 },
  'Delivery': { count: 6, positive: 4, improvement: 2 },
  'Visual Aids': { count: 5, positive: 3, improvement: 2 }
} }) => {
  
  // Define category colors for consistency
  const categoryColors = {
    'Speech Content': {
      icon: '💬',
      bg: 'bg-indigo-100 dark:bg-indigo-900',
      text: 'text-indigo-800 dark:text-indigo-200',
      border: 'border-indigo-300 dark:border-indigo-700',
      gradient: 'from-indigo-400 to-indigo-600'
    },
    'Delivery': {
      icon: '🎤',
      bg: 'bg-emerald-100 dark:bg-emerald-900',
      text: 'text-emerald-800 dark:text-emerald-200',
      border: 'border-emerald-300 dark:border-emerald-700',
      gradient: 'from-emerald-400 to-emerald-600'
    },
    'Visual Aids': {
      icon: '📊',
      bg: 'bg-amber-100 dark:bg-amber-900',
      text: 'text-amber-800 dark:text-amber-200',
      border: 'border-amber-300 dark:border-amber-700',
      gradient: 'from-amber-400 to-amber-600'
    }
  };
  
  // Calculate overall stats
  const totalFeedback = Object.values(categoryStats).reduce((sum, cat) => sum + cat.count, 0);
  const totalPositive = Object.values(categoryStats).reduce((sum, cat) => sum + cat.positive, 0);
  const positivePercentage = Math.round((totalPositive / totalFeedback) * 100) || 0;
  
  return (
    <motion.div 
      className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 md:p-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          My Speech Journey
        </motion.h2>
        <motion.div 
          className="w-16 h-1 bg-blue-200 rounded"
          initial={{ width: 0 }}
          animate={{ width: "4rem" }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
      </div>
      
      <div className="p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-8"
        >
          {/* Overall Stats Summary */}
          <motion.div 
            className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
              Feedback Overview
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalFeedback}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Pieces</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalPositive}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Strengths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{positivePercentage}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Positive</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3"
                style={{ width: `${positivePercentage}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${positivePercentage}%` }}
                transition={{ delay: 0.7, duration: 1 }}
              />
            </div>
          </motion.div>
          
          {/* Category Sections */}
          {(Object.entries(categoryStats) as [FeedbackCategory, { count: number; positive: number; improvement: number }][]).map(([category, stats], index) => {
            const colors = categoryColors[category];
            const positivePercent = Math.round((stats.positive / stats.count) * 100) || 0;
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.2), duration: 0.5 }}
                className={`border-l-4 ${colors.border} pl-4`}
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                  <span className="text-2xl mr-2">{colors.icon}</span> 
                  {category}
                </h3>
                
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="md:col-span-3">
                    <p className="text-gray-600 dark:text-gray-300">
                      {category === 'Speech Content' && 
                        "I began with good organization, but through feedback, I learned to better connect with my audience through personal stories and concrete examples. My content has evolved to be more audience-focused rather than just information-focused."}
                      {category === 'Delivery' && 
                        "My biggest challenge was filler words and pacing. The feedback consistently mentioned \"umms\" and \"uhhs\". Over time, I learned to embrace pauses instead of filling them, which made my delivery more confident and impactful."}
                      {category === 'Visual Aids' && 
                        "I started with text-heavy slides but learned to create more impactful visuals that enhance rather than distract from my message. By module 8, multiple classmates commented on the effectiveness of my visuals."}
                    </p>
                  </div>
                  <div className="md:border-l md:border-gray-200 md:dark:border-gray-700 md:pl-4 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Feedback</span>
                      <span className="font-medium">{stats.count}</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Strengths</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{stats.positive}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden mt-1">
                      <motion.div 
                        className={`bg-gradient-to-r ${colors.gradient} h-2`}
                        style={{ width: `${positivePercent}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${positivePercent}%` }}
                        transition={{ delay: 1 + (index * 0.2), duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* Advice Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="border-t border-gray-200 dark:border-gray-700 pt-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Advice for Future Students
            </h3>
            <blockquote className="italic text-gray-600 dark:text-gray-300 border-l-4 border-indigo-200 dark:border-indigo-800 pl-4">
              "Embrace feedback as a gift, not criticism. Record yourself practicing, and watch it critically. The most 
              growth happens when you're willing to see your own areas for improvement and actively work on them before 
              your next presentation."
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JourneyCard;