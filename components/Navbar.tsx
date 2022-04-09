import Image from "next/image";
import { BsGithub } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className={""}>
      <ul>
        <li>
          <a href="#">
            <BsGithub />
          </a>
        </li>
      </ul>
    </nav>
  );
}
