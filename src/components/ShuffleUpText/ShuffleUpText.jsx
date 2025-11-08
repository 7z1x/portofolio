import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ShuffleUpText.css';

// ... (const textVariants dan wordVariants tidak perlu diubah)
const textVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    transition: { 
      staggerChildren: 0.02, 
      staggerDirection: -1,
    },
  },
};

const wordVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};


const ShuffleUpText = ({ words = [], duration = 3000, className = '' }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [index, duration, words.length]);

  const currentWord = words[index] || '';

  return (
    <div className={`shuffle-up-container ${className}`}>
      <AnimatePresence mode="wait">
        {/* --- UBAH motion.h1 MENJADI motion.div --- */}
        <motion.div
          key={index} 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="shuffle-up-content" /* Ganti nama class dari h1 */
        >
          <motion.span
            key={currentWord}
            variants={wordVariants}
            className="shuffle-up-word"
          >
            {currentWord}
          </motion.span>
        </motion.div>
        {/* --- BATAS PERUBAHAN --- */}
      </AnimatePresence>
    </div>
  );
};

export default ShuffleUpText;