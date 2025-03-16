"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModuleHeaderProps {
  module: number;
  topic: string;
  isActive: boolean;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ module, topic, isActive }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div 
          className="rounded-xl p-4 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg absolute w-full"
          initial={{ 
            opacity: 0, 
            y: -20,
            scale: 0.95
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            y: -20,
            scale: 0.95
          }}
          transition={{ 
            duration: 0.5, 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
        >
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0 w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-2xl border-4 border-blue-200 dark:border-blue-800"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                type: "spring" 
              }}
            >
              {module}
            </motion.div>
            <div className="ml-4 overflow-hidden">
              <motion.p 
                className="text-xs font-medium text-blue-200 dark:text-blue-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                MODULE
              </motion.p>
              <motion.h2 
                className="text-xl md:text-2xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                {topic}
              </motion.h2>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModuleHeader;