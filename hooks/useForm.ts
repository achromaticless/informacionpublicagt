import { useState } from "react";
import { TEXT_KIND } from "../types/enums";
import { FormState } from "../types/interfaces";

export const useForm = () => {
  const initialFormState: FormState = {
    name: {
      type: TEXT_KIND.INPUT,
      value: "",
    },
    dpi: {
      type: TEXT_KIND.INPUT,
      value: "",
    },
    email: {
      type: TEXT_KIND.INPUT,
      value: "",
    },
    description: {
      type: TEXT_KIND.TEXTAREA,
      value: "",
    },
  };

  const [form, setForm] = useState<FormState>(initialFormState);

  const handleUpdateForm = (value: string, key: keyof FormState) => {
    setForm((form) => {
      const currentKey = form[key];
      return {
        ...form,
        [key]: {
          ...currentKey,
          value: value,
        },
      };
    });
  };

  return { form, handleUpdateForm };
};
