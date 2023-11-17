import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import WebcamStreamCapture from './WebcamStreamCapture';
import Camera from './Camera'; // Camera 컴포넌트를 임포트합니다.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/webcam" element={<WebcamStreamCapture />} />
        <Route path="/" element={<Camera />} />
      </Routes>
    </Router>
  );
}

export default App;
