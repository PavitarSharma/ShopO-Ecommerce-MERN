import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Best Selling",
    url: "/best-selling",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "FAQ",
    url: "/faqs",
  },
];

interface NavLinksProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isMobile, onClose }) => {
  const { pathname } = useLocation();

  return (
    <>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex items-center" key={index}>
            <Link
              onClick={isMobile ? onClose : undefined}
              to={i.url}
              className={`${
                pathname === i.url ? "text-[#17dd1f]" : "md:text-black"
              }   font-[500] px-4 cursor-pointer whitespace-nowrap`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </>
  );
};

export default NavLinks;
