import { createContext, useState } from "react";
import { ScoreTypes } from "./ScoreTypes";

export interface Scores {
    name: ScoreTypes;
    value: number;
}

interface ScoresContextType {
    scores: Array<Scores>;
    addScore: (score: Scores) => void;
    removeScore: (name: string) => void;
}

export const ScoresContext = createContext<ScoresContextType | undefined>(
    undefined
);

interface ScoreProviderProps {
    children: React.ReactNode;
}

const ScoresProvider: React.FC<ScoreProviderProps> = ({ children }) => {
    const [scores, setScores] = useState<Scores[]>([]);

    const addScore = (score: Scores) => {
        const exsitingScoreIndex = scores.findIndex(
            (d) => d.name === score.name
        );
        if (exsitingScoreIndex !== -1) {
            setScores((prevScores) => {
                const updatesScores = [...prevScores];
                updatesScores[exsitingScoreIndex] = score;
                return updatesScores;
            });
        } else {
            setScores((prevScores) => [...prevScores, score]);
        }
    };

    const removeScore = (name: string) => {
        setScores((prevScores) =>
            prevScores.filter((score) => score.name !== name)
        );
    };

    return (
        <ScoresContext.Provider value={{ scores, addScore, removeScore }}>
            {children}
        </ScoresContext.Provider>
    );
};

export default ScoresProvider;
