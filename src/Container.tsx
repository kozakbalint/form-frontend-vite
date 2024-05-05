import Datasets from "./Datasets";
import { Pages } from "./Pages";
import Scores from "./Scores";
import Test from "./Test";
import usePage from "./usePage";

const Container: React.FC = () => {
    const { currentPage } = usePage();

    switch (currentPage) {
        case Pages.Datasets:
            return <Datasets />;
        case Pages.Scores:
            return <Scores />;
        case Pages.Test:
            return <Test />;
    }
};

export default Container;
