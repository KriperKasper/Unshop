import React, {FC} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

const Item: FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const {isAuth, isLoading} = useAppSelector(state => state.userReducer)
    if (!state){
        return (
            <div>
                <h3>Product</h3>
            </div>
        )
    }
    // @ts-ignore
    return (
        <>
            <Container  className="pt-2 pb-2">
                    <Row>
                        <Col sm={12} className="text-center pt-2 pb-5">
                            <div>
                                <h3>Product</h3>
                            </div>

                        </Col>
                        <Col sm={6} >
                            <img src={state["Image URL"]} alt="" style={{maxWidth: '400px'}}></img>
                        </Col>
                        <Col sm={6}  >
                            <p>{state["SKU"]}</p>
                            <h3>{state["Description"]}</h3>
                            <p>{state["Retail Price"]}</p>
                            <h6>stock {state["Total Stock"]}</h6>
                        </Col>
                    </Row>
            </Container>
        </>
    );
}

export default Item;