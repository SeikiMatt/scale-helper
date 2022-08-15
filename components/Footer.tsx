import { BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <footer>
      <a
        href="https://github.com/SeikiMatt/scale-helper"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsGithub className="h-8 w-8" />
      </a>
    </footer>
  );
}
