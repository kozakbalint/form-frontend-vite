import { createContext, useEffect, useState } from "react";

export interface Dataset {
    isActive: boolean;
    name: string;
    firstNum: number;
    secondNum: number;
    thirdNum: number;
}

interface DatasetsContextType {
    datasets: Array<Dataset>;
    addDataset: (datasets: Dataset) => void;
    removeDataset: (name: string) => void;
    updateDatasetSatus: (name: string) => void;
}

export const DatasetContext = createContext<DatasetsContextType | undefined>(
    undefined
);

interface DatasetProviderProps {
    children: React.ReactNode;
}

const DatasetsProvider: React.FC<DatasetProviderProps> = ({ children }) => {
    const initialValue = localStorage.getItem("DatasetsContextData");
    const [datasets, setDatasets] = useState<Dataset[]>(
        initialValue ? JSON.parse(initialValue) : []
    );

    const addDataset = (dataset: Dataset) => {
        const exsitingDatasetIndex = datasets.findIndex(
            (d) => d.name === dataset.name
        );
        if (exsitingDatasetIndex !== -1) {
            setDatasets((prevDatasets) => {
                const updatesDatasets = [...prevDatasets];
                updatesDatasets[exsitingDatasetIndex] = dataset;
                return updatesDatasets;
            });
        } else {
            setDatasets((prevDatasets) => [...prevDatasets, dataset]);
        }
    };

    const removeDataset = (name: string) => {
        setDatasets((prevDatasets) =>
            prevDatasets.filter((dataset) => dataset.name !== name)
        );
    };

    const updateDatasetSatus = (name: string) => {
        setDatasets((prevDatasets) =>
            prevDatasets.map((dataset) => {
                if (dataset.name === name) {
                    return { ...dataset, isActive: !dataset.isActive };
                }
                return dataset;
            })
        );
    };

    useEffect(() => {
        const storedData = localStorage.getItem("DatasetsContextData");
        if (storedData) {
            setDatasets(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("DatasetsContextData", JSON.stringify(datasets));
    }, [datasets]);

    return (
        <DatasetContext.Provider
            value={{ datasets, addDataset, removeDataset, updateDatasetSatus }}
        >
            {children}
        </DatasetContext.Provider>
    );
};

export default DatasetsProvider;
