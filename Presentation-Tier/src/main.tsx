import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

const root = createRoot(rootElement!);
root.render(<Main />);
