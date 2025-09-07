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
    <div className={`h-screen overflow-hidden ${theme === 'dark' ? 'theme-dark' : 'theme-light'} flex flex-col`}>
      <Header />
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 min-w-0">
          <PokerTable />
        </div>

        <div className="w-80 overflow-y-auto">
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
