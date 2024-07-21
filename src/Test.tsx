import { useState } from "react";
import { ScoreTypes } from "./ScoreTypes";
import useDatasets from "./useDatasets";
import useScores from "./useScores";
import TestResult from "./TestResult";

interface TestResponse {
    inconsistency: boolean;
    [key: string]: string | number | boolean | undefined;
}

const Test: React.FC = () => {
    const url: string = import.meta.env.VITE_API_ENDPOINT;
    const { datasets } = useDatasets();
    const { scores } = useScores();
    const [response, setResponse] = useState<TestResponse>();

    const dEntries = datasets.filter((dataset) => dataset.isActive);

    const defaultSEntries = Object.values(ScoreTypes).map((type) => ({
        scoreType: type,
        scoreValue: -1,
    }));
    const sEntries = defaultSEntries.map((obj) => {
        const foundScore = scores.find((score) => score.name === obj.scoreType);
        if (foundScore) {
            return { ...obj, scoreValue: foundScore.value };
        }
        return obj;
    });
    const jsonData = {
        dEntries: dEntries,
        sEntries: sEntries,
    };

    const handleClick = async () => {
        const encodedData = btoa(JSON.stringify(jsonData));
        const urlParams = new URLSearchParams();
        urlParams.append("data", encodedData);

        try {
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                body: urlParams,
            });
            if (response.ok) {
                console.log("Successful request.");
            }
            const responseData = await response.json();
            const validJSON = responseData
                .replaceAll("'", '"')
                .replaceAll("(", "[")
                .replaceAll(")", "]")
                .replaceAll("None", '"none"')
                .replaceAll("True", "true")
                .replaceAll("False", "false");
            console.log(validJSON);
            setResponse(JSON.parse(validJSON));
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <main className="flex flex-col items-center gap-12 pt-4">
            <div className="w-11/12 self-center md:w-3/4">
                <button
                    onClick={handleClick}
                    className="w-fit rounded bg-green-600 p-2 text-white hover:bg-green-400"
                >
                    Run Test
                </button>
            </div>
            <div className="w-11/12 md:w-3/4">
                {response ? (
                    <div>
                        {response.inconsistency ? (
                            <div>
                                <TestResult msg="Test succeed!" />
                                <div>
                                    <textarea
                                        readOnly
                                        className="w-full bg-gray-100"
                                        rows={20}
                                        value={JSON.stringify(
                                            response,
                                            null,
                                            2
                                        )}
                                    ></textarea>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <TestResult msg="Test failed!" />
                                <div>
                                    <textarea
                                        readOnly
                                        className="w-full bg-gray-100"
                                        rows={20}
                                        value={JSON.stringify(
                                            response,
                                            null,
                                            2
                                        )}
                                    ></textarea>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        </main>
    );
};

export default Test;
