
import { ProgressConsumer } from "../components/ProgressContext";

import "./../styles/progressbar.css";

export default function ProgressBar() {
 let context = ProgressConsumer();
 console.log("READING PROGRESS from CONTExT:", context.progress.done, context.progress.total)
  const done = context.progress.done
  const total = context.progress.total; 

  return (
    <>
      <span id="value">
        progress: {done} / {total}
      </span>
      <progress value={done} max={total}/>
    </>
  );
}
