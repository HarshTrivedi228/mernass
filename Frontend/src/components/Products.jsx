import React from "react";
import { Link } from "react-router-dom";

export default function Products() {
  return (
    <div className="p-6">
      <p className="text-xl font-bold mb-4">This is Products Page</p>

      <Link 
        to="/" 
        className="underline text-blue-600 hover:text-blue-800"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}