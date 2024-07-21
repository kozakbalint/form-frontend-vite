import { Scores } from "./ScoresContext";
import useScores from "./useScores";

interface ScoreEntryProp {
    scores: Scores;
}

const ScoreEntry: React.FC<ScoreEntryProp> = (score) => {
    const { removeScore } = useScores();
    const scoreEntry = score.scores;
    return (
        <tr>
            <td className="border border-gray-300">
                <button
                    onClick={() => removeScore(scoreEntry.name)}
                    className="h-6 w-6 rounded-md bg-red-600 text-white"
                >
                    X
                </button>
            </td>
            <td className="border border-gray-300 p-2">{scoreEntry.name}</td>
            <td className="border border-gray-300 p-2">{scoreEntry.value}</td>
        </tr>
    );
};

export default ScoreEntry;
