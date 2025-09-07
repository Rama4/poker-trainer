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
      <Header />
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <PokerTable />
        </div>
        <Sidebar />
      </div>
      <NotificationCenter />
    </div>
  );
}

export default App;
