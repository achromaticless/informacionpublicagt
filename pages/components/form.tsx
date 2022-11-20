import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { VIEWS } from "../../types/enums";

interface FormPros {
  children: React.ReactNode;
  governmentAgencyEmail?: string;
  viewChange: (newView: VIEWS) => void;
}

export default function Form(props: FormPros) {
  return (
    <div className={styles.forms}>
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
          <span>Vas a solicitar Información al </span>

          <b>
            {props.governmentAgencyEmail ? props.governmentAgencyEmail : ""}
          </b>
          <span>
            , antes completa la siguiente información, recuerda que no
            almacenamos ninguno de estos datos.
          </span>
        </div>
      </div>
      <div className={styles.inputs}>{props.children}</div>
      <div className={styles.actions}>
        <button className={styles.dark_button}>Generar correo</button>
      </div>
    </div>
  );
}
