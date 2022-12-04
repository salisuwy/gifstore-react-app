import useData from "../hooks/use-data";
import { Link } from "react-router-dom";
import NavbarLink from "./navbar-link";
import constant from "../services/constant";
import { IconUser } from "./icons";
import { useState } from "react";
import Backdrop from "./backdrop";
import UpdateDialog from "./update-dialog";

const Navbar = () => {
  const { user, dispatch } = useData();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 lg:px-8">
          <div className="relative flex h-16 items-center">
            <div className="flex flex-1 items-center justify-start">
              <Link to="/dashboard" title="Gif Store App">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="block h-8 w-auto text-indigo-500"
                  alt="Take Home"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>
              </Link>
              <div className="ml-6 flex space-x-4">
                {user && (
                  <NavbarLink text="Dashboard" href="dashboard" cssClasses="" />
                )}
              </div>
            </div>
            <div className="right-0 flex">
              {user ? (
                <>
                  <button
                    onClick={() => setShowModal(true)}
                    className="mr-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300"
                  >
                    <IconUser cssClasses="h-10 w-10 text-white" />
                  </button>

                  <button
                    onClick={() => dispatch({ type: constant.LOGOUT_USER })}
                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavbarLink text="Login" href="login" cssClasses="" />
                  <NavbarLink text="Register" href="register" cssClasses="" />
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showModal && (
        <>
          <Backdrop onClick={() => setShowModal(false)} />
          <UpdateDialog onClose={() => setShowModal(false)} />
        </>
      )}
    </>
  );
};

export default Navbar;
