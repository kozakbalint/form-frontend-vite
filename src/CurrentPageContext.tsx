import { createContext, useState } from "react";
import { Pages } from "./Pages";

interface PageContextType {
    currentPage: Pages;
    setCurrentPage: (page: Pages) => void;
}

export const PageContext = createContext<PageContextType | undefined>(
    undefined
);

interface PageProviderProps {
    children: React.ReactNode;
}

const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
    const [currentPage, setPage] = useState<Pages>(Pages.Datasets);

    const setCurrentPage = (page: Pages) => {
        setPage(page);
    };

    return (
        <PageContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </PageContext.Provider>
    );
};

export default PageProvider;
