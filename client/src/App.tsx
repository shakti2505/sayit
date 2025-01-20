import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/Landing-page";
import NotFound from "./components/Not-found-404";
import Dashboard from "./components/dashboard/Dashboard";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "../src/components/ui/sonner";
import ChatPage from "./components/chats/pages/ChatPage";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats/:group_id"
          element={
            <ChatPage />
          }
        />
      </Routes>
      <Toaster richColors duration={1000} />
    </Provider>
  );
}

export default App;
