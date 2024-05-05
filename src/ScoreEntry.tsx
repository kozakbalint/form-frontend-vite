import { Scores } from "./ScoresContext";
import useScores from "./useScores";

interface ScoreEntryProp {
    scores: Scores;
}

const ScoreEntry: React.FC<ScoreEntryProp> = (score) => {
    const { removeScore, updateScoreSatus } = useScores();
    const scoreEntry = score.scores;
    return (
        <tr>
            <td className="border border-gray-300">
                <button
                    onClick={() => removeScore(scoreEntry.name)}
                    className="rounded-md bg-red-600 px-2 text-white"
                >
                    X
                </button>
            </td>
            <td className="border border-gray-300">{scoreEntry.name}</td>
            <td className="border border-gray-300">{scoreEntry.value}</td>
            <td className="border border-gray-300">
                {scoreEntry.isActive ? (
                    <input
                        type="checkbox"
                        checked
                        onChange={() => updateScoreSatus(scoreEntry.name)}
                        className="cursor-pointer"
                    ></input>
                ) : (
                    <input
                        type="checkbox"
                        onChange={() => updateScoreSatus(scoreEntry.name)}
                        className="cursor-pointer"
                    ></input>
                )}
            </td>
        </tr>
    );
};

export default ScoreEntry;
