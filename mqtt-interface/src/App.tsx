import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MqttStatus from './mqtt/MqttStatus';
import MqttControl from './mqtt/MqttControl';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Status</Link>
            </li>
            <li>
              <Link to="/control">Control</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" Component={MqttStatus} />
          <Route path="/control" Component={MqttControl} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
