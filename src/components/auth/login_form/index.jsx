import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Field,
  Control,
  Input,
  Column,
  Section,
  Help,
  Label,
} from "rbx";
import { Redirect } from "react-router-dom";
import UserService from "../../../services/users";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectRegister, setRedirectRegister] = useState(false);
  const [redirectNotes, setRedirectNotes] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const user = await UserService.login({
        email: email,
        password: password,
      });
      setRedirectNotes(true);
    } catch (error) {
      setError(true);
    }
  };

  if (redirectRegister === true)
    return <Redirect to={{ pathname: "/register" }} />;
  else if (redirectNotes) return <Redirect to={{ pathname: "/notes" }} />;

  return (
    <Fragment>
      <Column.Group centered>
        <form onSubmit={handleSubmit}>
          <Column size={12}>
            <Field>
              <Label size="small">Email:</Label>
              <Control>
                <Input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label size="small">Password:</Label>
              <Control>
                <Input
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Control>
                <Column.Group breakpoint="mobile">
                  <Column>
                    <a
                      className="button is-white has-text-custom-purple"
                      onClick={(e) => setRedirectRegister(true)}
                    >
                      Register or
                    </a>
                  </Column>
                  <Column>
                    <Button color="custom-purple" outlined>
                      Login
                    </Button>
                  </Column>
                </Column.Group>
              </Control>
            </Field>
            {error && <Help color="danger">Email or Password invalid</Help>}
          </Column>
        </form>
      </Column.Group>
    </Fragment>
  );
}

export default LoginForm;
