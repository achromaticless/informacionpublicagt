import { useState } from "react";
import { TEXT_KIND } from "../types/enums";
import { RequestState } from "../types/interfaces";

export const useRequest = () => {
  const initialRequestState: RequestState = {
    governmentAgencyEmail: {
      type: TEXT_KIND.INPUT,
      value: "",
    },
    subject: {
      type: TEXT_KIND.INPUT,
      value: "",
    },
    request: {
      type: TEXT_KIND.TEXTAREA,
      value: "",
    },
  };

  const [request, setRequest] = useState<RequestState>(initialRequestState);

  return { request, setRequest };
};
