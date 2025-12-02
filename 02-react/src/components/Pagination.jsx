import styles from '../components/Pagination.module.css';

export function Pagination({ currentPage = 1, totalPages = 5, onPageChange }) {

  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const styleLeftBtn = isFirstPage ? { opacity: 0.5, pointerEvents: 'none' } : {};
  const styleRightBtn = isLastPage ? { opacity: 0.5, pointerEvents: 'none' } : {};

  const handlePrevClick = function(e) {
    e.preventDefault();

    if (isFirstPage) return;
    onPageChange(currentPage - 1);
  }

  const handleNextClick = function(e) {
    e.preventDefault();

    if (isLastPage) return;
    onPageChange(currentPage + 1);
  }

  const handleChangePage = function(e, page) {
    e.preventDefault();

    if (page !== currentPage) onPageChange(page);
  }

  return (
    <>
      <nav className={styles.pagination}>
        <a href="#" className={`${styles.slider__btn} ${styles['slider__btn--left']}`} style={styleLeftBtn} onClick={handlePrevClick}></a>

        <ul className={styles.pagination__list}>
          {pages.map((page) => {
            return (
              <li key={page}>
                <a  href="#" className={`${styles.page} ${page === currentPage ? styles.active : ''}`} onClick={(e) => handleChangePage(e, page)}>{page}</a>
              </li>
            )
          })}
        </ul>

        <a href="#" className={`${styles.slider__btn} ${styles['slider__btn--right']}`} style={styleRightBtn} onClick={handleNextClick}></a>
      </nav>
    </>
  );
}