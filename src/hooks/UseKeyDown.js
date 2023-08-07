import React from 'react';

function useKeyDown(key, callback) {
  React.useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === key) {
        callback();
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
}

export default useKeyDown;
