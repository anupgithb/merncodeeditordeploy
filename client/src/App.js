import './App.css';
import Code from './components/Code.jsx';
// import Ide from './components/Ide';
import Editor from './components/Editor';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import DataProvider from './context/DataProvider';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Editor />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}


export default App;
