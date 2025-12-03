import { useId } from "react";

export function SearchFormSection({ onSearch, onTextFilter }) {
  const idForm= useId();
  const idText= useId();
  const idTechnology= useId();
  const idLocation= useId();
  const idExperience= useId();

  const handleSubmit = function (e) {
    console.log('Form changed');
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);

    const filters = {
      search: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experience: formData.get(idExperience),
    }

    onSearch(filters);
  };

  const handleTextChange = function (e) {
    const text = e.target.value
    onTextFilter(text);
  };

  return (
    <>
      <section className="search">
        <h1>Encuentra tu próximo trabajo</h1>

        <p>Explora miles de oportunidades en el sector tecnológico.</p>
        <form
          className="search__form"
          action=""
          name={idForm}
          id="search__form"
          onChange={handleSubmit}
        >
          <div className="search__input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-search"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>

            <input
              type="text"
              name={idText}
              id="search"
              placeholder="Buscar trabajos, empresas o habilidades"
              onChange={handleTextChange}
            />
          </div>

          <div className="search__filters">
            <select name={idTechnology} className="filter__box" id="categoria">
              <option value="">Tecnología</option>
              <option value="react">React</option>
              <option value="node">Node.js</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="mobile">Mobile</option>
            </select>

            <select name={idLocation} className="filter__box" id="ubicacion">
              <option value="">Ubicación</option>
              <option value="remoto">Remoto</option>
              <option value="cdmx">Ciudad de México</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="bsas">Buenos Aires</option>
              <option value="barcelona">Barcelona</option>
              <option value="madrid">Madrid</option>
              <option value="valencia">Valencia</option>
              <option value="bogota">Bogotá</option>
              <option value="santiago">Santiago de Chile</option>
              <option value="monterrey">Monterrey</option>
              <option value="lima">Lima</option>
            </select>

            <select name={idExperience} className="filter__box" id="nivel">
              <option value="">Nivel de experiencia</option>
              <option value="junior">Junior</option>
              <option value="mid-level">Mid-level</option>
              <option value="senior">Senior</option>
            </select>
          </div>
        </form>
      </section>
    </>
  );
}