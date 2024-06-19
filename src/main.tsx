import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Oml2d from './components/Oml2d'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
    <Router>
      <App />
    </Router>
    <Oml2d primaryColor='pink'></Oml2d>
  </Provider>
)
