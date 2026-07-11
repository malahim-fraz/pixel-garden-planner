import React from "react";
import PixelArt from "./PixelArt";
import { gardenItems } from "../data/gardenItems";
import { Lock, Check, Plus } from "lucide-react";

export default function Shop({
  points,
  unlockedItems,
  buyItem,
  placeItem,
  setView,
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-pixel text-lg text-earth-dark dark:text-sky-light">
          Garden Shop
        </h2>
        <button onClick={() => setView("garden")} className="pixel-btn">
          Back to Garden
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols 3 lg:grid-cols-4 gap-4">
        {gardenItems.map((item) => {
          const isUnlocked = unlockedItems.includes(item.id);
          const canAfford = points >= item.cost;

          return (
            <div
              key={item.id}
              className="pixel-card flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 flex items-center justify-center bg-sky-light dark:bg-earth mb-4 border-2 border-earth-dark dark:border-earth-light">
                <PixelArt size={40}>{item.art}</PixelArt>
              </div>

              <h3 className="font-pixel text-[10px] mb-2 h-8 flex items-center">
                {item.name}
              </h3>

              <p className="font-sans text-sm mb-4">🌿 {item.cost} NP</p>

              {isUnlocked ? (
                <button
                  onClick={() => placeItem(item.id)}
                  className="pixel-btn w-full flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Place
                </button>
              ) : (
                <button
                  onClick={() => buyItem(item)}
                  disabled={!canAfford}
                  className={`pixel-btn w-full flex items-center justify-center gap-2 ${!canAfford ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {canAfford ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}{" "}
                  Unlock
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
