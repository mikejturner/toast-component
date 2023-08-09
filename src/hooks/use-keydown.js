import React from 'react';

function useKeydown(key, callback) {
  React.useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === key) {
        callback(event);
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [key, callback]);
}

export default useKeydown;
