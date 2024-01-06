import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    user: null,
    otp: {
        email: "",
        hash: "",
    }
}

export const AuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setAuth: (state, action) => {
            const { user } = action.payload;
            state.user = user;
            if (user === null) {
                state.isAuth = false;
            } else {
                state.isAuth = true;
            }
        },

        SendOtp: (state, action) => {
            const { email, hash } = action.payload;
            state.otp.email = email;
            state.otp.hash = hash;
        }
    },
})


export const { setAuth, SendOtp } = AuthSlice.actions

export default AuthSlice.reducer