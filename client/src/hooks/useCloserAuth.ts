import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useEffect } from "react";

export function useCloserAuth(requireAuth = true) {
  const { data: closer, isLoading, error } = trpc.closer.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !closer && requireAuth) {
      setLocation("/closer/login");
    }
  }, [closer, isLoading, requireAuth, setLocation]);

  return {
    closer,
    isLoading,
    error,
    isAuthenticated: !!closer,
    isAdmin: closer?.role === "admin",
  };
}
