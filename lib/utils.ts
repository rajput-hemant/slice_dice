/**
 * Validate environment variable
 * @param name - Environment variable name
 * @returns - Environment variable value
 */
export function validateEnv(name: string) {
  if (process.env[name]) {
    return process.env[name]!;
  }

  throw new Error(`"${name}" is not defined`);
}
