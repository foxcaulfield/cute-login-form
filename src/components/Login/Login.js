import { Form, Button } from "react-bootstrap";
import React from "react";
import styles from "./Login.module.css";

function Login(props) {
  return (
    <Form className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.card}>
          <div className={styles.card__text}>
            <Form.Group controlId="formBasicEmail" className={styles.classForm}>
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
    </Form>
    // <Form className={styles.container}>
    //   <div className={styles.blurredBox}>
    //     <Form.Group controlId="formBasicEmail" className={styles.classForm}>
    //       <Form.Label>Email address</Form.Label>
    //       <Form.Control type="email" placeholder="Enter email" />
    //       <Form.Text className="text-muted">
    //         We'll never share your email with anyone else.
    //       </Form.Text>
    //     </Form.Group>

    //     <Form.Group controlId="formBasicPassword">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control type="password" placeholder="Password" />
    //     </Form.Group>
    //     <Form.Group controlId="formBasicCheckbox">
    //       <Form.Check type="checkbox" label="Check me out" />
    //     </Form.Group>
    //     <Button variant="primary" type="submit">
    //       Submit
    //     </Button>
    //   </div>
    // </Form>
  );
}

export default Login;
