import Textarea from "rc-textarea";
import { useState } from "react";
import { BiCopy } from "react-icons/bi";
import styles from "../../styles/Home.module.css";
import { TEXT_KIND } from "../../types/enums";
export interface InputProps<T> {
  value: string;
  state: T;
  currentKey: keyof T;
  placeHolder?: string;
  label?: string;
  type?: TEXT_KIND;
  handleChange: (key: keyof T, value: string) => void;
}

export default function Input<T extends {}>(props: InputProps<T>) {
  const [copyAnimation, setCopyAnimation] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.handleChange(props.currentKey, event.target.value);
  };

  const handleCopy = (value: string) => {
    setCopyAnimation(true);
    navigator.clipboard.writeText(value);

    setTimeout(() => {
      setCopyAnimation((copyAnimation) => false);
    }, 1000);
  };

  return !props.type || props.type === TEXT_KIND.INPUT ? (
    <div className={styles.inputContainer}>
      {props.label && <span className={styles.label}>{props.label}</span>}
      <input
        value={props.value}
        placeholder={props.placeHolder}
        onChange={handleChange}
        className={styles.input}
      />
      <BiCopy
        className={
          copyAnimation ? styles.copy_icon_animation : styles.copy_icon
        }
        onClick={() => handleCopy(props.value)}
      />
    </div>
  ) : (
    <div className={styles.inputContainer}>
      <Textarea
        autoSize
        className={styles.input}
        value={props.value}
        onChange={handleChange}
        placeholder={props.placeHolder}
      />
      <BiCopy
        className={
          copyAnimation ? styles.copy_icon_animation : styles.copy_icon
        }
        onClick={() => handleCopy(props.value)}
      />
    </div>
  );
}
