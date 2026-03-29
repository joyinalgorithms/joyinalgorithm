export interface Player {
  id: number;
  name: string;
  word: string;
  score: number;
  isWinner: boolean;
}

export interface GameState {
  player1: Player;
  player2: Player;
  loading: boolean;
  winnerMessage: string | null;
}

export interface LetterPoint {
  letter: string;
  points: number;
}
