import ReactDOM from 'react-dom/client';
import App from './App';
import { SquidContextProvider } from '@squidcloud/react';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <SquidContextProvider
    options={{
      appId: import.meta.env.VITE_SQUID_APP_ID,
      region: import.meta.env.VITE_SQUID_REGION,
      environmentId: import.meta.env.VITE_SQUID_ENVIRONMENT_ID,
      squidDeveloperId: import.meta.env.VITE_SQUID_DEVELOPER_ID,
    }}
  >
    <App />
  </SquidContextProvider>,
);
