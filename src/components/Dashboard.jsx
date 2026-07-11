import React from "react";
import PixelArt from "./PixelArt";
import { gardenItems } from "../data/gardenItems";
import { getTodayString } from "../utils/helpers";
import {
  CheckCircle2,
  Calendar,
  Star,
  TrendingUp,
  Flower2,
} from "lucide-react";

export default function Dashboard({
  tasks,
  points,
  streak,
  placedItems,
  setView,
}) {
  const today = getTodayString();
  const todaysTasks = tasks.filter(
    (t) => t.type === "daily" || (t.type === "once" && !t.archived),
  );
  const completedToday = tasks.filter(
    (t) =>
      (t.type === "daily" && t.completedDates.includes(today)) ||
      (t.type === "once" && t.archived),
  );

  const gardenProgress = Math.min(100, (placedItems.length / 20) * 100); // 20 items = 100%

  return (
    <div className="space-y-6">
      <h2 className="font-pixel text-lg text-earth-dark dark:text-sky-light mb-4">
        Dashboard
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Calendar}
          label="Today's Tasks"
          value={todaysTasks.length}
        />
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={completedToday.length}
        />
        <StatCard icon={Star} label="Nature Pts" value={points} />
        <StatCard icon={TrendingUp} label="Streak" value={`${streak}🔥`} />
      </div>

      {/* Garden Snapshot */}
      <div className="pixel-card flex flex-col items-center">
        <h3 className="font-pixel text-xs mb-4">Garden Preview</h3>
        <div className="w-full h-32 bg-nature-dark/30 border-2 border-earth-dark dark:border-earth-light grid grid-cols-5 gap-1 p-2 overflow-hidden relative">
          {placedItems.slice(0, 10).map((item) => {
            const art = gardenItems.find((g) => g.id === item.itemId)?.art;
            return (
              <div
                key={item.instanceId}
                className="flex items-end justify-center"
              >
                {art && <PixelArt size={24}>{art}</PixelArt>}
              </div>
            );
          })}
          {placedItems.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-earth-dark/50 dark:text-sky-light/50 font-sans">
              Your garden is empty. Visit the shop!
            </div>
          )}
        </div>
        <button
          onClick={() => setView("garden")}
          className="pixel-btn mt-4 flex items-center gap-2"
        >
          <Flower2 className="w-4 h-4" /> View Full Garden
        </button>
      </div>

      {/* Progress Bar */}
      <div className="pixel-card">
        <h3 className="font-pixel text-xs mb-2">Garden Progress</h3>
        <div className="w-full bg-earth-dark/20 h-4 border-2 border-earth-dark dark:border-earth-light">
          <div
            className="h-full bg-nature-light transition-all duration-500"
            style={{ width: `${gardenProgress}%` }}
          ></div>
        </div>
        <p className="font-sans text-sm mt-2">
          {placedItems.length} / 20 Decorations Placed
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="pixel-card flex flex-col items-center justify-center text-center">
      <Icon className="w-6 h-6 mb-2 text-nature-dark dark:text-nature-light" />
      <span className="block font-pixel text-lg">{value}</span>
      <span className="block font-sans text-sm mt-1">{label}</span>
    </div>
  );
}
