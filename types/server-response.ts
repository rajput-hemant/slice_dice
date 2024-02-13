export type ServerResponse<T = unknown> =
  | {
      status: "SUCCESS" | "WARNING" | "INFO";
      message: string;
      data: T;
    }
  | {
      status: "FAILED" | "ERROR";
      message: string;
      error: T;
    };
