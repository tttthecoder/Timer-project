import { UseTimersContext } from '../store/timers-context.tsx';
import Button from './UI/Button.tsx';

export default function Header() {
  const ctx = UseTimersContext();
  return (
    <header>
      <h1>ReactTimer</h1>
      <Button onClick={ctx.isRunning ? ctx.stopTimers : ctx.startTimers}> {ctx.isRunning ? 'Stop' : 'Start'} Timers</Button>
    </header>
  );
}
