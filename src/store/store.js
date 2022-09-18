import {configureStore} from "@reduxjs/toolkit"
import {LoginSlice} from "./LoginSlice"
import {RecipeSlice} from "../store/RecipeSlice"

const store = configureStore({
        reducer : {Auth: LoginSlice.reducer,Recipes: RecipeSlice.reducer},
})

export default store;