import classes from "../Style/style.module.css"
import { useDispatch, useSelector } from "react-redux";
import RecipeActions from "../store/RecipeSlice"
import Card from "./Card";
const Favorites = () => {
        const Recipes = useSelector(state => state.Recipes.Recipes)
        const FavArr = Recipes.filter((item)=>{
                if(item.favorite == true){
                        return item
                }
        })
        const dispatch = useDispatch()
        console.log(Recipes)

        const handleDelete = (id)=>{
                // console.log(id)
                const newArr = Recipes.filter((item)=>{
                        if(item.id !== id){
                                return item
                        }
                })
                dispatch(RecipeActions.deleteRecipe(newArr))

        }

        const showForm = (id)=>{
                dispatch(RecipeActions.ToggleEditForm())
                const recipe = Recipes.filter((item)=>{
                        if(item.id == id){
                                return item
                        }
                })
                // console.log("All recipe",...recipe)
                dispatch(RecipeActions.setEditFormInitialValues({...recipe}))
        }

        const AddIngredient =(id)=>{
                dispatch(RecipeActions.ToggleIngredientForm())
                dispatch(RecipeActions.setSelectedRecipe(id))
        }

        const toggleFav = (id)=>{
                const newArr = Recipes.map((item)=>{
                        
                        if(item.id == id){
                                const prev = item.favorite
                                const newObj = {...item,favorite : !prev}
                                item = newObj
                        }
                        return item
                })
                console.log(newArr)
            dispatch(RecipeActions.editRecipe(newArr))
        }
        return ( 
                <section className={classes.recipeCon}>
                        <h1 style={{textAlign:"center"}}>My Favorite dishes...😋</h1>
                        <div className={classes.container}>
                        {FavArr.length ==0 ? <h2>Oops...No favorite recipe, please add your favorite recipe</h2> : <>
                                {FavArr.map((Recipe)=>{
                                        return (
                                                <Card className={classes.RecipeItem} key={Recipe.id}>
                                                        <div className={classes.imgDiv}>
                                                                <img src={Recipe.recipeImg} />
                                                        </div>
                                                        <div>
                                                                <p><strong>{Recipe.name}: </strong>{Recipe.description}</p>
                                                                <p><strong>Ingredients: </strong><p className={classes.Ingred}>{Recipe.ingredients}</p></p>
                                                        </div>

                                                        <button onClick={()=>showForm(Recipe.id)} className={classes.btnSm}>Edit</button>
                                                        <button className={classes.btnSm} onClick={()=>handleDelete(Recipe.id)}>Delete</button>
                                                        <button className={classes.btnLg} onClick={()=>AddIngredient(Recipe.id)}>Add Ingredient</button>
                                                        <span onClick={()=>toggleFav(Recipe.id)} className={classes.curPointer}>{Recipe.favorite ? "💖":"🤍"}</span>
                                                </Card>
                                        )
                                })}
                        </>}

                                
                        </div>
                </section>
         );
}
 
export default Favorites;