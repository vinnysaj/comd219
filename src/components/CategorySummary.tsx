"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FeedbackCategory } from './feedbackData';

interface CategorySummaryProps {
  categories: {
    [key in FeedbackCategory]: {
      count: number;
      positive: number;
      improvement: number;
    };
  };
  isVisible: boolean;
}

const CategorySummary: React.FC<CategorySummaryProps> = ({ categories, isVisible }) => {
  const categoryDetails = [
    {
      name: 'Speech Content' as FeedbackCategory,
      description: 'Organization, clarity, and relevance of your speech material',
      icon: '📝',
      color: 'from-indigo-400 to-indigo-600',
      borderColor: 'border-indigo-300 dark:border-indigo-700',
      textColor: 'text-indigo-900 dark:text-indigo-100'
    },
    {
      name: 'Delivery' as FeedbackCategory,
      description: 'Voice, posture, eye contact, and overall presentation style',
      icon: '🎤',
      color: 'from-emerald-400 to-emerald-600',
      borderColor: 'border-emerald-300 dark:border-emerald-700',
      textColor: 'text-emerald-900 dark:text-emerald-100'
    },
    {
      name: 'Visual Aids' as FeedbackCategory,
      description: 'Slides, props, and visual elements that enhance your presentation',
      icon: '📊',
      color: 'from-amber-400 to-amber-600',
      borderColor: 'border-amber-300 dark:border-amber-700',
      textColor: 'text-amber-900 dark:text-amber-100'
    }
  ];
  
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  // Progress bar animation
  const progressBar = {
    hidden: { width: 0 },
    show: { 
      width: '100%',
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8"
      variants={container}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
    >
      {categoryDetails.map((category, index) => {
        const stats = categories[category.name];
        return (
          <motion.div 
            key={category.name}
            className={`
              bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border
              ${category.borderColor}
            `}
            variants={item}
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={`bg-gradient-to-r ${category.color} p-4`}>
              <div className="flex items-center">
                <motion.span 
                  className="text-3xl mr-2"
                  initial={{ rotate: -10, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.2 + (index * 0.1), 
                    type: "spring" 
                  }}
                >
                  {category.icon}
                </motion.span>
                <h3 className="text-white font-bold">{category.name}</h3>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm ${category.textColor}`}>Total Feedback:</span>
                    <span className="font-semibold">{stats.count}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm ${category.textColor}`}>Strengths:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{stats.positive}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="bg-green-500 dark:bg-green-400 h-2 rounded-full"
                      style={{ width: `${(stats.positive / stats.count) * 100}%` }}
                      variants={progressBar}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm ${category.textColor}`}>Improvements:</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400">{stats.improvement}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="bg-amber-500 dark:bg-amber-400 h-2 rounded-full"
                      style={{ width: `${(stats.improvement / stats.count) * 100}%` }}
                      variants={progressBar}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default CategorySummary;