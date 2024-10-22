"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchPreferences {
  vibe: string;
  groupSize: string;
  timeOfDay: string;
  musicLevel: string;
  drinkingPreferences: string;
  cuisineType: string;
  budget: string;
  seatingPreference: string;
}

const initialPreferences: SearchPreferences = {
  vibe: "",
  groupSize: "",
  timeOfDay: "",
  musicLevel: "",
  drinkingPreferences: "",
  cuisineType: "",
  budget: "",
  seatingPreference: "",
};

export function SearchForm() {
  const router = useRouter();
  const [preferences, setPreferences] =
    useState<SearchPreferences>(initialPreferences);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert preferences to URL search params
    const params = new URLSearchParams();
    Object.entries(preferences).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    // Navigate to results page with search params
    router.push(`/restaurants?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Vibe Selection */}
      <div className="space-y-2">
        <label
          htmlFor="vibe"
          className="block text-sm font-medium text-gray-700"
        >
          Vibe
        </label>
        <select
          id="vibe"
          className="w-full p-2 border rounded-md"
          value={preferences.vibe}
          onChange={(e) =>
            setPreferences((prev) => ({
              ...prev,
              vibe: e.target.value,
            }))
          }
        >
          <option value="">Select a vibe...</option>
          <option value="casual">Casual</option>
          <option value="romantic">Romantic</option>
          <option value="trendy">Trendy</option>
          <option value="family-friendly">Family Friendly</option>
        </select>
      </div>

      {/* Group Size */}
      <div className="space-y-2">
        <label
          htmlFor="groupSize"
          className="block text-sm font-medium text-gray-700"
        >
          Group Size
        </label>
        <select
          id="groupSize"
          className="w-full p-2 border rounded-md"
          value={preferences.groupSize}
          onChange={(e) =>
            setPreferences((prev) => ({
              ...prev,
              groupSize: e.target.value,
            }))
          }
        >
          <option value="">Select group size...</option>
          <option value="1">Solo</option>
          <option value="2">Couple</option>
          <option value="3-6">Small Group (3-6)</option>
          <option value="7+">Large Group (7+)</option>
        </select>
      </div>

      {/* Add other form fields similarly */}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Find Restaurants
      </button>
    </form>
  );
}
