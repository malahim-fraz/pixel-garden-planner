import React from "react";

export default function PixelArt({ children, size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Background transparent */}
      {children}
    </svg>
  );
}
