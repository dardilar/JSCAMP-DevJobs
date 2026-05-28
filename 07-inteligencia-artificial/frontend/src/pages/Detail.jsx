import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "../components/Link";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAISummary } from "../hooks/useAISummary";

import snarkdown from "snarkdown";
import { Streamdown } from "streamdown";
import styles from "./Detail.module.css";

const API_URL = import.meta.env.VITE_API_URL;

function JobSection({ title, content }) {
  const html = snarkdown(content);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </section>
  );
}

function DetailPageBreadcrumb({ job }) {
  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link href="/search" className={styles.breadcrumbButton}>
          Empleos
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
      </nav>
    </div>
  );
}

function DetailPageHeader({ job, onGenerateSummary, summaryLoading }) {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>{job.titulo}</h1>
        <p className={styles.meta}>
          {job.empresa} · {job.ubicacion}
        </p>
      </div>

      <div className={styles.actions}>
        <DetailApplyButton />
        <DetailFavoriteButton jobId={job.id} />
        <button
          onClick={onGenerateSummary}
          disabled={summaryLoading}
          className={styles.aiSummaryButton}
        >
          {summaryLoading ? "Generando..." : "Generar resumen"}
        </button>
      </div>
    </header>
  );
}

function DetailApplyButton() {
  const { isLoogedIn } = useAuthStore();
  const [isApplied, setIsApplied] = useState(false);

  const buttonText = !isLoogedIn
    ? "Inicia sesión para aplicar"
    : isApplied
      ? "Aplicado"
      : "Aplicar ahora";
  const buttonClass = isApplied
    ? `${styles.applyButton} ${styles.isApplied}`
    : styles.applyButton;

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  return (
    <button
      disabled={!isLoogedIn}
      className={buttonClass}
      onClick={handleApplyClick}
    >
      {buttonText}
    </button>
  );
}

function DetailFavoriteButton({ jobId }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  return (
    <button
      onClick={() => toggleFavorite(jobId)}
      aria-label={
        isFavorite(jobId) ? "Quitar de favoritos" : "Agregar a favoritos"
      }
    >
      {isFavorite(jobId) ? "♥️" : "🤍"}
    </button>
  );
}

export default function JobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { summary, loading: summaryLoading, generateSummary } = useAISummary(jobId);

  useEffect(() => {
    fetch(`${API_URL}/jobs/${jobId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Job not found");
        }
        return response.json();
      })
      .then((data) => setJob(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.loading}>
          <p className={styles.loadingText}>Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Oferta no encontrada</h2>
          <button onClick={() => navigate("/")} className={styles.errorButton}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <DetailPageBreadcrumb job={job} />
        <DetailPageHeader
          job={job}
          onGenerateSummary={generateSummary}
          summaryLoading={summaryLoading}
        />

        {summary && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Resumen con IA ✨</h2>
            <div className={styles.sectionContent}>
              <Streamdown isAnimating={summaryLoading}>{summary}</Streamdown>
            </div>
          </section>
        )}

        <JobSection
          title="Descripción del puesto"
          content={job.content.description}
        />
        <JobSection
          title="Responsabilidades"
          content={job.content.responsibilities}
        />
        <JobSection title="Requisitos" content={job.content.requirements} />
        <JobSection title="Acerca de la empresa" content={job.content.about} />
        <DetailApplyButton />
      </div>
    </>
  );
}
