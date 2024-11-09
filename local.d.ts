export {};

declare global {
  interface mongoose {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  }
}
