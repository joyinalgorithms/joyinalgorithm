import { LetterPoint } from "../types";

export const POINTS: number[] = [
  1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10
];

export const ALPHABET: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const getLetterPoints = (char: string): number => {
  const upper = char.toUpperCase();
  if (upper >= "A" && upper <= "Z") {
    const index = upper.charCodeAt(0) - 65;
    return POINTS[index];
  }
  return 0;
};

export const computeScore = (word: string): number => {
  return word
    .toUpperCase()
    .split("")
    .reduce((acc, char) => acc + getLetterPoints(char), 0);
};

export const LETTER_VALUES: LetterPoint[] = ALPHABET.split("").map((letter, i) => ({
  letter,
  points: POINTS[i],
}));
