export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function waitFor(milliseconds: number = 1000): Promise<void> {
  return new Promise<void>((resolve) =>
    setTimeout(() => resolve(), milliseconds),
  );
}
