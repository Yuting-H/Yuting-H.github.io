import { Link } from "react-router-dom";

const linkClasses =
  "mt-auto w-full border-t border-black p-2 text-center text-brand";

export default function ProjectCard({
  title,
  description,
  note,
  href,
  linkLabel,
  external = false,
}) {
  return (
    <div className="flex h-[300px] w-[max(20%,200px)] shrink-0 flex-col items-center rounded-2xl border-2 border-navy p-4 text-center">
      <p className="mb-auto w-full border-b border-gray-400 p-[1em] font-bold">
        {title}
      </p>
      <p className="w-4/5 grow">{description}</p>
      {note ? <p className="w-4/5">{note}</p> : null}
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={linkClasses}>
          {linkLabel}
        </a>
      ) : (
        <Link
          to={href}
          className={linkClasses}>
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
