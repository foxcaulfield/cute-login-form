import React, { useState, useEffect } from "react";
import * as axios from "axios";
import styles from "./Contacts.module.css";
import "./Contacts.module.css";

import {
  Tabs,
  Tab,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";

function Contacts(props) {
  const [users, setUsers] = useState({ contacts: [] });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers({ contacts: data.reverse() });
      console.log(data);
    };
    fetchData();
  }, [setUsers]);

  // function addContact(){
  //   const fetchData = async () => {
  //     const { data }
  // }

  return (
    <div className={styles.contactsContainer}>
      <Container>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Contacts</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Add contact</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        {false && (
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}

        {!users.contacts && <Spinner animation="border" />}
        {users.contacts &&
          users.contacts.map((item) => (
            <div key={item.id} className={styles.contactCard}>
              <Row>
                <Col sm={3} className={styles.avatarAndNameCol}>
                  <Image
                    src={`https://picsum.photos/200?random=${item.id}`}
                    alt={`user_avatar_${item.id}`}
                    rounded
                    fluid
                  />
                  <strong>{item.name}</strong>
                </Col>

                <Col className={styles.informationCol} fluid>
                  <div className={styles.contactTabs}>
                    <Tabs defaultActiveKey="Bio" id="contactTab">
                      <Tab
                        eventKey="Bio"
                        title="Bio"
                        className={styles.contactTab}
                      >
                        <strong>Nickname:</strong> <em>{item.username}</em>
                        <br />
                        <strong>Email:</strong> <em>{item.email}</em>
                      </Tab>
                      <Tab
                        eventKey="Address"
                        title="Address"
                        className={styles.contactTab}
                      >
                        <strong>Street:</strong> <em>{item.address.street}</em>
                        <br />
                        <strong>Suite:</strong> <em>{item.address.suite}</em>
                        <br />
                        <strong>City:</strong> <em>{item.address.city}</em>
                        <br />
                        <strong>Zipcode:</strong>{" "}
                        <em>{item.address.zipcode}</em>
                      </Tab>
                      <Tab
                        eventKey="Location"
                        title="Location"
                        className={styles.contactTab}
                      >
                        <strong>Latitude:</strong>{" "}
                        <em>{item.address.geo.lat}</em>
                        <br />
                        <strong>Longitude:</strong>{" "}
                        <em>{item.address.geo.lng}</em>
                      </Tab>
                      <Tab
                        eventKey="Company"
                        title="Company"
                        className={styles.contactTab}
                      >
                        <strong>Company name</strong>:{" "}
                        <em>{item.company.name}</em>
                        <br />
                        <strong> Catchphrase:</strong>
                        <em>{item.company.catchPhrase}</em>
                        <br />
                        <strong>Business:</strong> <em>{item.company.bs}</em>
                      </Tab>
                    </Tabs>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
      </Container>
    </div>
  );
}

export default Contacts;

//Alternative way to render #1
// Bio:
//             <br />
//             Name: <em>{item.name}</em>
//             <br />
//             Nickname: <em>{item.username} </em>
//             <br />
//             Email: <em>{item.email} </em>
//             <br />
//             Address:
//             <br />
//             Street: <em>{item.address.street} </em>
//             <br />
//             Suite: <em>{item.address.suite} </em>
//             <br />
//             City: <em>{item.address.city} </em>
//             <br />
//             Zipcode: <em>{item.address.zipcode} </em>
//             <br />
//             Location:
//             <br />
//             Latitude:
//             <em>{item.address.geo.lat} </em>
//             <br />
//             Longitude:
//             <em>{item.address.geo.lng} </em>
//             <br />
//             Phone number: <em>{item.phone} </em>
//             <br />
//             Website: <em>{item.website} </em>
//             <br />
//             Company:
//             <br />
//             Company name: <em>{item.company.name} </em>
//             <br />
//             Catchphrase: <em>{item.company.catchPhrase} </em>
//             <br />
//             Business: <em>{item.company.bs} </em>
//             <br />
//             <hr />

// Alternative way to render #2
//              {users.contacts &&
//         users.contacts.map((item) => (
//           <div key={item.id}>
//             {Object.entries(item).map((key) => (
//               <p>
//                 {" "}
//                 <strong>{JSON.stringify(key[0])}</strong>:
//                 {typeof key[1] !== "object"
//                   ? JSON.stringify(key[1])
//                   : Object.entries(key[1]).map((keyInner1) => (
//                       <p>
//                         <u> {JSON.stringify(keyInner1[0])}</u> :
//                         {typeof keyInner1[1] !== "object"
//                           ? JSON.stringify(keyInner1[1])
//                           : Object.entries(keyInner1[1]).map((keyInner2) => (
//                               <>
//                                 <p>
//                                   <em>{JSON.stringify(keyInner2[0])}</em> :
//                                   {JSON.stringify(keyInner2[1])}
//                                 </p>
//                               </>
//                             ))}
//                       </p>
//                     ))}
//               </p>
//             ))}
