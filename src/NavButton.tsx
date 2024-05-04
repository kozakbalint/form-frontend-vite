import { Pages } from "./Pages";
import usePage from "./usePage";

interface Page {
    page: Pages;
}

const NavButton: React.FC<Page> = ({ page }) => {
    const { currentPage, setCurrentPage } = usePage();
    return currentPage == page ? (
        <div
            onClick={() => setCurrentPage(page)}
            className="select-none rounded-b-sm border-b-[3px] border-b-green-600 text-center text-2xl text-green-600"
        >
            {page}
        </div>
    ) : (
        <div
            onClick={() => setCurrentPage(page)}
            className="select-none rounded-b-sm border-b-[3px] border-b-gray-200 text-center text-2xl hover:text-green-500"
        >
            {page}
        </div>
    );
};

export default NavButton;
