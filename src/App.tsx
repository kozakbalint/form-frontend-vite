import PageProvider from "./CurrentPageContext";
import NavBar from "./NavBar";

const App: React.FC = () => {
    return (
        <>
            <PageProvider>
                <NavBar />
            </PageProvider>
        </>
    );
};

export default App;
