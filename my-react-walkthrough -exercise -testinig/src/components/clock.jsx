import { useEffect, useRef, useState } from "react";
import ticTac from "./ticTac";

function Clock() {
    let [time, setTime] = useState({
          hour: 0,
          minutes: 0,
          seconds: 0
    });

  useEffect(() => {
      let clockinterval = setInterval(() => {
        let actualTime = ticTac();
        setTime({
          hour: actualTime.hour,
          minutes: actualTime.minutes,
          seconds: actualTime.seconds,
        });
        //console.log("time state: ", time)
        return;
      }, 1000);
      return () => {
        clearInterval(clockinterval);
      };
        // eslint-disable-next-line
  }, [time.seconds]);

  let style = {
    '.big':{fontSize: 500},
    '.small':{fontSize: 300},
    fontFamily: 'Courier New'
  }

  let display= 
    <div id="clock" style={style}>
        <span className="big">{time.hour || '24'} : {time.minutes || '00'}</span>
        
        <span className="small">: {time.seconds || '00'}</span>
    </div>
    ;

    
    let halfMinute = useRef(0);

    useEffect(()=>{
            if (halfMinute.current + 30 === time.seconds ){
                halfMinute.current = time.seconds
            }else if (halfMinute.current - 30 === time.seconds ){
                halfMinute.current = time.seconds
            }
            
            // eslint-disable-next-line
    },[time.seconds])

    let runtime = halfMinute.current
    return ({
        display,
        runtime
    })
}

export default Clock