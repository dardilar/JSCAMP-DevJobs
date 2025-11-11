export default function Pagination() {
  return (
    <nav className="pagination">
      <button className="slider__btn slider__btn--left"></button>
      <ul className="pagination__list">
        <li>
          <button className="page page--1 active">1</button>
        </li>
        <li>
          <button className="page page--2">2</button>
        </li>
        <li>
          <button className="page page--3">3</button>
        </li>
        <li>
          <button className="page page--4">4</button>
        </li>
        <li>
          <button className="page page--5">5</button>
        </li>
      </ul>
      <button className="slider__btn slider__btn--right"></button>
    </nav>
  );
}
