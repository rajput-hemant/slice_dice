declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        email: string;
        username?: string | null;
        expires: Date;
      };
    }
  }
}

export {};
