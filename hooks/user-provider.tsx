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
}

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      console.log("userId: ", userId);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      console.log("here be data: ", data);

      if (error) {
        console.log("we have an error boss: ", error.message);
        setError(error.message);
      } else {
        setUser({
          id: userId,
          role: data == null ? "user" : (data?.role as "user" | "admin"),
        });
      }

      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
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
