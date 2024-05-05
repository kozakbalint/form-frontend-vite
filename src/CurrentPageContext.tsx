import { createContext, useEffect, useState } from "react";
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
    const initialValue = localStorage.getItem("PageContextData");
    const [currentPage, setPage] = useState<Pages>(
        initialValue ? JSON.parse(initialValue) : Pages.Datasets
    );

    const setCurrentPage = (page: Pages) => {
        setPage(page);
    };

    useEffect(() => {
        const storedData = localStorage.getItem("PageContextData");
        if (storedData) {
            setPage(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("PageContextData", JSON.stringify(currentPage));
    }, [currentPage]);

    return (
        <PageContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </PageContext.Provider>
    );
};

export default PageProvider;
