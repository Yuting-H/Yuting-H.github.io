import { useState } from "react";

const TABS = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "about", label: "About" },
];

function TabContent({ tab }) {
  if (tab === "home") {
    return (
      <h1 className="text-4xl font-bold">
        Welcome to my Mock Restaurant Page
      </h1>
    );
  }

  if (tab === "menu") {
    return <h1 className="text-4xl font-bold">This is the menu page</h1>;
  }

  return (
    <div className="flex flex-col items-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold">This is the about page</h1>
      <p className="max-w-xl">
        The content of this webpage is written primary in Javascript; rather
        than putting everything in a html file, the Javascript files populate
        the content after the barebone html file is loaded
      </p>
    </div>
  );
}

export default function Restaurant() {
  const [tab, setTab] = useState("menu");

  return (
    <div className="flex flex-1 flex-col bg-[wheat]">
      <nav className="flex w-full justify-center gap-4 bg-[rgb(212,196,165)]">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-8 py-1 text-2xl hover:bg-[beige] active:bg-[whitesmoke] ${
              tab === id ? "bg-[beige]" : ""
            }`}>
            {label}
          </button>
        ))}
      </nav>

      <div className="flex flex-1 justify-center pt-8">
        <TabContent tab={tab} />
      </div>
    </div>
  );
}
