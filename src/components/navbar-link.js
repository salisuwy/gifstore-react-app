import { NavLink } from "react-router-dom";

const NavbarLink = (props) => {
  return (
    <NavLink
      to={props.href}
      className={`rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 ${props.cssClasses}`}
    >
      {props.text}
    </NavLink>
  );
};

export default NavbarLink;
