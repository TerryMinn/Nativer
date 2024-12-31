export interface AuthStateI {
  user: {
    isAuth: boolean;
    profile: {
      picture: string | null;
      username: string | null;
    };
  };
}

export interface AuthActionI {
  setUser: (user: AuthStateI["user"]) => void;
  logout: () => void;
}

export interface AuthI extends AuthStateI, AuthActionI {}
