export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const roundToTens = (n: number) => Math.floor(n / 10) * 10;
