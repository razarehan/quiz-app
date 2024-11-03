import { useEffect, useState } from "react"

export default function QuestionTimer({timeout, onTimeout}) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(()=>{
    console.log("TIMEOUT");
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    }
  }, [timeout, onTimeout]);
  useEffect(()=>{
    console.log("INTERVAL");
    
    const interval = setInterval(()=>{
      setRemainingTime(prevRemainingTime=>{
        return prevRemainingTime - 100;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    }
  },[])

  return <>
    <progress id="progress-timer" max={timeout} value={remainingTime}/>
  </>
}