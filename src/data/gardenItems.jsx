// Using SVG paths to generate original pixel art
// Each item is a 32x32 conceptual grid represented by SVG rects

export const gardenItems = [
  {
    id: "sprout",
    name: "Sprout",
    cost: 10,
    art: (
      <g>
        <rect x="14" y="20" width="4" height="8" fill="#3a5e26" />
        <rect x="8" y="14" width="6" height="4" fill="#5e8b3d" />
        <rect x="18" y="12" width="6" height="4" fill="#5e8b3d" />
        <rect x="12" y="10" width="8" height="4" fill="#8fbc8f" />
      </g>
    ),
  },
  {
    id: "flower_red",
    name: "Red Flower",
    cost: 20,
    art: (
      <g>
        <rect x="14" y="18" width="4" height="10" fill="#3a5e26" />
        <rect x="10" y="16" width="4" height="2" fill="#3a5e26" />
        <rect x="10" y="10" width="12" height="8" fill="#ef4444" />
        <rect x="14" y="12" width="4" height="4" fill="#f59e0b" />
      </g>
    ),
  },
  {
    id: "flower_blue",
    name: "Blue Flower",
    cost: 20,
    art: (
      <g>
        <rect x="14" y="18" width="4" height="10" fill="#3a5e26" />
        <rect x="18" y="16" width="4" height="2" fill="#3a5e26" />
        <rect x="10" y="10" width="12" height="8" fill="#3b82f6" />
        <rect x="14" y="12" width="4" height="4" fill="#f59e0b" />
      </g>
    ),
  },
  {
    id: "bush",
    name: "Bush",
    cost: 30,
    art: (
      <g>
        <rect x="8" y="16" width="16" height="12" fill="#3a5e26" />
        <rect x="6" y="18" width="20" height="8" fill="#5e8b3d" />
        <rect x="10" y="14" width="4" height="4" fill="#8fbc8f" />
        <rect x="18" y="14" width="4" height="4" fill="#8fbc8f" />
      </g>
    ),
  },
  {
    id: "tree",
    name: "Tree",
    cost: 50,
    art: (
      <g>
        <rect x="14" y="20" width="4" height="8" fill="#6b4423" />
        <rect x="6" y="8" width="20" height="14" fill="#3a5e26" />
        <rect x="4" y="12" width="24" height="8" fill="#5e8b3d" />
        <rect x="8" y="6" width="6" height="6" fill="#8fbc8f" />
        <rect x="18" y="6" width="6" height="6" fill="#8fbc8f" />
      </g>
    ),
  },
  {
    id: "mushroom",
    name: "Mushroom",
    cost: 25,
    art: (
      <g>
        <rect x="12" y="18" width="8" height="10" fill="#f3f4f6" />
        <rect x="8" y="10" width="16" height="8" fill="#dc2626" />
        <rect x="10" y="12" width="2" height="2" fill="#f3f4f6" />
        <rect x="18" y="14" width="2" height="2" fill="#f3f4f6" />
      </g>
    ),
  },
  {
    id: "rock",
    name: "Rock",
    cost: 15,
    art: (
      <g>
        <rect x="8" y="18" width="16" height="10" fill="#6b7280" />
        <rect x="6" y="20" width="20" height="6" fill="#9ca3af" />
        <rect x="10" y="16" width="8" height="2" fill="#9ca3af" />
      </g>
    ),
  },
  {
    id: "pond",
    name: "Pond",
    cost: 40,
    art: (
      <g>
        <rect x="4" y="20" width="24" height="8" fill="#1d4ed8" />
        <rect x="6" y="18" width="20" height="2" fill="#3b82f6" />
        <rect x="10" y="24" width="4" height="2" fill="#60a5fa" />
        <rect x="18" y="22" width="4" height="2" fill="#60a5fa" />
      </g>
    ),
  },
];

export function getItemById(id) {
  return gardenItems.find((item) => item.id === id);
}
