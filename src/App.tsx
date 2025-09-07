import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import PokerTable from "./components/PokerTable";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotificationCenter from "./components/NotificationCenter";
import { fetchTrainingScenario } from "./store/slices/gameSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    // Initialize the app with a training scenario
    dispatch(fetchTrainingScenario());
  }, [dispatch]);

  return (
    <div className={`h-screen ${theme === 'dark' ? 'theme-dark' : 'theme-light'} flex flex-col overflow-hidden`}>
      <div className="shrink-0">
        <Header />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 min-w-0 overflow-hidden">
          <PokerTable />
        </div>

        <div className="w-80 shrink-0">
          <Sidebar />
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <NotificationCenter />
      </div>
    </div>
  );
}

export default App;
