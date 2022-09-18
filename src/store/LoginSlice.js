import {createSlice} from "@reduxjs/toolkit"

const initialState = {token:false,name:""}

export const LoginSlice = createSlice({
        name: "LoginSclice",
        initialState : initialState,
        reducers : {
                Login(state,action){
                        state.token = action.payload
                }
        }
})

const LogInActions = LoginSlice.actions

export default LogInActions;