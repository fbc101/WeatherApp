import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';


function App() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <p>Current time:</p>
      <Clock 
        value={value} 
        renderNumbers={true} 
        renderHourMarks={false}
        renderMinuteMarks={false}
        size={150}
      />
    </div>
  );
}

export default App;
