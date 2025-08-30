import React from "react";

export default function Welcome({ name, goBack }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center min-w-[300px] max-w-[500px]">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Welcome, {name}!</h1>
      <p className="text-gray-500 mb-6">Your profile has been saved successfully.</p>
      <button
        onClick={goBack}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
}
