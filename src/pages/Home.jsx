import ProjectCard from "../components/ProjectCard.jsx";
import projects from "../data/projects.js";

export default function Home() {
  return (
    <>
      <section className="flex flex-col gap-4 bg-[rgb(237,240,251)] p-4 pl-[15vw]">
        <h2 className="text-2xl font-bold">I am:</h2>
        <ul className="m-4 flex flex-col gap-4 text-dark-grey">
          <li>In 4th year of University</li>
          <li>Passionate about programming</li>
          <li>
            Working through{" "}
            <a
              href="https://www.theodinproject.com"
              target="_blank"
              rel="noreferrer"
              className="text-brand"
            >
              The Odin Project
            </a>
          </li>
        </ul>
      </section>

      <section className="flex flex-col items-center justify-center bg-[linear-gradient(127deg,rgb(255,255,255)_0%,rgba(184,196,255,0.486)_50%,rgb(255,255,255)_100%)] p-4 text-center">
        <h3 className="text-xl text-dark-grey">Neat Things I coded:</h3>
      </section>

      <div className="flex flex-wrap items-stretch justify-center gap-4 p-4 shadow-[0_-10px_40px_white]">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      <div className="h-[100px] bg-white shadow-[0_0_100px_white]" />
    </>
  );
}
