import './App.css';
import './global.css';
import { UserProvider } from 'data/UserContext';

import AppRouter from './AppRouter';

function App() {
  return (
    <>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </>

  );
}

export default App;
