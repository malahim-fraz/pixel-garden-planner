import React from "react";
import PixelArt from "./PixelArt";
import { getItemById } from "../data/gardenItems";
import { Store, Trash2 } from "lucide-react";

export default function GardenView({ placedItems, removePlacedItem, setView }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-pixel text-lg text-earth-dark dark:text-sky-light">
          Your Garden
        </h2>
        <button
          onClick={() => setView("shop")}
          className="pixel-btn flex items-center gap-2"
        >
          <Store className="w-4 h-4" /> Shop
        </button>
      </div>

      <div className="pixel-card">
        <div className="w-full h-[400px] bg-nature-dark/20 border-2 border-earth-dark dark:border-earth-light grid grid-cols-4 md:grid-cols-6 gap-1 p-2 overflow-y-auto">
          {/* Render empty slots or placed items */}
          {Array.from({ length: 24 }).map((_, index) => {
            const item = placedItems[index];
            if (item) {
              const details = getItemById(item.itemId);
              return (
                <div
                  key={item.instanceId}
                  className="relative group flex items-end justify-center bg-nature-dark/10 border border-earth-dark/20"
                >
                  {details && <PixelArt size={40}>{details.art}</PixelArt>}
                  <button
                    onClick={() => removePlacedItem(item.instanceId)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              );
            }
            return (
              <div
                key={index}
                className="bg-nature-dark/5 border border-dashed border-earth-dark/20"
              ></div>
            );
          })}
        </div>
        <p className="font-sans text-sm mt-4 text-center">
          Hover over items to remove them.
        </p>
      </div>
    </div>
  );
}
