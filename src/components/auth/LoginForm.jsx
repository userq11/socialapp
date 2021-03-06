import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormField, Label, Button, Segment, Divider } from "semantic-ui-react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import ModalContainer from "../modal/ModalContainer";
import { closeModal } from "../../redux/actions/modalActions";
import { signInWithEmailAndPass } from "../../firebase/authService";
import { notification } from "../../utils/notification";
import CustomLogin from "../helpers/CustomLogin";

const LoginFrom = () => {
  const dispatch = useDispatch();

  return (
    <ModalContainer size="mini" header="Sign In">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          setSubmitting(true);
          try {
            await signInWithEmailAndPass(values);
            setSubmitting(false);
            dispatch(closeModal());
            notification("Sign in successfully!");
          } catch (error) {
            setSubmitting(false);
            setErrors({ error: "Inavlid email or password" });
          }
        }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required()
        })}
      >
        {({ isValid, dirty, isSubmitting, errors }) => {
          return (
            <Form className="ui form">
              <FormField>
                <Field name="email" placeholder="Email" />
                <ErrorMessage
                  name="email"
                  render={(error) => (
                    <Label basic color="red">
                      {error}
                    </Label>
                  )}
                />
              </FormField>
              <FormField>
                <Field name="password" placeholder="Password" type="password" />
                <ErrorMessage
                  name="password"
                  render={(error) => (
                    <Label basic color="red">
                      {error}
                    </Label>
                  )}
                />
              </FormField>
              {errors.error ? (
                <Segment textAlign="center" inverted>
                  <Label basic color="red">
                    {errors.error}
                  </Label>
                </Segment>
              ) : null}
              <Button
                disabled={!isValid || !dirty || isSubmitting}
                loading={isSubmitting}
                type="submit"
                fluid
                size="large"
              >
                Sign In
              </Button>
              <Divider horizontal>Or</Divider>
              <CustomLogin />
            </Form>
          );
        }}
      </Formik>
    </ModalContainer>
  );
};

export default LoginFrom;
