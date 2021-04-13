import { Form, Button } from "react-bootstrap";
import * as axios from "axios";

import React from "react";
import styles from "./Login.module.css";

import { Formik, Field, Form as FormikForm } from "formik";
import { TextField as TextFieldFMUI } from "formik-material-ui";
import ButtonMUI from "@material-ui/core/Button";
import { useHistory } from "react-router";

// function onKeyDown(keyEvent) {
//   if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
//     keyEvent.preventDefault();
//   }
// }

function Login(props) {
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
    <>
      {/* <Form className={styles.container}>
        <div className={styles.holder}>
          <div className={styles.card}>
            <div className={styles.card__text}>
              <Form.Group
                controlId="formBasicEmail"
                className={styles.classForm}
              >
                <Form.Label>
                  <strong>Email address</strong>
                </Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>
                  <strong>Password</strong>
                </Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Form> */}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        //POST to server
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          const { data } = await axios.post(
            "https://jsonplaceholder.typicode.com/users",
            {
              values,
            }
          );
          // props.history.push();
          // props.handleSubmit("/contacts");
          onSubmitFromLogin();
          // alert("Я РОДИЛСЯ!");
          // console.log(data.values);
          // console.log(!!data.values);
          // let subData = data;
          // subData.values.id = users.contacts.length + 1;
          // set users with new contact
          // setUsers({
          //   contacts: users.contacts
          //     // .slice(0)
          //     .concat(subData.values),
          // });

          //reset form
          resetForm();
          //collapse the accordion
          // setOpenAddContact(false);
        }}
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
                    {/* <Form.Label>
                      <strong>Email address</strong>
                    </Form.Label> */}
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
                    {/* <Form.Control
                      name="email"
                      type="email"
                      placeholder="Enter email"
                    /> */}
                    {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    {/* <Form.Label>
                      <strong>Password</strong>
                    </Form.Label> */}
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
                    {/* <Form.Control
                      type="password"
                      validate={validatePassword}
                      placeholder="Password"
                    /> */}
                  </Form.Group>
                  {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group> */}

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

                  {/* <Button variant="primary" type="submit">
                    login
                  </Button> */}
                </div>
              </div>
            </div>
          </FormikForm>
        )}
        {/* END FORMIK FORM */}
      </Formik>
    </>
  );
}

export default Login;
