import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import logo from "../assets/images.png";

/**
 * Header component displays the header section of the website.
 * 
 * @returns {JSX.Element} - JSX element representing the Header component.
 */
const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-orange-500 flex px-4 py-2 items-center"
        >
          <img src={logo} alt="logo" className="w-24 h-auto"/>
          EatNow.com
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
