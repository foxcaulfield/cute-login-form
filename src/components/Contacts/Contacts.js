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
  // Spinner,
  Container,
  Row,
  Col,
  Image,
  // Modal,
  Accordion,
  Card,
  useAccordionToggle,
} from "react-bootstrap";

import { Formik, Field, Form as FormikForm } from "formik";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <Button variant="info" onClick={decoratedOnClick}>
      {children}
    </Button>
  );
}

function Contacts(props) {
  //users GET
  const [users, setUsers] = useState({ contacts: [] });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers({ contacts: data.reverse() });
      // console.log(data);
    };
    fetchData();
  }, []);
  //users GET

  //users POST
  // function addContact() {
  //   const fetchData = async () => {
  //     const { data } = await axios.post(
  //       "https://jsonplaceholder.typicode.com/users",
  //       {
  //         name: "Nicholas Runolfsdottir V",
  //         username: "Maxime_Nienow",
  //         email: "Sherwood@rosamond.me",
  //         address: {
  //           street: "Ellsworth Summit",
  //           suite: "Suite 729",
  //           city: "Aliyaview",
  //           zipcode: "45169",
  //           geo: {
  //             lat: "-14.3990",
  //             lng: "-120.7677",
  //           },
  //         },
  //         phone: "586.493.6943 x140",
  //         website: "jacynthe.com",
  //         company: {
  //           name: "Abernathy Group",
  //           catchPhrase: "Implemented secondary concept",
  //           bs: "e-enable extensible e-tailers",
  //         },
  //       }
  //     );
  //     setUsers({ contacts: users.contacts.reverse().concat(data).reverse() });
  //     // alert(data.name + data.username);
  //     // console.log(data);
  //     // console.log({ users });
  //   };
  //   fetchData();
  //   // axios.post('/login', {
  //   //   firstName: 'Finn',
  //   //   lastName: 'Williams'
  //   // });
  // }
  //users POST

  return (
    <div className={styles.contactsContainer}>
      <Container>
        <Accordion>
          {/* NAVBAR */}
          <Navbar bg="dark" variant="dark" expand sticky="top">
            <Navbar.Brand href="#home">Contacts</Navbar.Brand>
            <Nav className="mr-auto"></Nav>

            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>

          {/* ACCORDION WITH ADD CONTACT FORM */}
          <Card>
            <CustomToggle eventKey="0">Add contact</CustomToggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                Enter the data
                {/* FORMIK FORM */}
                <Formik
                  initialValues={{
                    id: "id",
                    name: "",
                    username: "",
                    email: "",
                    address: {
                      street: "",
                      suite: "",
                      city: "",
                      zipcode: "",
                      geo: {
                        lat: "",
                        lng: "",
                      },
                    },
                    phone: "",
                    website: "",
                    company: {
                      name: "",
                      catchPhrase: "",
                      bs: "",
                      // id: "id",
                      // name: "",
                      // username: "",
                      // email: "",
                      // address: {
                      //   street: "Ellsworth Summit",
                      //   suite: "Suite 729",
                      //   city: "Aliyaview",
                      //   zipcode: "45169",
                      //   geo: {
                      //     lat: "-14.3990",
                      //     lng: "-120.7677",
                      //   },
                      // },
                      // phone: "586.493.6943 x140",
                      // website: "jacynthe.com",
                      // company: {
                      //   name: "Abernathy Group",
                      //   catchPhrase: "Implemented secondary concept",
                      //   bs: "e-enable extensible e-tailers",
                    },
                  }}
                  onSubmit={async (values) => {
                    // function addContact() {
                    //   const fetchData = async () => {
                    const { data } = await axios.post(
                      "https://jsonplaceholder.typicode.com/users",
                      {
                        values,
                      }
                    );
                    let subData = data;
                    subData.values.id = users.contacts.length + 1;
                    setUsers({
                      contacts: users.contacts
                        .reverse()
                        .concat(subData.values)
                        .reverse(),
                    });
                    // alert(data.name + data.username);
                    // console.log(data);
                    // console.log({ users });
                    // };
                    // fetchData();
                    // axios.post('/login', {
                    //   firstName: 'Finn',
                    //   lastName: 'Williams'
                    // });
                  }}

                  // await new Promise((r) => setTimeout(r, 500));

                  // alert(JSON.stringify(values, null, 2));
                  // }}
                >
                  <FormikForm>
                    <label htmlFor="name">Name</label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Jane"
                      // value="Jane"
                    />
                    <br />
                    <label htmlFor="username">User Name</label>
                    <Field
                      id="username"
                      name="username"
                      placeholder="Doe"
                      // value="Doe"
                    />
                    <br />

                    <label htmlFor="email">Email</label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="jane@acme.com"
                      type="email"
                      // value="42@42.com"
                    />
                    <br />
                    {/* ############## */}
                    <label htmlFor="phone">Phone</label>
                    <Field
                      id="phone"
                      name="phone"
                      placeholder="025-857-8845"
                      type="text"
                      // value="42@42.com"
                    />
                    <br />
                    {/* ############## */}

                    <button type="submit">Submit</button>
                  </FormikForm>
                </Formik>
                {/* BOOTSTRAP FORM */}
                {/* <Form onSubmit={addContact}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Form.Row>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form> */}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {/* {!users.contacts && <Spinner animation="border" />} */}

        {/* CONTACT CARD */}
        {users.contacts &&
          users.contacts.map((item) => (
            // <Row>
            <>
              <div key={item.id} className={styles.contactCard}>
                <Accordion>
                  <Row xs={1} sm={1} md={2} lg={2}>
                    <Col className={styles.avatarAndNameCol}>
                      <Image
                        className={styles.avatar}
                        src={`https://picsum.photos/200?random=${item.id}`}
                        alt={`user_avatar_${item.id}`}
                        rounded
                        fluid
                      />

                      <span className={styles.name}>
                        {item.name}
                        {/* {item.id} */}
                      </span>
                    </Col>

                    <Col className={styles.cityCol}>
                      <span className={styles.city}>{item.phone}</span>

                      <CustomToggle eventKey="1">Profile</CustomToggle>
                    </Col>
                  </Row>

                  {/* ACCORDION WITH INFORMATION TABS */}
                  <Card>
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

//=========================================================
// import React, { useState, useEffect } from "react";
// import * as axios from "axios";
// import styles from "./Contacts.module.css";
// import "./Contacts.module.css";

// import {
//   Tabs,
//   Tab,
//   Navbar,
//   Nav,
//   Form,
//   FormControl,
//   Button,
//   Spinner,
//   Container,
//   Row,
//   Col,
//   Image,
//   Modal,
//   Accordion,
//   Card,
//   useAccordionToggle,
// } from "react-bootstrap";

// function CustomToggle({ children, eventKey }) {
//   const decoratedOnClick = useAccordionToggle(eventKey, () =>
//     console.log("totally custom!")
//   );

//   return (
//     <Button variant="info" onClick={decoratedOnClick}>
//       {children}
//     </Button>
//   );
// }

// function Contacts(props) {
//   //users GET
//   const [users, setUsers] = useState({ contacts: [] });

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data } = await axios.get(
//         "https://jsonplaceholder.typicode.com/users"
//       );
//       setUsers({ contacts: data.reverse() });
//       console.log(data);
//     };
//     fetchData();
//   }, [setUsers]);
//   //users GET

//   function addContact() {
//     const fetchData = async () => {
//       const { data } = await axios.post(
//         "https://jsonplaceholder.typicode.com/users",
//         {
//           name: "Nicholas Runolfsdottir V",
//           username: "Maxime_Nienow",
//           email: "Sherwood@rosamond.me",
//           address: {
//             street: "Ellsworth Summit",
//             suite: "Suite 729",
//             city: "Aliyaview",
//             zipcode: "45169",
//             geo: {
//               lat: "-14.3990",
//               lng: "-120.7677",
//             },
//           },
//           phone: "586.493.6943 x140",
//           website: "jacynthe.com",
//           company: {
//             name: "Abernathy Group",
//             catchPhrase: "Implemented secondary concept",
//             bs: "e-enable extensible e-tailers",
//           },
//         }
//       );
//       setUsers({ contacts: users.contacts.concat(data) });
//       // alert(data.name + data.username);
//       // console.log(data);
//       // console.log({ users });
//     };
//     fetchData();
//     // axios.post('/login', {
//     //   firstName: 'Finn',
//     //   lastName: 'Williams'
//     // });
//   }

//   return (
//     <div className={styles.contactsContainer}>
//       <Container>
//         <Accordion>
//           <Navbar bg="dark" variant="dark" expand sticky="top">
//             <Navbar.Brand href="#home">Contacts</Navbar.Brand>
//             <Nav className="mr-auto"></Nav>

//             <Form inline>
//               <FormControl
//                 type="text"
//                 placeholder="Search"
//                 className="mr-sm-2"
//               />
//               <Button variant="outline-info">Search</Button>
//             </Form>
//           </Navbar>

//           <Card>
//             <CustomToggle eventKey="0">Add contact</CustomToggle>
//             <Accordion.Collapse eventKey="0">
//               <Card.Body>
//                 Hello! I'm the body
//                 <Form onSubmit={addContact}>
//                   <Form.Row>
//                     <Form.Group as={Col} controlId="formGridName">
//                       <Form.Label>Name</Form.Label>
//                       <Form.Control type="text" placeholder="Enter name" />
//                     </Form.Group>
//                     <Form.Group as={Col} controlId="formGridEmail">
//                       <Form.Label>Email</Form.Label>
//                       <Form.Control type="email" placeholder="Enter email" />
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="formGridPassword">
//                       <Form.Label>Password</Form.Label>
//                       <Form.Control type="password" placeholder="Password" />
//                     </Form.Group>
//                   </Form.Row>

//                   <Form.Group controlId="formGridAddress1">
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control placeholder="1234 Main St" />
//                   </Form.Group>

//                   <Form.Group controlId="formGridAddress2">
//                     <Form.Label>Address 2</Form.Label>
//                     <Form.Control placeholder="Apartment, studio, or floor" />
//                   </Form.Group>

//                   <Form.Row>
//                     <Form.Group as={Col} controlId="formGridCity">
//                       <Form.Label>City</Form.Label>
//                       <Form.Control />
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="formGridState">
//                       <Form.Label>State</Form.Label>
//                       <Form.Control as="select" defaultValue="Choose...">
//                         <option>Choose...</option>
//                         <option>...</option>
//                       </Form.Control>
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="formGridZip">
//                       <Form.Label>Zip</Form.Label>
//                       <Form.Control />
//                     </Form.Group>
//                   </Form.Row>

//                   <Form.Group id="formGridCheckbox">
//                     <Form.Check type="checkbox" label="Check me out" />
//                   </Form.Group>

//                   <Button variant="primary" type="submit">
//                     Submit
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Accordion.Collapse>
//           </Card>
//         </Accordion>

//         {!users.contacts && <Spinner animation="border" />}
//         {users.contacts &&
//           users.contacts.map((item) => (
//             // <Row>
//             <>
//               <div key={item.id} className={styles.contactCard}>
//                 <Accordion>
//                   <Row xs={1} sm={1} md={2} lg={2}>
//                     <Col className={styles.avatarAndNameCol}>
//                       <Image
//                         className={styles.avatar}
//                         src={`https://picsum.photos/200?random=${item.id}`}
//                         alt={`user_avatar_${item.id}`}
//                         rounded
//                         fluid
//                       />

//                       <span className={styles.name}>{item.name}</span>
//                     </Col>

//                     <Col className={styles.cityCol}>
//                       <span className={styles.city}>{item.phone}</span>

//                       <CustomToggle eventKey="1">Profile</CustomToggle>
//                     </Col>
//                   </Row>

//                   <Card>
//                     <Accordion.Collapse eventKey="1">
//                       <Card.Body>
//                         <Tabs defaultActiveKey="Bio" id="contactTab">
//                           <Tab
//                             eventKey="Bio"
//                             title="Bio"
//                             className={styles.contactTab}
//                           >
//                             <strong>Nickname:</strong> <em>{item.username}</em>
//                             <br />
//                             <strong>Email:</strong> <em>{item.email}</em>
//                           </Tab>
//                           <Tab
//                             eventKey="Address"
//                             title="Address"
//                             className={styles.contactTab}
//                           >
//                             <strong>Street:</strong>{" "}
//                             <em>{item.address.street}</em>
//                             <br />
//                             <strong>Suite:</strong>{" "}
//                             <em>{item.address.suite}</em>
//                             <br />
//                             <strong>City:</strong> <em>{item.address.city}</em>
//                             <br />
//                             <strong>Zipcode:</strong>{" "}
//                             <em>{item.address.zipcode}</em>
//                           </Tab>
//                           <Tab
//                             eventKey="Location"
//                             title="Location"
//                             className={styles.contactTab}
//                           >
//                             <strong>Latitude:</strong>{" "}
//                             <em>{item.address.geo.lat}</em>
//                             <br />
//                             <strong>Longitude:</strong>{" "}
//                             <em>{item.address.geo.lng}</em>
//                           </Tab>
//                           <Tab
//                             eventKey="Company"
//                             title="Company"
//                             className={styles.contactTab}
//                           >
//                             <strong>Company name</strong>:{" "}
//                             <em>{item.company.name}</em>
//                             <br />
//                             <strong> Catchphrase:</strong>
//                             <em>{item.company.catchPhrase}</em>
//                             <br />
//                             <strong>Business:</strong>{" "}
//                             <em>{item.company.bs}</em>
//                           </Tab>
//                         </Tabs>
//                       </Card.Body>
//                     </Accordion.Collapse>
//                   </Card>
//                 </Accordion>
//               </div>
//             </>
//           ))}
//       </Container>
//     </div>
//   );
// }

// export default Contacts;

// //Alternative way to render #1
// // Bio:
// //             <br />
// //             Name: <em>{item.name}</em>
// //             <br />
// //             Nickname: <em>{item.username} </em>
// //             <br />
// //             Email: <em>{item.email} </em>
// //             <br />
// //             Address:
// //             <br />
// //             Street: <em>{item.address.street} </em>
// //             <br />
// //             Suite: <em>{item.address.suite} </em>
// //             <br />
// //             City: <em>{item.address.city} </em>
// //             <br />
// //             Zipcode: <em>{item.address.zipcode} </em>
// //             <br />
// //             Location:
// //             <br />
// //             Latitude:
// //             <em>{item.address.geo.lat} </em>
// //             <br />
// //             Longitude:
// //             <em>{item.address.geo.lng} </em>
// //             <br />
// //             Phone number: <em>{item.phone} </em>
// //             <br />
// //             Website: <em>{item.website} </em>
// //             <br />
// //             Company:
// //             <br />
// //             Company name: <em>{item.company.name} </em>
// //             <br />
// //             Catchphrase: <em>{item.company.catchPhrase} </em>
// //             <br />
// //             Business: <em>{item.company.bs} </em>
// //             <br />
// //             <hr />

// // Alternative way to render #2
// //              {users.contacts &&
// //         users.contacts.map((item) => (
// //           <div key={item.id}>
// //             {Object.entries(item).map((key) => (
// //               <p>
// //                 {" "}
// //                 <strong>{JSON.stringify(key[0])}</strong>:
// //                 {typeof key[1] !== "object"
// //                   ? JSON.stringify(key[1])
// //                   : Object.entries(key[1]).map((keyInner1) => (
// //                       <p>
// //                         <u> {JSON.stringify(keyInner1[0])}</u> :
// //                         {typeof keyInner1[1] !== "object"
// //                           ? JSON.stringify(keyInner1[1])
// //                           : Object.entries(keyInner1[1]).map((keyInner2) => (
// //                               <>
// //                                 <p>
// //                                   <em>{JSON.stringify(keyInner2[0])}</em> :
// //                                   {JSON.stringify(keyInner2[1])}
// //                                 </p>
// //                               </>
// //                             ))}
// //                       </p>
// //                     ))}
// //               </p>
// //             ))}
