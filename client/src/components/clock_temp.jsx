import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './clock_temp.css'

function ClockTemp({ temperatures, isAM }) {
  const [value, setValue] = useState(new Date());
  const [temps, setTemps] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    cleanData();
    return () => {
      clearInterval(interval);
    };
  }, []);

  const cleanData = () => {
    // const date = new Date(); // Get the current date and time
    // const hours = date.getHours(); // Get the hour (0-23)
    // const isAM = hours < 12;

    isAM ? setTemps(temperatures.slice(0, 12)) : setTemps(temperatures.slice(12, 24));
  }

  useEffect(() => {
    cleanData();
  }, [isAM]);

  return (
    <div>
      <Clock className="react-lib-clock"
        value={value} 
        renderNumbers={true} 
        renderHourMarks={false}
        renderMinuteMarks={false}
        size={150}
      />
      <div className="surrounding-numbers">
        {temps && temps.map((temp, idx) => {
          return <span className={`class-${idx}`}>{temp.temperature}</span>
        })}
      </div>
      <div className="surrounding-numbers" style={{ width: 25, height: 25, marginTop:100, marginLeft: 60, padding: 0}}> {isAM ? 'AM' : 'PM' }</div>
    </div>
  );
}

export default ClockTemp;