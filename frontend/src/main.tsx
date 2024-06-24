import ReactDOM from 'react-dom/client';
import App from './App';
import { SquidContextProvider } from '@squidcloud/react';
import './index.css';

interface SquidOptions {
  appId: string;
  region: 'us-east-1.aws' | 'ap-south-1.aws'; 
  environmentId: 'dev' | 'prod' | undefined;
  squidDeveloperId?: string;
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const squidOptions: SquidOptions = {
  appId: import.meta.env.VITE_SQUID_APP_ID,
  region: import.meta.env.VITE_SQUID_REGION,
  environmentId: import.meta.env.VITE_SQUID_ENVIRONMENT_ID,
};
const squidDeveloperId = import.meta.env.VITE_SQUID_DEVELOPER_ID;

// Only add squidDeveloperId during local development
if (squidDeveloperId) {
  console.log(squidDeveloperId);
  squidOptions.squidDeveloperId = squidDeveloperId;
}

ReactDOM.createRoot(rootElement).render(
  <SquidContextProvider options={squidOptions}>
    <App />
  </SquidContextProvider>,
);
