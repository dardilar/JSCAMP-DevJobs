export function Header() {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="nav__container">
            <a className="logo" href="/">
              <svg
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="DevJobs logo"
                role="img"
              >
                <path
                  clipRule="evenodd"
                  d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                  fill="#1173D4"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span className="logo__text">DevJobs</span>
            </a>

            <ul className="nav__links">
              <li className="nav__item">
                <a className="nav__link" href="#">
                  Inicio
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="./resultados.html">
                  Empleos
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  Empresas
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#">
                  Salarios
                </a>
              </li>
            </ul>
          </div>

          <ul className="nav__links">
            <li className="nav__item">
              <a className="nav__link--btn" href="#">
                Subir CV
              </a>
            </li>
            <li className="nav__item">
              <button
                className="nav__profile-btn"
                aria-label="Abrir menu de perfil"
              >
                <devjobs-avatar
                  service="github"
                  username="dardilar"
                  size="40"
                ></devjobs-avatar>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
