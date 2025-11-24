"use client";

import { useAuth } from "@/app/providers/Auth/provider";

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>AdminPage</h1>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}
