import "./App.css";
import { ErrorBoundary } from "./components/atoms/errorBondury/errorBondury";
import { Home } from "./components/organism/home/home";

function App() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}

export default App;
