import { HashRouter as Router, Route, Routes} from 'react-router-dom'; // WebOS올릴 때, HashRouter!!
import RegisterForm from './RegisterForm';
import WebcamStreamCapture from './WebcamStreamCapture';
import Camera from './Camera'; // Camera 컴포넌트를 임포트합니다.
import UserRecCam from './UserRecCam';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Camera />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/webcam" element={<WebcamStreamCapture />} />
        <Route path="/recog" element={<UserRecCam />} />
      </Routes>
    </Router>
  );
}

export default App;
