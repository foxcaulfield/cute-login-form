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
  Modal,
  Accordion,
  Card,
  useAccordionToggle,
} from "react-bootstrap";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <Button
      variant="info"
      onClick={decoratedOnClick}
      // handleItems(item);
    >
      {children}
    </Button>
    // <button
    //   type="button"
    //   style={{ backgroundColor: "pink" }}
    //   onClick={decoratedOnClick}
    // >
    //   {children}
    // </button>
  );
}

// function MyVerticallyCenteredModal(props) {
//   console.log("hey");
//   console.log(props);
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           {/* {props.onProfileClick.items.item.name} */}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Centered Modal{props.item.name}</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

function Contacts(props) {
  //users GET
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
  //users GET

  //modal show
  // const [modalShow, setModalShow] = React.useState(false);
  // //modal show

  // const handleItems = (items) => {
  //   return items;
  // };

  return (
    <div className={styles.contactsContainer}>
      {/* modal */}
      {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        // items={handleItems()}
      /> */}
      {/* modal */}
      <Container>
        <Accordion defaultActiveKey="0">
          <Navbar bg="dark" variant="dark" expand sticky="top">
            <Navbar.Brand href="#home">Contacts</Navbar.Brand>
            <Nav className="mr-auto"></Nav>
            {/* <CustomToggle eventKey="0">Add contact</CustomToggle> */}
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>

          <Card>
            {/* <Card.Header>
              <CustomToggle eventKey="0">Click me!</CustomToggle>
            </Card.Header> */}
            {/* <Accordion.Toggle as={Navbar.Brand} eventKey="0">
              Click me!
            </Accordion.Toggle> */}
            <CustomToggle eventKey="0">Add contact</CustomToggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                Hello! I'm the body
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
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
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {/* {false && (
          
        )} */}

        {!users.contacts && <Spinner animation="border" />}
        {users.contacts &&
          users.contacts.map((item) => (
            // <Row>
            <>
              {/* <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                item={item}
              /> */}
              <div key={item.id} className={styles.contactCard}>
                <Accordion>
                  <Row xs={1} sm={2} md={2} lg={4}>
                    {/* <Row> */}
                    <Col className={styles.avatarAndNameCol}>
                      <Image
                        className={styles.avatar}
                        src={`https://picsum.photos/200?random=${item.id}`}
                        alt={`user_avatar_${item.id}`}
                        rounded
                        fluid
                      />

                      <span className={styles.name}>{item.name}</span>
                      {/* <div className={styles.name}> {item.name}</div> */}
                    </Col>
                    <Col className={styles.phoneCol}>
                      <span className={styles.phone}> {item.phone} </span>
                    </Col>
                    <Col className={styles.informationCol} fluid>
                      <span className={styles.email}> {item.email}</span>
                      {/* <div className={styles.contactTabs}>
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
                  </div> */}
                    </Col>
                    <Col className={styles.cityCol}>
                      <span className={styles.city}>{item.address.city}</span>
                      {/* <Button variant="danger">Delete</Button> */}
                      {/* <Button
                        variant="info"
                        onClick={() => console.log("totally custom!")}
                        // handleItems(item);
                      >
                        Profile
                      </Button> */}
                      <CustomToggle eventKey="1">Profile</CustomToggle>
                      {/* <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Click me!
                      </Accordion.Toggle> */}
                    </Col>
                    {/* <Col className={styles.cityCol}>{item.address.city}</Col> */}
                  </Row>
                  {/* <Accordion> */}
                  <Card>
                    {/* <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Click me!
                      </Accordion.Toggle>
                    </Card.Header> */}
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
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
                            <strong>Street:</strong>{" "}
                            <em>{item.address.street}</em>
                            <br />
                            <strong>Suite:</strong>{" "}
                            <em>{item.address.suite}</em>
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
                            <strong>Business:</strong>{" "}
                            <em>{item.company.bs}</em>
                          </Tab>
                        </Tabs>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  {/* <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Click me!
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                  </Card> */}
                </Accordion>
              </div>
            </>
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
