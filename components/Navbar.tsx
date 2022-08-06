import Image from "next/image";
import { BsGithub } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className="h-12">
      <ul className="flex justify-end">
        <li>
          <a href="https://github.com/SeikiMatt/scale-helper">
            <BsGithub className="h-8 w-8 m-4" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
