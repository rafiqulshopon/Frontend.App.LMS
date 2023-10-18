import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage.jsx';

const App = () => {
  const routes = [{ path: '/', component: <HomePage />, show: true }];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(
          (route, index) =>
            route.show && (
              <Route key={index} path={route.path} element={route.component} />
            )
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
