import React, {FC} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {logout} from "../../store/reducers/ActionCreators";
import {useAppDispatch} from "../../hooks/redux";
import {Link} from "react-router-dom";
export interface Header {
    isAuth: boolean;
    email: string;
}
const Header: FC<Header> = ({ isAuth, email}) => {
    const dispatch = useAppDispatch();
    return (
        <>
            <Container fluid  className="pt-2 pb-2 text-center">
                <Row>
                    <Col sm={4}>
                        <Link to="/">
                            <h1>Logo</h1>
                        </Link>
                    </Col>
                    <Col sm={4}>
                        <h4>{isAuth ? `Login successful ${email}` : 'Please login'}</h4>
                    </Col>
                    <Col sm={4} className="d-flex justify-content-center align-items-center " >
                        <Button variant="primary"  onClick={() => dispatch(logout())}>
                            Logout
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Header;