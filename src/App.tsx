import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { store } from './store/store';
import { ThemeProvider } from './providers/theme/ThemeProvider';
import Navbar from './components/Navbar';
import TodoList from './pages/TodoList';
import EmployeeList from './pages/EmployeeList';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/employees" element={<EmployeeList />} />
            </Routes>
            <Toaster />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;