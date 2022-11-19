import Head from "next/head";
import React, { useState } from "react";
import Select from "react-select";
import styles from "../styles/Home.module.css";
import Form from "./components/form";
import Input, { TEXT_KIND } from "./components/input";
import Request from "./components/request";
import Main from "./main";

const governmentAgencies = [
  { value: "", label: "No opcion seleccionada" },
  { value: "Departamento 1", label: "Departamento 1" },
  { value: "Departamento 2", label: "Departamento 2" },
  { value: "Departamento 3", label: "Departamento 3" },
];

export enum VIEWS {
  MAIN = "0",
  FORM = "1",
  REQUEST = "2",
}

export interface FormState {
  name: StateElement;
  dpi: StateElement;
  email: StateElement;
  description: StateElement;
}

enum FormStatePlaceHolders {
  name = "Nombre y apellido",
  dpi = "DPI o Pasaporte",
  email = "Correo",
  description = "Describe claramente la información a solicitar",
}

enum RequestLabel {
  governmentAgencyEmail = "Destinatario",
  subject = "Asunto",
  request = "Solicitud",
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

export default function Home() {
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

  const [form, setForm] = useState<FormState>(initialFormState);
  const [request, setRequest] = useState<RequestState>(initialRequestState);
  const [currentView, setCurrentView] = useState<VIEWS>(VIEWS.MAIN);
  const [currentGovAgency, setCurrentGovAgency] = useState();

  const handleViewChange = (newView: VIEWS) => {
    setCurrentView(newView);
  };

  const handleGovernmentAgencyEmail = (event: any) => {
    setCurrentGovAgency(event.value);
    setForm((form) => ({
      ...form,
      email: event.value,
    }));
    if (event.value !== "") {
      handleViewChange(VIEWS.FORM);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Información Pública GT</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="created to minimize pain points while requesting government information"
        />
        <link rel="icon" href="/noun-small.svg" />
      </Head>
      {currentView === VIEWS.MAIN && (
        <Main
          viewChange={handleViewChange}
          governmentAgencyEmail={currentGovAgency}
        >
          <Select
            options={governmentAgencies}
            isSearchable
            styles={{
              control: (styles, state) =>
                state.isFocused
                  ? {
                      ...styles,
                      width: "725px",
                      outline: "none",
                      border: "1px solid rgba(0,0,0,0.12)",
                      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.12)",
                    }
                  : {
                      ...styles,
                      width: "725px",
                      outline: "none",
                      border: "none",
                      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.12)",
                    },
              indicatorsContainer: (styles) => ({
                ...styles,
                visibility: "collapse",
              }),
            }}
            onChange={(event) => handleGovernmentAgencyEmail(event)}
            value={governmentAgencies.find(
              (govermentAgency) => govermentAgency.value === currentGovAgency
            )}
          />
        </Main>
      )}
      {currentView === VIEWS.FORM && (
        <Form
          governmentAgencyEmail={currentGovAgency}
          viewChange={handleViewChange}
        >
          {Object.entries(form).map(([key, value]) => (
            <Input<FormState>
              value={value.value}
              key={key}
              state={form}
              currentKey={key as keyof FormState}
              placeHolder={FormStatePlaceHolders[key as keyof FormState]}
              type={value.type}
              handleChange={(currentKey, newValue) =>
                setForm({
                  ...form,
                  [currentKey]: {
                    type: value.type,
                    value: newValue,
                  },
                })
              }
            />
          ))}
        </Form>
      )}
      {currentView === VIEWS.REQUEST && (
        <Request
          governmentAgencyEmail={currentGovAgency}
          viewChange={handleViewChange}
        >
          {Object.entries(request).map(([key, value]) => (
            <Input<RequestState>
              key={key}
              value={value.value}
              state={request}
              currentKey={key as keyof RequestState}
              type={value.type}
              label={RequestLabel[key as keyof RequestState]}
              handleChange={(currentKey, newValue) =>
                setRequest({
                  ...request,
                  [currentKey]: {
                    type: value.type,
                    value: newValue,
                  },
                })
              }
            />
          ))}
        </Request>
      )}
    </div>
  );
}
