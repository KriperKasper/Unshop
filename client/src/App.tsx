import React,{FC, useEffect} from 'react';
import LoginForm from "./components/LoginForm/LoginForm";
import {ThemeProvider} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {checkAuth} from "./store/reducers/ActionCreators";
import {Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/header/header";
import ItemsList from "./components/ItemsList/ItemsList";
import Item from "./components/Item/Item";

const App: FC = () => {
    const {user,isAuth, isLoading} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
    }, []);
    if (isLoading){
        return (
            <div>Loading</div>
        )
    }
    if (!isAuth){
        return (
            <>
                <Header isAuth={isAuth} email={user.email}></Header>
                <LoginForm/>
            </>
        )
    }
    return (
        <ThemeProvider>
                <Header isAuth={isAuth} email={user.email}></Header>
                <Routes>
                    <Route path='/' element={
                        <ItemsList></ItemsList>
                    } />
                    <Route path='/item' element={
                        <Item></Item>
                    } />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
        </ThemeProvider>

    );
};

export default App;