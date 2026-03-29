import { useState, useCallback } from "react";
import { GameState, Player } from "../types";
import { computeScore } from "../utils/scoring";

const initialPlayer = (id: number, name: string): Player => ({
  id,
  name,
  word: "",
  score: 0,
  isWinner: false,
});

export const useScrabble = () => {
  const [gameState, setGameState] = useState<GameState>({
    player1: initialPlayer(1, "Player 1"),
    player2: initialPlayer(2, "Player 2"),
    loading: false,
    winnerMessage: null,
  });

  const updateWord = useCallback((playerId: number, word: string) => {
    const sanitizedWord = word.toUpperCase().replace(/[^A-Z]/g, "");
    const score = computeScore(sanitizedWord);

    setGameState((prev) => {
      const playerKey = playerId === 1 ? "player1" : "player2";
      return {
        ...prev,
        [playerKey]: {
          ...prev[playerKey],
          word: sanitizedWord,
          score,
          isWinner: false,
        },
        winnerMessage: null,
      };
    });
  }, []);

  const playGame = useCallback(async () => {
    const { player1, player2 } = gameState;

    if (!player1.word || !player2.word) {
      alert("Both players must enter a word!");
      return;
    }

    setGameState((prev) => ({ ...prev, loading: true, winnerMessage: null }));

    try {
      // Mocking the API call to /play
      // In a real app, this would be: await fetch('/play', { ... })
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const score1 = computeScore(player1.word);
      const score2 = computeScore(player2.word);

      let winnerMessage = "";
      let p1Winner = false;
      let p2Winner = false;

      if (score1 > score2) {
        winnerMessage = "Player 1 wins!";
        p1Winner = true;
      } else if (score2 > score1) {
        winnerMessage = "Player 2 wins!";
        p2Winner = true;
      } else {
        winnerMessage = "It's a tie!";
      }

      setGameState((prev) => ({
        ...prev,
        loading: false,
        winnerMessage,
        player1: { ...prev.player1, isWinner: p1Winner },
        player2: { ...prev.player2, isWinner: p2Winner },
      }));
    } catch (error) {
      console.error("Game error:", error);
      setGameState((prev) => ({ ...prev, loading: false }));
    }
  }, [gameState]);

  return { gameState, updateWord, playGame };
};
