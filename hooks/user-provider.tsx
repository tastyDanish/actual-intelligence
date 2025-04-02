"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { createClient } from "@/utils/supabase/client";

interface UserProfile {
  id: string;
  role: string;
  name: string;
}

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  userId,
  children,
}: {
  userId: string;
  children: ReactNode;
}) => {
  const supabase = createClient();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, role")
        .eq("id", userId)
        .single();

      if (error) {
        setUser({
          id: userId,
          role: "user",
          name: "unknown-user",
        });
      } else {
        setUser({
          id: userId,
          role: data == null ? "user" : (data?.role as "user" | "admin"),
          name: data?.display_name ?? "unknown-user",
        });
      }

      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
