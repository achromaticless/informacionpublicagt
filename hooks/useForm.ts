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

  return { form, setForm };
};
