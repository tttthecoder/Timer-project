import Container from './UI/Container.tsx';
import { UseTimersContext, type Timer as TimerProps } from '../store/timers-context.tsx'
import { useEffect, useRef, useState } from 'react';

export default function Timer({ name, duration }: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = UseTimersContext();
  if (remainingTime <= 0) {
    clearInterval(interval.current!)
  }
  useEffect(
    () => {
      let timer: number
      if (isRunning && remainingTime > 0) {
        timer = setInterval(
          () => {
            setRemainingTime(prev => prev - 50)
          },
          50)
        interval.current = timer;
      }
      else {
        clearInterval(interval.current!)
      }
      return () => { clearInterval(timer) }
    }
    ,
    [isRunning]);
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p><progress value={remainingTime} max={duration * 1000} /></p>
      <p>{(remainingTime / 1000).toFixed(2)}</p>
    </Container>
  );
}

