import { UseTimersContext } from "../store/timers-context";
import Timer from "./Timer";


export default function Timers() {
  const {timers} = UseTimersContext();
  return <ul>
    {
    
    timers.map(timer => 
      <li key={timer.name}>
        <Timer {...timer}/>
      </li>
      )
    }
    </ul>;
}
