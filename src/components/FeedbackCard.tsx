"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FeedbackCategory } from './feedbackData';

interface FeedbackCardProps {
  author: string;
  role: 'Instructor' | 'Classmate';
  content: string;
  categories: FeedbackCategory[];
  currentCardIndex: number;
  totalCards: number;
}

const categoryColors = {
  'Speech Content': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  'Delivery': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  'Visual Aids': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
};

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  author,
  role,
  content,
  categories,
  currentCardIndex,
  totalCards,
}) => {
  return (
    <motion.div 
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto hover:shadow-xl"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-t-xl overflow-hidden">
        <motion.div 
          className="h-full bg-blue-500 dark:bg-blue-400"
          initial={{ width: 0 }}
          animate={{ width: `${((currentCardIndex + 1) / totalCards) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex items-start mb-4">
        <motion.div 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg shrink-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {author.charAt(0)}
        </motion.div>
        <div className="ml-4">
          <motion.h3 
            className="font-bold text-lg text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {author}
          </motion.h3>
          <motion.p 
            className={`text-sm ${role === 'Instructor' ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {role}
          </motion.p>
        </div>
      </div>
      
      <motion.blockquote 
        className="italic text-gray-700 dark:text-gray-300 border-l-4 border-blue-200 dark:border-blue-800 pl-4 my-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        "{content}"
      </motion.blockquote>
      
      <motion.div 
        className="mt-4 flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {categories.map((category, index) => (
          <motion.span 
            key={category}
            className={`${categoryColors[category]} text-xs font-semibold px-2.5 py-1 rounded-full`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
            whileHover={{ scale: 1.1 }}
          >
            {category}
          </motion.span>
        ))}
      </motion.div>
      
      <motion.div 
        className="absolute bottom-2 right-4 text-xs text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        {currentCardIndex + 1} of {totalCards}
      </motion.div>
    </motion.div>
  );
};

export default FeedbackCard;