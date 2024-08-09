import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [
            {
                id: 1,
                name: 'Luong Bui',
                userName: 'luong123',
                email: 'luong@gmail.com',
                password: 'Luong@1311'
            }
        ],
        loggedInStatus: false,
        role: '',
        name: ''
    },
    reducers: {
        register(state: any, action) {
            state.users.push(action.payload);
        },
        login(state: any, action) {
            state.loggedInStatus =  action.payload;
        },
        getRole(state: any, action){
            state.role = action.payload;
        },
        getUserName(state: any, action){
            state.name =  action.payload
        }
    }
});

export const {register, login, getRole, getUserName} = userSlice.actions;

export default userSlice.reducer;