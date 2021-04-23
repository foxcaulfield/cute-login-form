import { Form, Button } from "react-bootstrap";
import * as axios from "axios";

import React from "react";
import styles from "./Login.module.css";

import { Formik, Field, Form as FormikForm } from "formik";
import { TextField as TextFieldFMUI } from "formik-material-ui";
import ButtonMUI from "@material-ui/core/Button";
import { useHistory } from "react-router";

function Login(props) {
  //for page routing
  let history = useHistory();
  function onSubmitFromLogin() {
    history.push("/contacts");
    console.log(history);
  }

  //validation
  console.log(props);
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) &&
      value
    ) {
      error = "Invalid email address";
    } else if (value.length > 25) {
      error = "Too long";
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (value.length > 25) {
      error = "Too long";
    }
    return error;
  }

  return (
    <div className={styles.inputsWrapper}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        //POST to server
        onSubmit={
          //for asynch

          async (values, { resetForm }) => {
            console.log(values);
            const { data } = await axios.post(
              "https://jsonplaceholder.cypress.io/users", //alt way
              // "https://jsonplaceholder.typicode.com/users",
              {
                values,
              }
            );

            //for demo
            // ({ resetForm }) => {

            //routing after POST
            onSubmitFromLogin();

            //reset form
            resetForm();
          }
        }
      >
        {/* FORMIK FORM */}
        {({ errors, touched, isValidating }) => (
          <FormikForm className={styles.container}>
            <div className={styles.holder}>
              <div className={styles.card}>
                <div className={styles.card__text}>
                  <Form.Group
                    controlId="formBasicEmail"
                    className={styles.classForm}
                  >
                    <Field
                      component={TextFieldFMUI}
                      id="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      type="email"
                      validate={validateEmail}
                      helperText="Enter email"
                      fullWidth
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Field
                      component={TextFieldFMUI}
                      id="password"
                      name="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      validate={validatePassword}
                      helperText="Enter password"
                      fullWidth
                    />
                  </Form.Group>

                  <ButtonMUI
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    // disabled
                  >
                    Login
                  </ButtonMUI>

                  <ButtonMUI
                    // variant="contained"
                    color="primary"
                    type="reset"
                    fullWidth
                    // disabled
                  >
                    Reset
                  </ButtonMUI>
                </div>
              </div>
            </div>
          </FormikForm>
        )}
        {/* END FORMIK FORM */}
      </Formik>
    </div>
  );
}

export default Login;
