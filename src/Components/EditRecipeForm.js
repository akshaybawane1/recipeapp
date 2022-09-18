import Card from "./Card"
import classes from "../Style/style.module.css"
import { useDispatch, useSelector } from "react-redux"
import RecipeActions from "../store/RecipeSlice"
import { useRef, useState } from "react"

const EditRecipeForm = () => {
  const showEditForm = useSelector(state => state.Recipes.showEditForm)
  const Recipes = useSelector(state => state.Recipes.Recipes)
  const dispatch = useDispatch()

  const initalDetails = useSelector(state => state.Recipes.EditFormInitialValues.name)
  const name = useSelector(state => state.Recipes.EditFormInitialValues.name)
  const description = useSelector(state => state.Recipes.EditFormInitialValues.description)
  const recipeImg = useSelector(state => state.Recipes.EditFormInitialValues.recipeImg)
  const ingredients = useSelector(state => state.Recipes.EditFormInitialValues.ingredients)
  const favorite = useSelector(state => state.Recipes.EditFormInitialValues.favorite)
  const id = useSelector(state => state.Recipes.EditFormInitialValues.id)
//   const ThrottleError = useSelector(state => state.Recipes.ThrottleError)

  const newName = useRef()
  const newDesc = useRef()
  const newIngred = useRef()
  const [ImgCode, setImgCode] = useState("")

  //   const ChangeName = e => {
  //         console.log(name)
  //         dispatch(RecipeActions.setEditFormInitialValues({...initalDetails,name:e.target.value}))
  //   }
  //   const ChangeDesc = e => {
  //         dispatch(RecipeActions.setEditFormInitialValues({...initalDetails,description:e.target.value}))
  //   }
  //   const ChangeIngred = e => {
  //         dispatch(RecipeActions.setEditFormInitialValues({...initalDetails,ingredients:e.target.value}))
  //   }


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

  const ChangeFile = e => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    console.log(file)
    if (file) {
      reader.onload = () => {
        setImgCode(reader.result)
        // console.log(reader.result)
      }
      // this.props.onFileLoaded(reader.result);
      reader.readAsDataURL(file)
      //       console.log("I am here")
    } else {
      alert("Uploaded file is not valid.")
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    //     let id = Number(Recipes[Recipes.length-1].id) + 1
    //     setId((prev=>prev+1))
    //     console.log(id)

    if (newName.current.value !== "" && newDesc.current.value !== "" && newIngred.current.value !=="") {
      console.log("Valid Details")
    } else {
      dispatch(RecipeActions.setErrorMsg("Please fill all fields"))
//       const func = ThrottleError()
      func()
      console.log("Error occured")
      return
    }

    const newArr = Recipes.map(item => {
      console.log(item.name)
      console.log(newName.current.value)

      if (item.id == id) {
        const newObj = {
          id: id,
          name: newName.current.value,
          description: newDesc.current.value,
          recipeImg: ImgCode || recipeImg,
          ingredients: newIngred.current.value,
          favorite: favorite
        }
        item = newObj
      }
      return item
    })
    // console.log(newArr)
    dispatch(RecipeActions.editRecipe(newArr))
    dispatch(RecipeActions.ToggleEditForm())
    //     console.log(ImgCode)
  }

  return (
    <Card className={`${classes.MyForm} ${classes.RecipeForm} ${showEditForm ? classes.show : ""}`}>
      <form onSubmit={handleSubmit}>
        <h1>Edit your recipe</h1>
        <input ref={newName} defaultValue={name} placeholder="Name of Dish" required />
        <input ref={newDesc} defaultValue={description} placeholder="Description" required />
        <input ref={newIngred} defaultValue={ingredients} placeholder="Ingredients" required />
        <input onChange={ChangeFile} type="file" placeholder="Choose Dish Image"  />
        <div>
          <button className={classes.btnSm} type="submit">
            Save
          </button>
          <button
            onClick={e => {
              e.preventDefault()
              dispatch(RecipeActions.ToggleEditForm())
            }}
            className={classes.btnSm}
          >
            Close
          </button>
        </div>
      </form>
    </Card>
  )
}

export default EditRecipeForm
