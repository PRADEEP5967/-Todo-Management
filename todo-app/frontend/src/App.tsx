import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import Signup from './pages/Auth/Signup';
import Signin from './pages/Auth/Signin';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Todos from './pages/Todos';
import Profile from './pages/Auth/Profile';
import Settings from './pages/Auth/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}> 
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* Protected */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/todos" element={
                <ProtectedRoute>
                  <Todos />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;