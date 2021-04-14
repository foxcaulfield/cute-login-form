import React, { useState, useEffect, useRef } from "react";
import * as axios from "axios";
import styles from "./Contacts.module.css";
import "./Contacts.module.css";

import {
  // Tabs,
  // Tab,
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
// import TextFieldMUI from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import TabsMUI from "@material-ui/core/Tabs";
import TabMUI from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ButtonMUI from "@material-ui/core/Button";
// import Grow from "@material-ui/core/Grow";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { TextField as TextFieldFMUI } from "formik-material-ui";
import { FlashAutoTwoTone } from "@material-ui/icons";

//for alert when contact successfully edited
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
// function TabPanelContactInfo(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box p={0.5}>{children}</Box>}
//     </div>
//   );
// }

// function a22yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//     display: "flex",
//     // height: 224,
//   },
//   contactTabs: {
//     borderRight: `1px solid ${theme.palette.divider}`,
//   },
//   // indicator: {
//   //   // left: "0px",
//   // },
// }));

//custom toggle for accordion custom toggle
function CustomToggle({
  children,
  eventKey,
  onClickSideBehaviour,
  type,
  isFullWidth = false,
  variant = "outlined",
  color = "primary",
  disabled = false,
}) {
  const decoratedOnClick = useAccordionToggle(eventKey, onClickSideBehaviour);

  return (
    <ButtonMUI
      fullWidth={isFullWidth}
      type={type}
      variant={variant}
      color={color}
      onClick={decoratedOnClick}
      disabled={disabled}
    >
      {children}
    </ButtonMUI>
  );
}

//prevent submit on enter
function onKeyDown(keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}

function Contacts(props) {
  //experemental behaviour for deleting users wit modal dialog
  const [idToDelete, setIdToDelete] = useState(null);

  //for deleting contact confirmation alert dialog
  const [
    openDeletingContactConfirmationAlertDialog,
    setOpenDeletingContactConfirmationAlertDialog,
  ] = React.useState(false);

  const handleClickOpenDeletingContactConfirmationAlertDialog = (contactId) => {
    // let handleContactId = contactId;
    // alert(contactId);
    // console.log("props here");
    // console.log(users);
    setIdToDelete(contactId);

    setOpenDeletingContactConfirmationAlertDialog(true);
    //ASYNCH BEHAVIOR HERE
  };

  const handleCloseDeletingContactConfirmationAlertDialog = () => {
    setOpenDeletingContactConfirmationAlertDialog(false);
  };

  // hook for contact is editing
  // const [isEditingContact, setIsEditingContact] = React.useState(false);

  //hook for alert when contact successfully edited
  const [openAlertContactEdited, setOpenAlertContactEdited] = React.useState(
    false
  );

  const handleOpenAlertContactEdited = () => {
    setOpenAlertContactEdited(true);
  };

  const handleCloseAlertContactEdited = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertContactEdited(false);
  };

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
      //add isEditing value
      const newData = data.map((el) => {
        return { ...el, isEditing: false };
      });
      setUsers({ contacts: newData });
      // setUsers({ contacts: data });
      // console.log(data);
      // console.log(newData);
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
    } else if (value.length > 25) {
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
    } else if (value.length > 25) {
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

  //search
  const [searchTerm, setSearchTerm] = React.useState("");

  const [searchResults, setSearchResults] = React.useState([]);

  const handleChangeSearchTerm = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const results = users.contacts.filter(
      (person) => person.name.toLowerCase().includes(searchTerm.toLowerCase())
      // console.log(person.name)
      // console.log(person.phone)
    );
    console.log(results);
    setSearchResults(results);
  }, [searchTerm, users.contacts]);

  return (
    <div className={styles.contactsContainer}>
      {/* BUTTON EXPERIMENT */}

      {/* <Button
                                      variant="outlined"
                                      color="primary"
                                      onClick={handleClickOpenDeletingContactConfirmationAlertDialog}
                                      >
                                      Open alert dialog
                                      </Button> */}
      <Dialog
        open={openDeletingContactConfirmationAlertDialog}
        onClose={handleCloseDeletingContactConfirmationAlertDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete contact?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Contact will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonMUI
            onClick={() => {
              //clean idToDelete
              setIdToDelete(null);

              handleCloseDeletingContactConfirmationAlertDialog();
            }}
            color="primary"
          >
            Cancel
          </ButtonMUI>

          <ButtonMUI
            onClick={() => {
              //deleting the contact
              setUsers({
                contacts: users.contacts.filter((el) => el.id !== idToDelete),
              });
              //clean idToDelete
              setIdToDelete(null);

              handleCloseDeletingContactConfirmationAlertDialog();
              // setUsers({
              //   contacts: users.contacts.filter((el) => el.id !== item.id),
              // });
            }}
            color="secondary"
            autoFocus
          >
            Delete
          </ButtonMUI>
        </DialogActions>
      </Dialog>
      {/* BUTTON EXPERIMENT */}
      {/* ALERT MESSAGE FOR CONTACT EDITED */}
      <Snackbar
        open={openAlertContactEdited}
        autoHideDuration={6000}
        onClose={handleCloseAlertContactEdited}
      >
        <Alert onClose={handleCloseAlertContactEdited} severity="success">
          Success!
        </Alert>
      </Snackbar>
      {/* END ALERT MESSAGE FOR CONTACT EDITED */}

      <Container>
        {/* ACCORDION WITH ADD CONTACT FORM */}
        <Accordion defaultActiveKey="0">
          {/* NAVBAR */}
          <Navbar bg="dark" variant="dark" expand sticky>
            <Navbar.Brand href="#home">Contacts</Navbar.Brand>
            <Nav className="mr-auto">
              <CustomToggle
                eventKey="0"
                variant="contained"
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
                onChange={handleChangeSearchTerm}
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar>
          {/* END NAVBAR */}

          <Card>
            <Accordion.Collapse eventKey="0" in={openAddContact}>
              <Card.Body>
                {/* FORMIK FOR ADD CONTACT SUBMIT*/}
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
                    // set users with new contact
                    setUsers({
                      contacts: users.contacts
                        // .slice(0)
                        .concat(subData.values),
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
                      {/* ADD CONTACT TOP REQUIRED FIELDS */}
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
                      {/* END ADD CONTACT  TOP REQUIRED FIELDS */}

                      {/*  ADD CONTACT  TABS WITH INPUTS */}
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

                      {/* ADD CONTACT  FIRST TAB (INFO)*/}
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
                      {/* END ADD CONTACT  FIRST TAB (INFO) */}

                      {/* ADD CONTACT SECOND TAB (ADDRESS) */}
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
                              name="c"
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
                      {/* ADD CONTACT END SECOND TAB (ADDRESS) */}

                      {/* ADD CONTACT THIRD TAB (COMPANY) */}
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
                      {/* ADD CONTACT END THIRD TAB (COMPANY) */}

                      {/* ADD CONTACT  BUTTONS TO SUBMIT AND REST FORM */}
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
                      {/* END ADD CONTACT BUTTONS TO SUBMIT AND REST FORM */}
                    </FormikForm>
                  )}
                  {/* END FORMIK FORM */}
                </Formik>
                {/* END FORMIK FOR ADD CONTACT SUBMIT*/}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {/* END ACCORDION WITH ADD CONTACT FORM */}

        {/* DEFINE CLASSNAME TO REVERSE CARDS DISPLAY IN CSS*/}
        <div className={styles.contactCards}>
          {/* CONTACT CARD */}
          {/* {users.contacts &&
            users.contacts.map((item) => { */}
          {/* EXPEREMENT */}
          {/* EXPEREMENT */}
          {/* {users.contacts || searchResults && */}
          {users.contacts &&
            searchResults.map((item) => {
              return (
                <>
                  <div key={item.id} className={styles.contactCard}>
                    <Accordion>
                      {/* AVATAR & NAME & PHONE */}
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

                          <CustomToggle
                            eventKey="1"
                            onClickSideBehaviour={() => {
                              // alert(item.id);
                              setUsers({
                                contacts: users.contacts.map((el) => {
                                  if (el.id === item.id) {
                                    el.isEditing = !el.isEditing;
                                  }
                                  return el;
                                }),
                              });
                            }}
                          >
                            Profile
                          </CustomToggle>
                        </Col>
                      </Row>
                      {/* END AVATAR & NAME & PHONE */}

                      {/* ACCORDION WITH CONTACT INFORMATION TABS */}
                      <Card>
                        <Accordion.Collapse eventKey="1" in={item.isEditing}>
                          <Card.Body>
                            {/* CONTACT INFORMATION FORM WITH INPUTS */}
                            <Formik
                              initialValues={{
                                id: item.id,
                                name: item.name,
                                username: item.username,
                                email: item.email,
                                address: {
                                  street: item.address.street,
                                  suite: item.address.suite,
                                  city: item.address.city,
                                  zipcode: item.address.zipcode,
                                  geo: {
                                    lat: item.address.geo.lat,
                                    lng: item.address.geo.lng,
                                  },
                                },
                                phone: item.phone,
                                website: item.website,
                                company: {
                                  name: item.company.name,
                                  catchPhrase: item.company.catchPhrase,
                                  bs: item.company.bs,
                                },
                              }}
                              onSubmit={(values, actions) => {
                                // props.handleSubmit();
                                // console.log(actions);
                                actions.setSubmitting(true);
                                // actions.setSubmitting(true);
                                // alert(JSON.stringify(values, null, 2));

                                //figure out which card to edit
                                // setUsers({
                                //   contacts: users.contacts.map((el) => {
                                //     if (el.id === item.id) {
                                //       return (el = values);
                                //     }
                                //     return el;
                                //   }),
                                // });

                                setUsers({
                                  contacts: users.contacts.map((el) => {
                                    if (el.id === item.id) {
                                      el = values;
                                      el.isEditing = !el.isEditing;
                                      if (el.isEditing === true) {
                                        el.isEditing = false;
                                      }
                                    }
                                    //reset form for proper validation
                                    actions.resetForm({ values: el });
                                    return el;
                                  }),
                                });
                                // setUsers({
                                //   contacts: users.contacts.map((el) => {
                                //     if (el.id === item.id) {
                                //       el = values;

                                //       // setTimeout(
                                //         (el.isEditing = !el.isEditing),
                                //         // 1000
                                //       // );

                                //       if (el.isEditing === true) {
                                //         // setTimeout(
                                //           (el.isEditing = false),
                                //           // 1000
                                //         // );
                                //       }
                                //     }
                                //     //reset form for proper validation
                                //     // setTimeout(
                                //       actions.resetForm({ values: el }),
                                //       // 1000
                                //     // );
                                //     // return el;
                                //     return el;
                                //   }),
                                // });
                                // }, 1000);
                                // setUsers({
                                //   contacts: users.contacts.map((el) => {
                                //     if (el.id === item.id) {
                                //       el.isEditing = false;
                                //     }
                                //     return el;
                                //   }),
                                // });
                                setTimeout(() => {
                                  actions.setSubmitting(false);
                                  handleOpenAlertContactEdited();
                                }, 1000);
                                // setIsEditingContact(false);
                                // isOpen = false;
                              }}
                            >
                              {(props) => (
                                <FormikForm
                                // onChange={(e) => console.log(props)}
                                // onBlur={props.handleBlur}
                                // disabled={true}
                                // onSubmit={() => props.setSubmitting(true)}
                                >
                                  <Field
                                    component={TextFieldFMUI}
                                    // disabled={true}
                                    name="name"
                                    label="Name:"
                                    validate={validateName}
                                    fullWidth
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    // variant="filled"
                                    size="small"
                                    InputProps={{
                                      // readOnly: false,
                                      endAdornment: (
                                        <ButtonMUI
                                          // variant="contained"
                                          color="primary"
                                        >
                                          <EditOutlinedIcon />
                                        </ButtonMUI>
                                      ),
                                    }}
                                  />

                                  <Field
                                    component={TextFieldFMUI}
                                    // disabled={true}
                                    name="phone"
                                    label="Phone:"
                                    validate={validatePhoneNumber}
                                    fullWidth
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    // variant="filled"
                                    size="small"
                                    InputProps={{
                                      readOnly: false,
                                      endAdornment: (
                                        <ButtonMUI
                                          // variant="contained"
                                          color="primary"
                                        >
                                          <EditOutlinedIcon />
                                        </ButtonMUI>
                                      ),
                                    }}
                                  />

                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                      Info
                                      <Field
                                        component={TextFieldFMUI}
                                        // disabled={true}
                                        name="username"
                                        label="Skype login:"
                                        fullWidth
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // variant="filled"
                                        size="small"
                                        InputProps={{
                                          readOnly: false,
                                          endAdornment: (
                                            <ButtonMUI
                                              // variant="contained"
                                              color="primary"
                                            >
                                              <EditOutlinedIcon />
                                            </ButtonMUI>
                                          ),
                                        }}
                                      />
                                      <Field
                                        component={TextFieldFMUI}
                                        // disabled={true}
                                        type="email"
                                        name="email"
                                        label="Email:"
                                        validate={validateEmail}
                                        fullWidth
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // variant="filled"
                                        size="small"
                                        InputProps={{
                                          readOnly: false,
                                          endAdornment: (
                                            <ButtonMUI
                                              // variant="contained"
                                              color="primary"
                                            >
                                              <EditOutlinedIcon />
                                            </ButtonMUI>
                                          ),
                                        }}
                                      />
                                      <Field
                                        component={TextFieldFMUI}
                                        // disabled={true}
                                        name="website"
                                        label="Website:"
                                        fullWidth
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // variant="filled"
                                        size="small"
                                        InputProps={{
                                          readOnly: false,
                                          endAdornment: (
                                            <ButtonMUI
                                              // variant="contained"
                                              color="primary"
                                            >
                                              <EditOutlinedIcon />
                                            </ButtonMUI>
                                          ),
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                      Address
                                      <Field
                                        component={TextFieldFMUI}
                                        // disabled={true}
                                        name="address.street"
                                        label="Street:"
                                        fullWidth
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // variant="filled"
                                        size="small"
                                        InputProps={{
                                          readOnly: false,
                                          endAdornment: (
                                            <ButtonMUI
                                              // variant="contained"
                                              color="primary"
                                            >
                                              <EditOutlinedIcon />
                                            </ButtonMUI>
                                          ),
                                        }}
                                      />
                                      <Field
                                        component={TextFieldFMUI}
                                        // disabled={true}
                                        name="address.city"
                                        label="City:"
                                        fullWidth
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // variant="filled"
                                        size="small"
                                        InputProps={{
                                          readOnly: false,
                                          endAdornment: (
                                            <ButtonMUI
                                              // variant="contained"
                                              color="primary"
                                            >
                                              <EditOutlinedIcon />
                                            </ButtonMUI>
                                          ),
                                        }}
                                      />
                                      <Field
                                        component={TextFieldFMUI}
                                        // disabled={true}
                                        name="address.zipcode"
                                        label="Zipcode:"
                                        fullWidth
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // variant="filled"
                                        size="small"
                                        InputProps={{
                                          readOnly: false,
                                          endAdornment: (
                                            <ButtonMUI
                                              // variant="contained"
                                              color="primary"
                                            >
                                              <EditOutlinedIcon />
                                            </ButtonMUI>
                                          ),
                                        }}
                                      />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                      Company
                                      <Field
                                        component={TextFieldFMUI}
                                        // disabled={true}
                                        name="company.name"
                                        label="Company name:"
                                        fullWidth
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // variant="filled"
                                        size="small"
                                        InputProps={{
                                          readOnly: false,
                                          endAdornment: (
                                            <ButtonMUI
                                              // variant="contained"
                                              color="primary"
                                            >
                                              <EditOutlinedIcon />
                                            </ButtonMUI>
                                          ),
                                        }}
                                      />
                                      <Field
                                        component={TextFieldFMUI}
                                        // disabled={true}
                                        name="company.catchPhrase"
                                        label="Catchphrase:"
                                        fullWidth
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // variant="filled"
                                        size="small"
                                        InputProps={{
                                          readOnly: false,
                                          endAdornment: (
                                            <ButtonMUI
                                              // variant="contained"
                                              color="primary"
                                            >
                                              <EditOutlinedIcon />
                                            </ButtonMUI>
                                          ),
                                        }}
                                      />
                                      <Field
                                        component={TextFieldFMUI}
                                        // disabled={true}
                                        name="company.bs"
                                        label="Business:"
                                        fullWidth
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        // variant="filled"
                                        size="small"
                                        InputProps={{
                                          readOnly: false,
                                          endAdornment: (
                                            <ButtonMUI
                                              // variant="contained"
                                              color="primary"
                                            >
                                              <EditOutlinedIcon />
                                            </ButtonMUI>
                                          ),
                                        }}
                                      />
                                    </Grid>
                                  </Grid>

                                  <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={9} lg={9}>
                                      {/* <button type="submit">ok</button> */}
                                      {props.dirty && (
                                        <CustomToggle
                                          isFullWidth={true}
                                          type="submit"
                                          eventKey="1"
                                          variant="contained"
                                          // disabled={props.handleSubmit()}
                                          disabled={props.isSubmitting}
                                        >
                                          Save
                                        </CustomToggle>
                                      )}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                      <ButtonMUI
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                          // setUsers({
                                          //   contacts: users.contacts.filter(
                                          //     (el) => el.id !== item.id
                                          //   ),
                                          // });
                                          handleClickOpenDeletingContactConfirmationAlertDialog(
                                            item.id
                                          );
                                        }}
                                      >
                                        DELETE
                                      </ButtonMUI>
                                    </Grid>
                                  </Grid>
                                </FormikForm>
                              )}
                            </Formik>

                            {/*END CONTACT INFORMATION FORM WITH INPUTS */}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      {/* END ACCORDION WITH INFORMATION TABS */}
                    </Accordion>
                  </div>
                </>
              );
            })}
          {/*END CONTACT CARD */}
        </div>
      </Container>
    </div>
  );
}

export default Contacts;
