import { Link, Outlet, useLocation } from "react-router-dom";
import {
  ArrowLeftIcon,
  GitHubIcon,
  LinkedInIcon,
} from "./icons.jsx";

const GITHUB_URL = "https://github.com/Yuting-H";
const LINKEDIN_URL = "https://www.linkedin.com/in/yuting-hou-0x1a/";

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Project pages keep the slim white back bar the old header.js injected.
  if (!isHome) {
    return (
      <>
        <div className="sticky top-0 z-10 flex w-full items-center border-b border-gray-400 bg-white text-[max(4vh,20px)] shadow-[0_1px_2px_0_grey]">
          <Link
            to="/"
            aria-label="Back to home"
            className="ml-[5vw] py-1 text-dark-grey">
            <ArrowLeftIcon />
          </Link>
        </div>
        <Outlet />
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center gap-4 bg-navy p-4 pr-8 shadow-[0_-5px_10px_black]">
        <Link
          to="/"
          className="text-lg text-clear-blue">
          HOME
        </Link>
        <span className="ml-auto" />
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          className="text-clear-blue">
          <GitHubIcon className="size-8" />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
          className="text-clear-blue">
          <LinkedInIcon className="size-8" />
        </a>
      </header>
      <Outlet />
    </>
  );
}
