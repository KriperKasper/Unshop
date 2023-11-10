import {IUser} from '../../models/IUser'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user: IUser;
    products: string;
    isAuth: boolean;
    isLoading: boolean;
    users: IUser[];
    error: string;
}

const initialState: UserState = {
    user: {} as IUser,
    isAuth: false,
    products: "",
    isLoading : false,
    users: [],
    error: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
            setAuth(state, action: PayloadAction<boolean>) {
                state.isAuth = action.payload;
            },
            setUser(state, action: PayloadAction<IUser>) {
                state.user = action.payload;
            },
            setUsers(state, action: PayloadAction<IUser[]>) {
                state.users = action.payload;
            },
            setLoading(state, action: PayloadAction<boolean>) {
                state.isLoading = action.payload;
            },
            setProducts(state, action: PayloadAction<string>) {
                state.products = action.payload;
            },
    }
})

export default userSlice.reducer;