import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FiHome, FiBox, FiEdit, FiMenu } from 'react-icons/fi';

const Navigation: React.FC = () => {
  const config = useSelector((state: RootState) => state.config);
  const [isOpen, setIsOpen] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div>
      <nav
        className="bg-gray-200 p-4 flex items-center justify-between"
        style={{ backgroundColor: config.mainColor }}
      >
        <div className="flex items-center">
          {config.logo && (
            <img
              src={config.logo}
              alt="Innoloft Logo"
              className="h-5 w-auto mr-4"
            />
          )}
          <h1 className="text-white text-xl font-semibold sm:text-2xl md:text-3xl">
            Innoloft Dashboard
          </h1>
        </div>
        <div className="flex items-center">
          <button
            className="text-white hover:underline sm:hidden"
            onClick={toggleMenu}
          >
            <FiMenu size="1.5em" />
          </button>
          <ul
            className={`hidden sm:flex items-center ${
              isOpen ? 'block' : 'hidden'
            } transition-all duration-300`}
          >
            <li className="mr-10">
              <Link
                to="/"
                className="text-white hover:underline"
                style={{ textDecorationColor: 'yellow' }}
                onClick={() => setIsOpen(false)}
              >
                <FiHome size="1.5em" />
              </Link>
            </li>
            <li className="mr-10">
              <Link
                to="/product"
                className="text-white hover:underline"
                style={{ textDecorationColor: 'yellow' }}
                onClick={() => setIsOpen(false)}
              >
                <FiBox size="1.5em" />
              </Link>
            </li>
            <li>
              <Link
                to="/product/edit"
                className="text-white hover:underline"
                style={{ textDecorationColor: 'yellow' }}
                onClick={() => setIsOpen(false)}
              >
                <FiEdit size="1.5em" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className={`fixed z-10 top-0 left-0 h-full w-64 bg-yellow-500 transition-all duration-300 transform ${
          isSideNavOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:hidden`}
      >
        <ul className="flex flex-col items-start p-4">
          <li className="mb-4">
            <Link
              to="/"
              className="text-white hover:underline"
              style={{ textDecorationColor: 'yellow' }}
              onClick={() => {
                setIsOpen(false);
                setIsSideNavOpen(false);
              }}
            >
              <FiHome size="1.5em" className="inline-block mr-2" />
              Main Page
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/product"
              className="text-white hover:underline"
              style={{ textDecorationColor: 'yellow' }}
              onClick={() => {
                setIsOpen(false);
                setIsSideNavOpen(false);
              }}
            >
              <FiBox size="1.5em" className="inline-block mr-2" />
              Product
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/product/edit"
              className="text-white hover:underline"
              style={{ textDecorationColor: 'yellow' }}
              onClick={() => {
                setIsOpen(false);
                setIsSideNavOpen(false);
              }}
            >
              <FiEdit size="1.5em" className="inline-block mr-2" />
              Edit Product
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;

