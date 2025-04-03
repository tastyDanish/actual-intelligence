"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { createClient } from "@/utils/supabase/client";
import {
  insertProfile,
  updateProfile,
} from "@/utils/supabase/profiles/profile-repo";

export type Avatar = {
  name: string | null;
  hat: string | null;
};

interface UserProfile {
  id: string;
  role: string;
  name: string;
  avatar: Avatar;
}

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  updateAvatar: (avatar: Avatar) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  userId,
  displayName,
  children,
}: {
  userId: string;
  displayName: string;
  children: ReactNode;
}) => {
  const supabase = createClient();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("id, display_name, role, avatar, hat")
      .eq("id", userId)
      .single();

    if (error) {
      const newUser = await insertProfile({
        supabase,
        id: userId,
        displayName,
      });
      if (newUser)
        setUser({
          id: newUser.id,
          role: newUser.role,
          name: newUser.display_name,
          avatar: {
            name: newUser?.avatar,
            hat: newUser?.hat,
          },
        });
    } else {
      setUser({
        id: userId,
        role: data == null ? "user" : (data?.role as "user" | "admin"),
        name: data?.display_name ?? "unknown-user",
        avatar: {
          name: data?.avatar,
          hat: data?.hat,
        },
      });
    }

    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetchUser();
  }, [userId]);

  const updateAvatar = async (avatar: Avatar) => {
    setLoading(true);
    const data = await updateProfile({
      supabase,
      userId,
      avatar,
    });
    if (data && user) {
      setUser({ ...user, avatar: { name: data.avatar, hat: data.hat } });
    }
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateAvatar }}>
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
