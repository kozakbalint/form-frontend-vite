import Container from "./Container";
import PageProvider from "./CurrentPageContext";
import DatasetsProvider from "./DatasetsContext";
import NavBar from "./NavBar";
import ScoresProvider from "./ScoresContext";

const App: React.FC = () => {
    return (
        <>
            <PageProvider>
                <DatasetsProvider>
                    <ScoresProvider>
                        <NavBar />
                        <Container />
                    </ScoresProvider>
                </DatasetsProvider>
            </PageProvider>
        </>
    );
};

export default App;
