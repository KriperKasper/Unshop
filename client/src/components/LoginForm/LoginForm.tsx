import React, {FC, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useAppDispatch} from "../../hooks/redux";
import {login, registration} from "../../store/reducers/ActionCreators";
import {Col, Container, Row} from "react-bootstrap";
const LoginForm: FC  = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const handleLogin = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        dispatch(login(email,password))
    };
    const handleRegistration = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        dispatch(registration(email,password));
    };
    return (
        <Container  className="pt-2 pb-2 ">
            <Row className="justify-content-center">
                <Col sm={6} className="text-center pt-2 pb-5">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>
                        <Row className="justify-content-center">
                            <Col sm={6}>
                                <Button variant="primary" type="submit" onClick={handleLogin}>
                                    Login
                                </Button>
                            </Col>
                            <Col sm={6}>
                                <Button variant="primary" type="submit" onClick={handleRegistration}>
                                    Registration
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;