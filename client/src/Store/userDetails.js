import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    fullName: "",
    phone: "",
    avatar: "",
}

export const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {

        setFullName: (state, action) => {
            state.fullName = action.payload;
        },

        setPhone: (state, action) => {
            state.phone = action.payload;
        },

        setAvatar: (state, action) => {
            state.avatar = action.payload;
        }
    },
})


export const { setFullName, setAvatar, setPhone } = detailsSlice.actions

export default detailsSlice.reducer