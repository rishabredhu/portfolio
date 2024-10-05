import React, { useState } from 'react';
import Confetti from 'react-confetti';

/**
 * EasterEgg component
 * 
 * This component renders a list of words that act as easter eggs. When a word is clicked,
 * it changes its color and displays a unique design next to it. Additionally, the word
 * changes to a predefined new word. If the word is "WOW", a confetti animation is triggered.
 * If the word is "??", it redirects to a song on YouTube.
 * 
 * @param {string} word - The word to be displayed initially
 * @param {boolean} [boldText] - Optional parameter to make the text bold
 * @param {string} [textColor] - Optional parameter to set the text color
 * @returns {JSX.Element} The rendered EasterEgg component
 */
const EasterEgg: React.FC<{ word: string; boldText?: boolean; textColor?: string }> = ({ word, boldText = false, textColor = 'black' }) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const easterEggs = [
    { word: 'WOW', newWord: '1/5 EasterEgg.', color: 'violet' },
    { word: 'PICTURE', newWord: 'ART', color: 'blue' },
    { word: 'HEAR THIS', newWord: 'SPOTIFY', color: 'green' },
    { word: 'MOVIE', newWord: 'MOVIES I LIKE', color: 'purple' },
    { word: 'BOOK A CALL', newWord: '?form?', color: 'red' }
  ];
  
  const egg = easterEggs.find(egg => egg.word === word);

  if (!egg) {
    return <span>{word}</span>;
  }

  const handleClick = () => {
    setClickedIndex(0);
    if (word === 'WOW') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 50000); // Confetti will disappear after 5 seconds
    } else if (word === '??') {
      alert('Take a break, listen to this!');
      window.open('https://www.youtube.com/watch?v=6MAzUT1YhWE&t=116s', '_blank'); // Redirect to a song on YouTube
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <span 
        onClick={handleClick}
        style={{ 
          cursor: 'pointer', 
          position: 'relative', 
          color: clickedIndex === 0 ? egg.color : textColor,
          marginRight: '20px',
          fontWeight: boldText ? 'bold' : 'normal'
        }}
      >
        {clickedIndex === 0 && word !== '??' && (
          <div 
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '100%', 
              background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)', 
              boxShadow: '0 0 10px rgba(238,174,202,0.8), 0 0 20px rgba(238,174,202,0.6), 0 0 30px rgba(238,174,202,0.4)',
              transform: 'translateY(-50%)', 
              marginLeft: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: egg.color,
              fontWeight: 'bold',
              padding: '5px 10px', // Add padding to adjust the background size
              whiteSpace: 'nowrap' // Prevent text from wrapping
            }} 
          >
            {egg.newWord}
          </div>
        )}
        {clickedIndex !== 0 && egg.word}
      </span>
    </>
  );
};

export default EasterEgg;
