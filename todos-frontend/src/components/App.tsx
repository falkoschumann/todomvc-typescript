import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import { useStore } from './StoreProvider';

function App() {
  const store = useStore();

  const { pathname } = useLocation();
  const onLocationChanged = store.onLocationChanged;
  useEffect(() => onLocationChanged(pathname), [pathname, onLocationChanged]);

  return (
    <>
      <section className="todoapp">
        <Header {...store} />
        <Main {...store} />
        <Footer {...store} />
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
      </footer>
    </>
  );
}

export default App;
