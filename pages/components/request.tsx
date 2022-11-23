import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { VIEWS } from "../../types/enums";

interface RequestProps {
  children: React.ReactNode;
  governmentAgencyEmail?: string;
  viewChange: (newView: VIEWS) => void;
}

export default function Request(props: RequestProps) {
  return (
    <div className={styles.request}>
      <div className={styles.information}>
        <Image
          src="/noun-small.svg"
          alt="Informacion publica Logo"
          width={80}
          height={84}
          className={styles.logo}
          onClick={() => props.viewChange(VIEWS.MAIN)}
        />
        <div>
          ¡Listo! Ahora solo copia el siguiente texto y envíalo a la dirección
          que está a continuación desde tu corrreo electrónico, también puedes
          utilizar el asunto sugerido.
        </div>
      </div>
      <div className={styles.inputs}>{props.children}</div>
      <div className={styles.overshadow_actions}>
        <button
          className={styles.light_button}
          onClick={() => props.viewChange(VIEWS.MAIN)}
        >
          Volver
        </button>
        <button className={styles.dark_button} onClick={() => {}}>
          Copiar solicitud y abrir correo
        </button>
      </div>
    </div>
  );
}
