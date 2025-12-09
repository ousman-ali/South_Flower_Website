"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white space-y-4">
      <div className="flex space-x-3">
        <div className="loader-bar bar-a"></div>
        <div className="loader-bar bar-b"></div>
        <div className="loader-bar bar-c"></div>
        <div className="loader-bar bar-d"></div>
        <div className="loader-bar bar-e"></div>
      </div>

      <div>
        <span className="loading-text-shimmer">
          South Flower Trading PLC ...
        </span>
      </div>
    </div>
  );
}
