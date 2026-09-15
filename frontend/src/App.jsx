import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <ToastProvider>
      <div className="overflow-x-hidden w-full min-h-screen">
        <AppRoutes />
      </div>
    </ToastProvider>
  );
}

export default App;