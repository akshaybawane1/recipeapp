import Card from "./Card"
import classes from "../Style/style.module.css"
import { useDispatch, useSelector } from "react-redux"
import RecipeActions from "../store/RecipeSlice"
import { useRef } from "react"

const AddIngredient = () => {
        const showIngredientForm = useSelector(state=>state.Recipes.showIngredientForm)
        const Recipes = useSelector(state => state.Recipes.Recipes)
        const selectedRecipeId = useSelector(state=>state.Recipes.selectedRecipe)
        const newIngred = useRef()
        const dispatch = useDispatch()

        const name = useSelector(state=>state.Recipes.EditFormInitialValues.name)
        const description = useSelector(state=>state.Recipes.EditFormInitialValues.description)
        const recipeImg = useSelector(state=>state.Recipes.EditFormInitialValues.recipeImg)
        const ingredients = useSelector(state=>state.Recipes.EditFormInitialValues.ingredients)
        const id = useSelector(state=>state.Recipes.EditFormInitialValues.id)


        const ThrottleError = ()=>{
          // console.log("Throttle Triggered")
          
          return function(){
                  document.getElementById("err").style.display = "block"
                  setTimeout(()=>{
                          document.getElementById("err").style.display = "none"
                  },3000)
          }
    }
  
    const func = ThrottleError()
  

        const handleSubmit = (e)=>{
                e.preventDefault()

                if (newIngred.current.value !== "") {
                  console.log("Valid Details")
                } else {
                  dispatch(RecipeActions.setErrorMsg("Please fill all fields"))
                  // const func = ThrottleError()
                  func()
                  // console.log("Error occured")
                  return
                }

                const newArr = Recipes.map((item)=>{
                        
                        if(item.id == selectedRecipeId){
                                const str = item.ingredients.concat(",",newIngred.current.value)
                                const newObj = {...item,ingredients : str}
                                item = newObj
                        }
                        return item
                })
                // console.log(newArr)
            dispatch(RecipeActions.editRecipe(newArr))
            dispatch(RecipeActions.ToggleIngredientForm())
            newIngred.current.value = ""
        }
  return (
    <Card className={`${classes.MyForm} ${classes.RecipeForm} ${showIngredientForm ? classes.show : ""}`}>
      <form onSubmit={handleSubmit}>
        <h1>Add new Ingredient</h1>
        <input ref={newIngred} placeholder="Name of Ingredient" />
        <div>
          <button className={classes.btnSm} type="submit">
            Add
          </button>
          <button onClick={(e)=>{e.preventDefault();dispatch(RecipeActions.ToggleIngredientForm())}} className={classes.btnSm}>
            Close
          </button>
        </div>
      </form>
    </Card>
  )
}

export default AddIngredient
