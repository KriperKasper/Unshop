import React, {FC, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {CellContainer, CellContent, CellContentLeft, CellContentRight} from "./itemslist.styled";
import {fetchProducts} from "../../store/reducers/ActionCreators";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import usePagination from "../../hooks/usePgination";
import {Link, redirect} from "react-router-dom";

const ItemsList: FC = () => {
    const dispatch = useAppDispatch();

    const {products, isLoading} = useAppSelector(state => state.userReducer)
    useEffect(() => {
        if (!products){
            dispatch(fetchProducts());
        }
    }, []);
    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        gaps,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: 3,
        count: products.length,
    });
    if (!products){
        return (
            <div>Loading</div>
        )
    }
    const renderRedirect = () => {
        redirect('/item');
    }

    return (
        <>
            <Container  className="pt-2 pb-2 text-center">
                <div className="items">
                <Row>
                        <Col sm={12} >
                            <h3>Products</h3>
                        </Col>
                    {products
                        .slice(firstContentIndex, lastContentIndex)
                        // @ts-ignore
                        .map((el: any) => (
                                    <Col sm={4} key={el["SKU"]} onClick={renderRedirect}>
                                        <Link to="/item" state={el}>
                                        <CellContainer>
                                            <img src={el["Image URL"]} alt=""></img>
                                            <CellContent>
                                                <CellContentLeft>
                                                    <p>{el.Description}</p>
                                                </CellContentLeft>
                                                <CellContentRight>
                                                    <h6>{el["Retail Price"]}грн</h6>
                                                </CellContentRight>
                                            </CellContent>
                                        </CellContainer>
                                        </Link>
                                    </Col>
                        ))}
                    </Row>
                </div>
                <div className="pagination">
                    <p className="text">
                        {page}/{totalPages}
                    </p>
                    <button
                        onClick={prevPage}
                        className={`page ${page === 1 && "disabled"}`}
                    >
                        &larr;
                    </button>
                    <button
                        onClick={() => setPage(1)}
                        className={`page ${page === 1 && "disabled"}`}
                    >
                        1
                    </button>
                    {gaps.before ? "..." : null}
                    {/* @ts-ignore */}
                    {gaps.paginationGroup.map((el) => (
                        <button
                            onClick={() => setPage(el)}
                            key={el}
                            className={`page ${page === el ? "active" : ""}`}
                        >
                            {el}
                        </button>
                    ))}
                    {gaps.after ? "..." : null}
                    <button
                        onClick={() => setPage(totalPages)}
                        className={`page ${page === totalPages && "disabled"}`}
                    >
                        {totalPages}
                    </button>
                    <button
                        onClick={nextPage}
                        className={`page ${page === totalPages && "disabled"}`}
                    >
                        &rarr;
                    </button>
                </div>
            </Container>
        </>
    );
}

export default ItemsList;