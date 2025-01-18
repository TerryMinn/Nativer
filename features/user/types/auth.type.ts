export interface AuthStateI {
  session: {
    isAuth: boolean;
    token: string | undefined;
    profile: {
      picture: string | undefined;
      username: string | undefined;
      email: string | undefined;
      created_at: string | undefined;
    };
  };
}

export interface AuthActionI {
  setSession: (session: AuthStateI["session"]) => void;
  logout: () => void;
}

export interface AuthI extends AuthStateI, AuthActionI {}
