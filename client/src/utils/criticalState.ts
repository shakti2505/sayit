import { useState, useEffect } from "react";


export const useUser = () => {
  const [user, setUser] = useState<{ name: string; image: string ; token:string; } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null); // Ensure state is null if no user is found
    }
  }, []);

  return user || { name: undefined, image: undefined , token:undefined}; // Return undefined while loading
};
