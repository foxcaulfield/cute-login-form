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
  Container,
  Row,
  Col,
  Image,
  Accordion,
  Card,
  useAccordionToggle,
  // Collapse,
} from "react-bootstrap";

import { Formik, Field, Form as FormikForm } from "formik";

import { makeStyles } from "@material-ui/core/styles";
import TextFieldMUI from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import TabsMUI from "@material-ui/core/Tabs";
import TabMUI from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ButtonMUI from "@material-ui/core/Button";
// import Grow from "@material-ui/core/Grow";

import { TextField as TextFieldFMUI } from "formik-material-ui";

//tab panel for add contact
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//tab panel for contact info
function TabPanelContactInfo(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a22yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    // height: 224,
  },
  contactTabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

//custom toggle for accordion
function CustomToggle({ children, eventKey, onClickSideBehaviour }) {
  const decoratedOnClick = useAccordionToggle(eventKey, onClickSideBehaviour);

  return (
    <Button variant="info" onClick={decoratedOnClick}>
      {children}
    </Button>
  );
}

//prevent submit on enter
function onKeyDown(keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}

function Contacts(props) {
  //hook for tabs from material-ui (select the tab on add contact)
  const [valueAddContactTabs, setValueAddContactTabs] = React.useState(0);

  const handleChangeAddContactTabs = (event, newValue) => {
    setValueAddContactTabs(newValue);
  };

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

  //validation
  function validateName(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (value.length > 15) {
      error = "Too long";
    } else if (value === "admin") {
      error = "Nice try!";
    }
    return error;
  }

  function validatePhoneNumber(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (value.length > 15) {
      error = "Too long";
    }
    return error;
  }

  function validateEmail(value) {
    let error;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) && value) {
      error = "Invalid email address";
    }
    return error;
  }

  //add contact accordion toggler
  const [openAddContact, setOpenAddContact] = useState(false);

  //for show add contact tab indicator on first load
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("resize"));
  }, [openAddContact]);

  //for vertical tabs on contact info
  const classes = useStyles();
  const [valueContactInfoTab, setValueContactInfoTab] = React.useState(0);

  const handleChangeContactInfoTab = (event, newValue) => {
    setValueContactInfoTab(newValue);
  };

  return (
    <div className={styles.contactsContainer}>
      <Container>
        {/* ACCORDION WITH ADD CONTACT FORM */}
        <Accordion defaultActiveKey="0">
          {/* NAVBAR */}
          <Navbar bg="dark" variant="dark" expand sticky="top">
            <Navbar.Brand href="#home">Contacts</Navbar.Brand>
            <Nav className="mr-auto">
              <CustomToggle
                eventKey="0"
                onClickSideBehaviour={() => {
                  setOpenAddContact(!openAddContact);
                }}
              >
                {openAddContact ? "Cancel" : "Add contact"}
              </CustomToggle>
            </Nav>

            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
          {/* END NAVBAR */}

          <Card>
            <Accordion.Collapse eventKey="0" in={openAddContact}>
              <Card.Body>
                {/* FORMIK FOR SUBMIT*/}
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
                        lat: "-14.3990",
                        lng: "-120.7677",
                      },
                    },
                    phone: "",
                    website: "",
                    company: {
                      name: "",
                      catchPhrase: "",
                      bs: "",
                    },
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
                    let subData = data;
                    subData.values.id = users.contacts.length + 1;
                    //set users
                    setUsers({
                      contacts: users.contacts
                        .reverse()
                        .concat(subData.values)
                        .reverse(),
                    });
                    //reset form
                    resetForm();
                    //collapse the accordion
                    setOpenAddContact(false);
                  }}
                >
                  {/* FORMIK FORM */}
                  {({ errors, touched, isValidating }) => (
                    <FormikForm onKeyDown={onKeyDown}>
                      {/* TOP REQUIRED FIELDS */}
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Field
                            component={TextFieldFMUI}
                            id="name"
                            name="name"
                            label="Fullname"
                            variant="outlined"
                            validate={validateName}
                            helperText="Enter name"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Field
                            component={TextFieldFMUI}
                            id="phone"
                            name="phone"
                            label="Phone"
                            variant="outlined"
                            type="text"
                            validate={validatePhoneNumber}
                            helperText="Enter phone number"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      {/* END TOP REQUIRED FIELDS */}

                      {/* TABS WITH INPUTS */}
                      <TabsMUI
                        variant="fullWidth"
                        value={valueAddContactTabs}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChangeAddContactTabs}
                      >
                        <TabMUI label="Info" {...a11yProps(0)} selected />
                        <TabMUI label="Address" {...a11yProps(1)} />
                        <TabMUI label="Company" {...a11yProps(2)} />
                        {/* <TabMUI fullwidth label="Info"/>
                          
                        <TabMUI fullwidth label="Address" />
                        <TabMUI fullwidth label="Company" /> */}
                      </TabsMUI>

                      {/* FIRST TAB (INFO)*/}
                      <TabPanel value={valueAddContactTabs} index={0}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Field
                              component={TextFieldFMUI}
                              id="username"
                              name="username"
                              label="Skype"
                              variant="outlined"
                              type="text"
                              // validate={validatePhoneNumber}
                              // helperText="Enter Skype login"
                              fullWidth
                            />
                          </Grid>
                          {/* {errors.name && touched.name && <div>{errors.name}</div>} */}
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Field
                              component={TextFieldFMUI}
                              id="email"
                              name="email"
                              label="Email"
                              variant="outlined"
                              type="email"
                              validate={validateEmail}
                              // helperText="Enter email"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Field
                              component={TextFieldFMUI}
                              id="website"
                              name="website"
                              label="Website"
                              variant="outlined"
                              type="text"
                              // validate={validatePhoneNumber}
                              // helperText="Enter email"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </TabPanel>
                      {/* END FIRST TAB (INFO) */}

                      {/* SECOND TAB (ADDRESS) */}
                      <TabPanel value={valueAddContactTabs} index={1}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Field
                              component={TextFieldFMUI}
                              id="street"
                              name="address.street"
                              label="Street"
                              variant="outlined"
                              type="text"
                              // validate={validatePhoneNumber}
                              // helperText="Enter email"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Field
                              component={TextFieldFMUI}
                              id="zipcode"
                              name="address.zipcode"
                              label="Zipcode"
                              variant="outlined"
                              type="text"
                              // validate={validatePhoneNumber}
                              // helperText="Enter email"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Field
                              component={TextFieldFMUI}
                              id="city"
                              name="address.city"
                              label="City"
                              variant="outlined"
                              type="text"
                              // validate={validatePhoneNumber}
                              // helperText="Enter email"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </TabPanel>
                      {/* END SECOND TAB (ADDRESS) */}

                      {/* THIRD TAB (COMPANY) */}
                      <TabPanel value={valueAddContactTabs} index={2}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Field
                              component={TextFieldFMUI}
                              id="companyName"
                              name="company.name"
                              label="Company name"
                              variant="outlined"
                              type="text"
                              // validate={validatePhoneNumber}
                              // helperText="Enter email"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Field
                              component={TextFieldFMUI}
                              id="catchPhrase"
                              name="company.catchPhrase"
                              label="Catchphrase"
                              variant="outlined"
                              type="text"
                              // validate={validatePhoneNumber}
                              // helperText="Enter email"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={4} lg={4}>
                            <Field
                              component={TextFieldFMUI}
                              id="bs"
                              name="company.bs"
                              label="Business"
                              variant="outlined"
                              type="text"
                              // validate={validatePhoneNumber}
                              // helperText="Enter email"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </TabPanel>
                      {/* END THIRD TAB (COMPANY) */}

                      {/* BUTTONS TO SUBMIT AND REST FORM */}
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <ButtonMUI
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            // disabled
                          >
                            Add
                          </ButtonMUI>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <ButtonMUI
                            // variant="contained"
                            color="primary"
                            type="reset"
                            fullWidth
                            // disabled
                          >
                            Reset
                          </ButtonMUI>
                        </Grid>
                      </Grid>
                      {/* END BUTTONS TO SUBMIT AND REST FORM */}
                    </FormikForm>
                  )}
                  {/* END FORMIK FORM */}
                </Formik>
                {/* END FORMIK FOR SUBMIT*/}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {/* END ACCORDION WITH ADD CONTACT FORM */}

        {/* CONTACT CARD */}
        {users.contacts &&
          users.contacts.map((item) => (
            // <Row>
            <>
              <div key={item.id} className={styles.contactCard}>
                <Accordion>
                  {/* AVATAR & NAME & PHONE */}
                  <Row xs={1} sm={1} md={2} lg={2}>
                    <Col className={styles.avatarAndNameCol}>
                      <Image
                        className={styles.avatar}
                        // src={`https://picsum.photos/200?random=${item.id}`}
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
                  {/* END AVATAR & NAME & PHONE */}

                  {/* ACCORDION WITH INFORMATION TABS */}
                  <Card>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        {/* <Tabs defaultActiveKey="Bio" id="contactTab">
                          <Tab
                            eventKey="Bio"
                            title="Bio"
                            className={styles.contactTab}
                          >
                            <strong>Nickname:</strong> <em>{item.username}</em>
                            <br />
                            <strong>Email:</strong> <em>{item.email}</em>
                            <br />
                            <strong>Website:</strong> <em>{item.website}</em>
                          </Tab>
                          <Tab
                            eventKey="Address"
                            title="Address"
                            className={styles.contactTab}
                          >
                            <strong>Street:</strong>{" "}
                            <em>{item.address.street}</em>
                            <br />
                           
                            <strong>City:</strong> <em>{item.address.city}</em>
                            <br />
                            <strong>Zipcode:</strong>{" "}
                            <em>{item.address.zipcode}</em>
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
                        </Tabs> */}

                        <div className={classes.root}>
                          <TabsMUI
                            orientation="vertical"
                            variant="scrollable"
                            value={valueContactInfoTab}
                            onChange={handleChangeContactInfoTab}
                            className={classes.contactTabs}
                          >
                            <TabMUI label="Info" {...a22yProps(0)} />
                            <TabMUI label="Address" {...a22yProps(1)} />
                            <TabMUI label="Company" {...a22yProps(2)} />
                          </TabsMUI>
                          <TabPanelContactInfo
                            value={valueContactInfoTab}
                            index={0}
                          >
                            Item One
                            <TextFieldMUI
                              id="filled-full-width"
                              label="Label"
                              style={{ margin: 8 }}
                              placeholder="Placeholder"
                              helperText="Full width!"
                              fullWidth
                              margin="normal"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="filled"
                            />
                            <strong>Nickname:</strong> <em>{item.username}</em>
                            <br />
                            <strong>Email:</strong> <em>{item.email}</em>
                            <br />
                            <strong>Website:</strong> <em>{item.website}</em>
                          </TabPanelContactInfo>
                          <TabPanelContactInfo
                            value={valueContactInfoTab}
                            index={1}
                          >
                            Item Two
                            <strong>Street:</strong>{" "}
                            <em>{item.address.street}</em>
                            <br />
                            {/* <strong>Suite:</strong>{" "}
                            <em>{item.address.suite}</em>
                            <br /> */}
                            <strong>City:</strong> <em>{item.address.city}</em>
                            <br />
                            <strong>Zipcode:</strong>{" "}
                            <em>{item.address.zipcode}</em>
                          </TabPanelContactInfo>
                          <TabPanelContactInfo
                            value={valueContactInfoTab}
                            index={2}
                          >
                            Item Three
                            <strong>Company name</strong>:{" "}
                            <em>{item.company.name}</em>
                            <br />
                            <strong> Catchphrase:</strong>
                            <em>{item.company.catchPhrase}</em>
                            <br />
                            <strong>Business:</strong>{" "}
                            <em>{item.company.bs}</em>
                          </TabPanelContactInfo>
                        </div>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  {/* END ACCORDION WITH INFORMATION TABS */}
                </Accordion>
              </div>
            </>
          ))}
        {/*END CONTACT CARD */}
      </Container>
    </div>
  );
}

export default Contacts;
