import { NavLink } from "react-router";
import { Link } from "./Link";

export function Header() {
  return (
    <header>
      <Link to="/" style={ {textDecoration:'none'} }>
        <h1 style={ {color:'white'} }>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          DevJobs
        </h1>
      </Link>

      <nav>
        <NavLink className={({isActive}) => isActive ? 'nav-link-active' : ''} to="./">Inicio</NavLink>
        <NavLink className={({isActive}) => isActive ? 'nav-link-active' : ''} to="./search">Empleos</NavLink>
        <NavLink className={({isActive}) => isActive ? 'nav-link-active' : ''} to="./contact">Contacto</NavLink>
        <NavLink to="">Empresas</NavLink>
        <NavLink to="">Salarios</NavLink>
      </nav>
    </header>
  );
}
