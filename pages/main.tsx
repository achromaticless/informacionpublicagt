import Image from "next/image";
import React from "react";
import { VIEWS } from ".";
import styles from "../styles/Home.module.css";

interface MainProps {
  children: React.ReactNode;
  governmentAgencyEmail?: string;
  viewChange: (newView: VIEWS) => void;
}

export default function Main(props: MainProps) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <Image
            src="/noun-small.svg"
            alt="Informacion publica Logo"
            width={186}
            height={186}
            className={styles.logo}
            onClick={() => props.viewChange(VIEWS.MAIN)}
          />
          <div className={styles.title}>Información Pública GT</div>
        </div>
        <div>{props.children}</div>
        <div className={styles.actions}>
          <button
            className={styles.light_button}
            onClick={() => props.viewChange(VIEWS.REQUEST)}
          >
            Copiar correo
          </button>
          <button
            className={styles.dark_button}
            onClick={() => props.viewChange(VIEWS.FORM)}
          >
            Solicitar Información
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Términos y condiciones
        </a>
      </footer>
    </div>
  );
}
