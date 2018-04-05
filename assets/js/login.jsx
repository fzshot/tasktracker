import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {Layout, Button, Form, Input, Alert, Message} from "element-react";

import api from "./api";
import store from "./store";

function Login(props) {
    console.log(props);
    return <LoginForm login={props.login}/>;
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: props.login,
            model: {
                email: "",
                password: "",
            },
            rule: {
              email: [
                  {required: true, message: "This field is required"},
                  {type: "email", message: "Please enter a valid email address"}
              ],
              password: [
                  {required: true, message: "This field is required"},
              ],
            },
        };
    }

    onChange(key, value) {
        this.setState({
            model: Object.assign({}, this.state.model, {[key]: value})
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({login: false});

        let email = $("#email").val();
        let pass = $("#password").val();

        let text = {
            email: email,
            pass: pass,
        };

        $.ajax(token_path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(text),
            success: (resp) => {
                Message({
                    message: "success",
                    type: "success",
                });
                this.setState({login: false});
                store.dispatch({
                    type: "SET_TOKEN",
                    token: resp,
                });
            },
            error: () => {
                Message({
                    message: "wrong pass",
                    type: "error",
                });
                this.setState({login: true});
            }
        });
    }

    render() {
      return(
          <div>
              <Layout.Row type="flex" justify="center" align="middle">
                  <Layout.Col span="12">
                        <h3>Login</h3>
                        <Warning login={this.state.login}/>
                        <Form model={this.state.model} rules={this.state.rule}
                              onSubmit={this.onSubmit.bind(this)}>
                            <Form.Item label="Email address" prop="email">
                                <Input id="email" onChange={this.onChange.bind(this, "email")} />
                            </Form.Item>
                            <Form.Item label="Password" prop="password">
                                <Input id="password" onChange={this.onChange.bind(this, "password")}/>
                            </Form.Item>
                            <Layout.Row type="flex" justify="space-between" align="middle">
                                <Layout.Col span="6">
                                    <Button nativeType="submit" type="primary">
                                        Submit
                                    </Button>
                                </Layout.Col>
                                <Layout.Col span="6" style={{textAlign: "right"}}>
                                    <Link to="/newuser">
                                        New User
                                    </Link>
                                </Layout.Col>
                            </Layout.Row>
                        </Form>
                  </Layout.Col>
              </Layout.Row>
          </div>
      );
    };
}

function Warning(props) {
    let login = props.login;
    if (login) {
        return(
          <Alert title="Incorrect Email or Password!" type="error" showIcon={true}/>
        );
    } else {
        return null;
    }
}

function state2props(state) {
    return {
        login: state.login,
    };
}

export default connect(state2props)(Login)
