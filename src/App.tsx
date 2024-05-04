import Container from "./Container";
import PageProvider from "./CurrentPageContext";
import DatasetsProvider from "./DatasetsContext";
import NavBar from "./NavBar";

const App: React.FC = () => {
    return (
        <>
            <PageProvider>
                <DatasetsProvider>
                    <NavBar />
                    <Container />
                </DatasetsProvider>
            </PageProvider>
        </>
    );
};

export default App;
