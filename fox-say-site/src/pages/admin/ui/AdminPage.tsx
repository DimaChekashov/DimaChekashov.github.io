"use client";

import { useAuth } from "@/app/providers/Auth/provider";
import { Button } from "@/shared/ui/Button/Button";
import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const [postsCount, setPostsCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchPostsCount = async () => {
      try {
        const res = await fetch(`/api/posts`);
        if (!res.ok) return;
        const data = await res.json();
        if (mounted)
          setPostsCount(Array.isArray(data?.data) ? data.data.length : 0);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPostsCount();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="px-4 md:px-0">
      <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-4xl mx-auto mb-10 md:p-10">
        <Heading as="h1" className="mb-6">
          Панель администратора
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
              {user?.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.displayName || user.username}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              ) : (
                <div className="text-xl font-bold">
                  {(user?.displayName || user?.username || "?").slice(0, 1)}
                </div>
              )}
            </div>

            <div className="text-center md:text-left">
              <Heading as="h2" className="text-xl mb-1">
                {user?.displayName || user?.username}
              </Heading>
              <Text className="text-sm text-muted">{user?.email}</Text>
            </div>

            <div className="flex gap-3 mt-3">
              <Button type="danger" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-card rounded-lg text-center">
                <Text className="text-sm text-muted">Постов</Text>
                <Heading as="h3" className="mt-2">
                  {postsCount ?? "—"}
                </Heading>
              </div>

              <div className="p-4 bg-card rounded-lg text-center">
                <Text className="text-sm text-muted">Роль</Text>
                <Heading as="h3" className="mt-2">
                  {user?.role}
                </Heading>
              </div>

              <div className="p-4 bg-card rounded-lg text-center">
                <Text className="text-sm text-muted">Активность</Text>
                <Heading as="h3" className="mt-2">
                  {user?.isActive ? "Активен" : "Неактивен"}
                </Heading>
              </div>
            </div>

            <div className="p-4 bg-card rounded-lg">
              <Heading as="h3" className="mb-2">
                О пользователе
              </Heading>
              <Text className="text-sm">
                {user?.bio || "Информация не указана."}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
