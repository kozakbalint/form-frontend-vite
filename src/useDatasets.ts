import { useContext } from "react";
import { DatasetContext } from "./DatasetsContext";

const useDatasets = () => {
    const context = useContext(DatasetContext);
    if (!context) {
        throw new Error("useDatasets must be used within a DatasetProvider");
    }
    return context;
};

export default useDatasets;
