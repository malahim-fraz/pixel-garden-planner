import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import TaskManager from "./components/TaskManager";
import GardenView from "./components/GardenView";
import Shop from "./components/Shop";
import useLocalStorage from "./hooks/useLocalStorage";
import { getTodayString, calculateStreak } from "./utils/helpers";
import { Sprout, ListTodo, Flower2, Store, Sun, Moon } from "lucide-react";

export default function App() {
  const [view, setView] = useState("dashboard");
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [points, setPoints] = useLocalStorage("points", 0);
  const [history, setHistory] = useLocalStorage("history", []);
  const [streak, setStreak] = useLocalStorage("streak", 0);
  const [lastActive, setLastActive] = useLocalStorage("lastActive", null);

  const [placedItems, setPlacedItems] = useLocalStorage("placedItems", []);
  const [unlockedItems, setUnlockedItems] = useLocalStorage(
    "unlockedItems",
    [],
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addTask = (text, type) => {
    const newTask = {
      id: Date.now(),
      text,
      type,
      points: type === "daily" ? 5 : 10,
      completedDates: [],
      archived: false,
    };
    setTasks([...tasks, newTask]);
  };

  const completeTask = (id) => {
    const today = getTodayString();
    let earnedPoints = 0;

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        if (task.type === "daily") {
          if (!task.completedDates.includes(today)) {
            earnedPoints = task.points;
            return { ...task, completedDates: [...task.completedDates, today] };
          }
        } else {
          if (!task.archived) {
            earnedPoints = task.points;
            return { ...task, archived: true };
          }
        }
      }
      return task;
    });

    if (earnedPoints > 0) {
      setTasks(updatedTasks);
      setPoints(points + earnedPoints);

      // Streak and History management
      const newStreak = calculateStreak(lastActive, today, streak);
      setStreak(newStreak);
      setLastActive(today);
      setHistory([...history, { date: today, taskId: id }]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    );
  };

  const buyItem = (item) => {
    if (points >= item.cost && !unlockedItems.includes(item.id)) {
      setPoints(points - item.cost);
      setUnlockedItems([...unlockedItems, item.id]);
    }
  };

  const placeItem = (itemId) => {
    setPlacedItems([...placedItems, { instanceId: Date.now(), itemId }]);
  };

  const removePlacedItem = (instanceId) => {
    setPlacedItems(
      placedItems.filter((item) => item.instanceId !== instanceId),
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-sky-light dark:bg-earth-dark transition-colors duration-300">
      {/* Header */}
      <header className="bg-nature-light dark:bg-earth-light pixel-border-b border-b-4 border-earth-dark p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-pixel text-sm md:text-xl text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] flex items-center gap-2">
          <Sprout className="w-6 h-6" /> Pixel Garden
        </h1>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="font-pixel text-xs md:text-sm text-white bg-earth-dark px-3 py-2 border-2 border-earth-dark shadow-pixel-sm">
            🌿 {points} NP
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="pixel-btn !p-2"
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-6 max-w-7xl w-full mx-auto">
        {view === "dashboard" && (
          <Dashboard
            tasks={tasks}
            points={points}
            streak={streak}
            placedItems={placedItems}
            setView={setView}
          />
        )}
        {view === "tasks" && (
          <TaskManager
            tasks={tasks}
            addTask={addTask}
            completeTask={completeTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        )}
        {view === "garden" && (
          <GardenView
            placedItems={placedItems}
            removePlacedItem={removePlacedItem}
            setView={setView}
          />
        )}
        {view === "shop" && (
          <Shop
            points={points}
            unlockedItems={unlockedItems}
            buyItem={buyItem}
            placeItem={placeItem}
            setView={setView}
          />
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="sticky bottom-0 bg-nature-light dark:bg-earth-light border-t-4 border-earth-dark p-2 flex justify-around z-50">
        <NavButton
          icon={Sprout}
          label="Home"
          active={view === "dashboard"}
          onClick={() => setView("dashboard")}
        />
        <NavButton
          icon={ListTodo}
          label="Tasks"
          active={view === "tasks"}
          onClick={() => setView("tasks")}
        />
        <NavButton
          icon={Flower2}
          label="Garden"
          active={view === "garden"}
          onClick={() => setView("garden")}
        />
        <NavButton
          icon={Store}
          label="Shop"
          active={view === "shop"}
          onClick={() => setView("shop")}
        />
      </nav>
    </div>
  );
}

function NavButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 w-20 transition-all ${active ? "text-white scale-105" : "text-earth-dark/70 dark:text-sky-light/70"}`}
    >
      <Icon
        className={`w-6 h-6 mb-1 ${active ? "drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]" : ""}`}
      />
      <span className="font-pixel text-[8px]">{label}</span>
    </button>
  );
}
