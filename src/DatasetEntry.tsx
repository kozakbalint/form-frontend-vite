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
            <td className="border border-gray-300 p-2">
                <button
                    onClick={() => removeDataset(dataSet.name)}
                    className="h-6 w-6 rounded-md bg-red-600 text-white"
                >
                    X
                </button>
            </td>
            <td className="border border-gray-300 p-2">{dataSet.name}</td>
            <td className="border border-gray-300 p-2">{dataSet.firstNum}</td>
            <td className="border border-gray-300 p-2">{dataSet.secondNum}</td>
            <td className="border border-gray-300 p-2">{dataSet.thirdNum}</td>
            <td className="border border-gray-300 p-2 align-middle">
                {dataSet.isActive ? (
                    <input
                        type="checkbox"
                        id={dataSet.name + "-isActive"}
                        checked
                        onChange={() => updateDatasetSatus(dataSet.name)}
                        className="m-0 mt-2 h-5 w-5 cursor-pointer"
                    ></input>
                ) : (
                    <input
                        type="checkbox"
                        id={dataSet.name + "-isActive"}
                        onChange={() => updateDatasetSatus(dataSet.name)}
                        className="m-0 mt-2 h-5 w-5 cursor-pointer"
                    ></input>
                )}
            </td>
        </tr>
    );
};

export default DatasetEntry;
