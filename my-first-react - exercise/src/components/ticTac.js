export default function ticTac() {
  let time = {};

/*   let running;

  if (!running) {
    running = true; */
    let clockObj = new Date();
    time.hour = clockObj.getHours();
    time.minutes = clockObj.getMinutes();
    time.seconds = clockObj.getSeconds();
/*   } else {
    running = false;
  } */

  return time;
}