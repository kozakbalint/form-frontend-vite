import NavButton from "./NavButton";
import { Pages } from "./Pages";

const NavBar: React.FC = () => {
    return (
        <>
            <nav className="flex h-12 w-full items-end justify-center gap-5 bg-gray-200">
                <NavButton page={Pages.Datasets} />
                <NavButton page={Pages.Scores} />
                <NavButton page={Pages.Test} />
            </nav>
        </>
    );
};

export default NavBar;
