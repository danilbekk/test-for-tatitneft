import ReactDOM from 'react-dom/client';
import App from './app/App';
import { GlobalProvider } from './app/GlobalProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
