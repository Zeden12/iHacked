import { useState } from "react";
import LockScreen from "./components/LockScreen";
import LoveMessage from "./components/LoveMessage";

function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white flex items-center justify-center">
      {unlocked ? <LoveMessage /> : <LockScreen onUnlock={() => setUnlocked(true)} />}
    </div>
  );
}

export default App;
