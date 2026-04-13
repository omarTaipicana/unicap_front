import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Link } from "react-router-dom";
import "./Styles/Ciccenic.css";
import IsLoading from "../shared/isLoading";

pdfjs.GlobalWorkerOptions.workerSrc = `../../../files/pdf.worker.min.js`;


const Cispnp = () => {
 const urlRegister = `${location.protocol}//${location.host}/#/register_discente/cispnp`;
  const urlPago = `${location.protocol}//${location.host}/#/register_pago/cispnp`;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingPdf, setLoadingPdf] = useState(true);

  const containerRef = useRef(null);
  const [pdfWidth, setPdfWidth] = useState(740);

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setPdfWidth(containerRef.current.offsetWidth - 28);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setLoadingPdf(false);
  }

  function goToPrevPage() {
    setPageNumber((prev) => (prev <= 1 ? 1 : prev - 1));
  }

  function goToNextPage() {
    setPageNumber((prev) => (prev >= numPages ? numPages : prev + 1));
  }

  return (
    <div className="ciccenic_page">
      {loadingPdf && <IsLoading />}

      <section className="ciccenic_hero">
        <div className="ciccenic_backdrop" />

        <div className="ciccenic_intro">
          <div className="ciccenic_intro_content">
            <span className="ciccenic_label">UNICAL · Curso Internacional</span>

            <h1 className="ciccenic_main_title">
              Sustentación Probatoria y Narrativa Policial.
            </h1>

            <p className="ciccenic_subtitle">
              Objetivo del curso Sustentación Probatoria y Narrativa Policial:.
            </p>

            <div className="ciccenic_stats">
              <div className="ciccenic_stat">
                <strong>8</strong>
                <span>Semanas</span>
              </div>
              <div className="ciccenic_stat">
                <strong>300</strong>
                <span>Horas</span>
              </div>
              <div className="ciccenic_stat">
                <strong>100%</strong>
                <span>En línea</span>
              </div>
            </div>

            <div className="button_group button_group--hero">
              <a
                href={urlRegister}
                rel="noopener noreferrer"
                className="btn_primary"
              >
                Inscribirse ➜
              </a>

              <a
                href={urlPago}
                rel="noopener noreferrer"
                className="btn_primary btn_primary--secondary"
              >
                Registrar pago ➜
              </a>

              <a
                href="/files/cispnp_c.pdf"
                download="Brochure-Ciccenic.pdf"
                className="btn_primary btn_primary--ghost"
              >
                Descargar PDF ➜
              </a>
            </div>
          </div>
        </div>

        <div className="ciccenic_floating_panels">
          <div className="ciccenic_pdf_panel" ref={containerRef}>
            <div className="ciccenic_panel_head">
              <div className="ciccenic_panel_dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="ciccenic_panel_title">
                Brochure del curso
              </div>
            </div>

            <div className="ciccenic_pdf_viewer">
              <Document
                file="/files/cispnp_c.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                loading="Cargando PDF..."
              >
                <Page
                  pageNumber={pageNumber}
                  width={pdfWidth}
                  className="ciccenic_pdf"
                />
              </Document>
            </div>

            <div className="pagination_controls">
              <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
                Anterior
              </button>

              <span>
                Página {pageNumber} de {numPages || "--"}
              </span>

              <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
                Siguiente
              </button>
            </div>
          </div>

          <div className="ciccenic_info_panel">
            <span className="ciccenic_mini_badge">Información del curso</span>

            <h3 className="ciccenic_title">
              Curso Internacional de Sustentación Probatoria y Narrativa Policial.
            </h3>

            <p className="ciccenic_description">
              Objetivo: del curso de Sustentación Probatoria y Narrativa Policial:.
            </p>

            <div className="ciccenic_feature_list">
              <div className="ciccenic_feature_item">
                <strong>Modalidad</strong>
                <span>Virtual E-Learning</span>
              </div>
              <div className="ciccenic_feature_item">
                <strong>Enfoque</strong>
                <span>Comunicación e inclusión</span>
              </div>
              <div className="ciccenic_feature_item">
                <strong>Certificación</strong>
                <span>Disponible al aprobar</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cispnp