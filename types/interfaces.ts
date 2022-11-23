import { TEXT_KIND } from "./enums";

export interface FormState {
  name: StateElement;
  dpi: StateElement;
  email: StateElement;
  description: StateElement;
}

interface StateElement {
  type: TEXT_KIND;
  value: string;
}

export interface RequestState {
  governmentAgencyEmail: StateElement;
  subject: StateElement;
  request: StateElement;
}
