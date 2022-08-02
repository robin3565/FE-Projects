import logo from './logo.svg';
import './App.css';
import TodayClock from './Clock/components/TodayClock'
import TodayMotivation from './Motivation/components/TodayMotivation';
import Background from './Background/components/Background';

function App() {
  return (
    <div className="App">
      <Background/>
      <TodayClock className="clock"/>
      <TodayMotivation/>
    </div>
  );
}

export default App;
