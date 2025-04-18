import { createContext, useContext, useState, ReactNode } from 'react';

interface UserDetails {
  id: string;
  full_name: string;
  email: string;
  // add other fields as needed
}

interface UserContextType {
  user: UserDetails | null;
  setUser: (user: UserDetails | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDetails | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 