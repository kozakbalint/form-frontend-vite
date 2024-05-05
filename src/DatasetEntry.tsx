import { Dataset } from "./DatasetsContext";
import useDatasets from "./useDatasets";

interface DatasetEntryProp {
    dataset: Dataset;
}

const DatasetEntry: React.FC<DatasetEntryProp> = (dataset) => {
    const { removeDataset, updateDatasetSatus } = useDatasets();
    const dataSet = dataset.dataset;
    return (
        <tr>
            <td className="border border-gray-300">
                <button
                    onClick={() => removeDataset(dataSet.name)}
                    className="rounded-md bg-red-600 px-2 text-white"
                >
                    X
                </button>
            </td>
            <td className="border border-gray-300">{dataSet.name}</td>
            <td className="border border-gray-300">{dataSet.firstNum}</td>
            <td className="border border-gray-300">{dataSet.secondNum}</td>
            <td className="border border-gray-300">{dataSet.thirdNum}</td>
            <td className="border border-gray-300">
                {dataSet.isActive ? (
                    <input
                        type="checkbox"
                        checked
                        onChange={() => updateDatasetSatus(dataSet.name)}
                        className="cursor-pointer"
                    ></input>
                ) : (
                    <input
                        type="checkbox"
                        onChange={() => updateDatasetSatus(dataSet.name)}
                        className="cursor-pointer"
                    ></input>
                )}
            </td>
        </tr>
    );
};

export default DatasetEntry;
