"use client";

import { useAuth } from "@/app/providers/Auth/provider";

export default function AdminPage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>AdminPage</h1>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 cursor-pointer py-2 px-4 bg-red-500 text-white"
      >
        Logout
      </button>
    </div>
  );
}
