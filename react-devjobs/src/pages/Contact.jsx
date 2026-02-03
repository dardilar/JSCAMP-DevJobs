import styles from "./Contact.module.css";
import { useContactForm } from "../hooks/useContactForm";

export function Contact() {
  const { contactForm, errors, handleTextChange, handleSubmit } =
    useContactForm();

  return (
    <main>
      <section className={styles.container}>
        <h1 className={styles.title}>Contacto</h1>
        <p className={styles.description}>
          Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className={styles.input}
              value={contactForm.name}
              onChange={handleTextChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              className={styles.input}
              value={contactForm.email}
              onChange={handleTextChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+57 300 123 4567"
              pattern="[+]?[0-9\s\-()]+"
              className={styles.input}
              value={contactForm.phone}
              onChange={handleTextChange}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Send
          </button>
        </form>
      </section>
    </main>
  );
}
