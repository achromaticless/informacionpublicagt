import Head from "next/head";
import React, { useState } from "react";
import Select from "react-select";
import styles from "../styles/Home.module.css";
import { FormStatePlaceHolders, RequestLabel, VIEWS } from "../types/enums";
import { FormState, RequestState } from "../types/interfaces";
import { useForm } from "../hooks/useForm";
import Form from "./components/form";
import Input from "./components/input";
import Request from "./components/request";
import Main from "./main";
import { useRequest } from "../hooks/useRequest";
import { useViewChange } from "../hooks/useViewChange";

const governmentAgencies = [
  { value: "", label: "No opcion seleccionada" },
  { value: "Departamento 1", label: "Departamento 1" },
  { value: "Departamento 2", label: "Departamento 2" },
  { value: "Departamento 3", label: "Departamento 3" },
];

export default function Home() {
  const { form, handleUpdateForm } = useForm();
  const { request, setRequest } = useRequest();
  const { currentView, handleViewChange } = useViewChange();
  const [currentGovAgency, setCurrentGovAgency] = useState<string>("");

  const handleGovernmentAgencyEmail = (event: any) => {
    setCurrentGovAgency(event.value);
    handleUpdateForm(event.value, "email");
    if (event.value !== "") {
      handleViewChange(VIEWS.FORM);
    }
  };

  const handleGenerateEmail = () => {
    const enter = `%0D%0A`;
    const emailTemplate = `Estimado ${currentGovAgency},${enter}${enter} Mi nombre es ${form.name.value} y me identifico el con numero de Documento Personal de Identificacion -DPI- ${form.dpi.value}`;
    const messageToShow =
      `${emailTemplate} ${form.description.value}${enter}${enter} saludos,`.replaceAll(
        " ",
        "%20"
      );
    window.location.href = `mailto:${form.email.value}?subject=Queja ${form.name.value}&body=${messageToShow}`;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Información Pública GT</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
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
          handleGenerateEmail={handleGenerateEmail}
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
                handleUpdateForm(newValue, currentKey)
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
