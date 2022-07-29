import { useState, useEffect } from 'react';

function useTimerToken() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if(counter<=0)
    {
      setCounter(0)
    }else{
      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [counter]);
  
  const setCounterVal = (val) => setCounter(val);
  const resetCounter = () => setCounter(1);

  return {counter, resetCounter, setCounterVal};
}

export default useTimerToken;