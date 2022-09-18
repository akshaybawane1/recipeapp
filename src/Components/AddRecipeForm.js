import Card from "./Card"
import classes from "../Style/style.module.css"
import { useDispatch, useSelector } from "react-redux"
import RecipeActions from "../store/RecipeSlice"
import { useRef, useState } from "react"
// import { render } from "react-dom"

const AddRecipeForm = () => {
  const showRecipeForm = useSelector(state => state.Recipes.showRecipeForm)
//   const ThrottleError = useSelector(state => state.Recipes.ThrottleError)
  const Recipes = useSelector(state => state.Recipes.Recipes)
  const dispatch = useDispatch()

    const [name, setName] = useState()
    const [desc, setDesc] = useState()
    const [Ingred, setIngred] = useState()

  // let newName = useRef()
  // let newDesc = useRef()
  // let newIngred = useRef()

  const [ImgCode, setImgCode] = useState("")
  const [id, setId] = useState()

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

    const ChangeName = e => {
      setName(e.target.value)
    }
    const ChangeDesc = e => {
      setDesc(e.target.value)
    }
    const ChangeIngred = e => {
      setIngred(e.target.value)
    }
  const ChangeFile = e => {
        e.preventDefault()
        const reader = new FileReader()
        const file = e.target.files[0]
        console.log(file)
        console.log(file)
        if (file) {
          reader.onload = () => {
            setImgCode(reader.result)
            console.log(reader.result)
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

        if (name !== "" && desc !== "" && Ingred !=="") {
        console.log("Valid Details")
      } else {
        dispatch(RecipeActions.setErrorMsg("Please fill all fields"))
        // const func = ThrottleError()
        func()
        console.log("Error occured")
        return
      }
    // let id = Number(Recipes[Recipes.length-1].id) + 1
    setId(Math.random(0,100000))
    // setId(prev => prev+1)
    //     console.log(id)

    const newArr = {
        id: id,
        name: name,
        description: desc,
        recipeImg: ImgCode,
        ingredients: Ingred,
        favorite: false
    }
    dispatch(
      RecipeActions.addRecipe({...newArr})
    )
    setName("")
    setDesc("")
    setIngred("")
    setImgCode("")
    dispatch(RecipeActions.ToggleForm())
    document.getElementById('multifile').value = "";
    //     console.log(ImgCode)
  }

  return (
    <Card className={`${classes.MyForm} ${classes.RecipeForm} ${showRecipeForm ? classes.show : ""}`}>
      <form onSubmit={handleSubmit}>
        <h1>Add new recipe</h1>
        <input value={name} onChange={ChangeName} placeholder="Name of Dish"  required/>
        <input value={desc} onChange={ChangeDesc} placeholder="Description"  required/>
        <input value={Ingred} onChange={ChangeIngred} placeholder="Ingredients"  required/>
        <input id="multifile" onChange={ChangeFile} type="file" placeholder="Choose Dish Image"  required/>
        <div>
          <button className={classes.btnSm} type="submit">
            Add
          </button>
          <button
            onClick={e => {
              e.preventDefault()
              dispatch(RecipeActions.ToggleForm())
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

export default AddRecipeForm
