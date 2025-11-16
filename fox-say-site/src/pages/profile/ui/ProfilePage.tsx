import { formatDate, getCurrentDomain } from "@/shared/lib/utils";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;

  const response = await fetch(`${getCurrentDomain()}/api/users/${id}`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    return notFound();
  }

  const { data } = await response.json();

  const { username, displayName, email, bio, createdAt, isActive } = data;

  return (
    <div>
      <h1>User: {username}</h1>
      <p>Name: {displayName}</p>
      <p>Email: {email}</p>
      <p>Bio: {bio}</p>
      <p>Created At: {formatDate(createdAt)}</p>
      <p>Active: {isActive ? "Yes" : "No"}</p>
    </div>
  );
}
