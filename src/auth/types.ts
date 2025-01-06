export type Session = {
  user?: {
    id?: string;
    name?: string;
    image?: string;
    email?: string;
  };
};

export type AuthData = {
  email: string;
  password: string;
};

export type AuthContextType = {
  session: Session | null;
  authentication: {
    signIn: ({ authData }: { authData: AuthData }) => void;
    signOut: () => void;
  };
};
