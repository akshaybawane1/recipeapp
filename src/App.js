import logo from "./logo.svg"
import "./App.css"
import Navbar from "./Components/Navbar"
import SignUp from "./Components/SignUpPage"
import AllRecipes from "./Components/AllRecipes"
import AddRecipeForm from "./Components/AddRecipeForm"
import { useSelector } from "react-redux"
import { HashRouter, BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import EditRecipeForm from "./Components/EditRecipeForm"
import AddIngredient from "./Components/AddIngredient"
import Favorites from "./Components/Favorite"
import Home from "./Components/Home"
import ErrorMsg from "./Components/ErrorMsg"

function App() {
  const token = useSelector(state => state.Auth.token)
  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={!token ? <SignUp /> : <Home />} />
          <Route path="/allRecipe" exact element={token ? <AllRecipes /> : <Navigate to="/" />} />
          <Route path="/favorites" exact element={token ? <Favorites /> : <Navigate to="/" />} />
        </Routes>

        <AddRecipeForm />
        <EditRecipeForm />
        <AddIngredient />
        <ErrorMsg />
      </HashRouter>
    </>
  )
}

export default App
