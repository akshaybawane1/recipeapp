import Card from "./Card"
// import Pizza from "../Images/Pizza.jpg"
import classes from "../Style/style.module.css"
import { useDispatch, useSelector } from "react-redux"
import RecipeActions from "../store/RecipeSlice"

const AllRecipes = () => {
  const Recipes = useSelector(state => state.Recipes.Recipes)
  const dispatch = useDispatch()
  console.log(Recipes)

  const handleDelete = id => {
    // console.log(id)
    const newArr = Recipes.filter(item => {
      if (item.id !== id) {
        return item
      }
    })
    dispatch(RecipeActions.deleteRecipe(newArr))
  }

  const showForm = id => {
    dispatch(RecipeActions.ToggleEditForm())
    const recipe = Recipes.filter(item => {
      if (item.id == id) {
        return item
      }
    })
    // console.log("All recipe",...recipe)
    dispatch(RecipeActions.setEditFormInitialValues({ ...recipe }))
  }

  const AddIngredient = id => {
    dispatch(RecipeActions.ToggleIngredientForm())
    dispatch(RecipeActions.setSelectedRecipe(id))
  }

  const toggleFav = id => {
    const newArr = Recipes.map(item => {
      if (item.id == id) {
        const prev = item.favorite
        const newObj = { ...item, favorite: !prev }
        item = newObj
      }
      return item
    })
    console.log(newArr)
    dispatch(RecipeActions.editRecipe(newArr))
  }
  return (
    <section className={classes.recipeCon}>
      <h1 style={{ textAlign: "center" }}>Recipe Book</h1>
      <div className={classes.container}>
        {Recipes.length == 0 ? (
          <h2>Oops...There are no recipes, please add new recipes</h2>
        ) : (
          <>
            {Recipes.map(Recipe => {
              return (
                <Card className={classes.RecipeItem} key={Recipe.id}>
                  <div className={classes.imgDiv}>
                    <img src={Recipe.recipeImg} />
                  </div>
                  <div>
                    <p>
                      <strong>{Recipe.name}: </strong>
                      {Recipe.description}
                    </p>
                    <p>
                      <strong >Ingredients: </strong>
                      <p className={classes.Ingred}>{Recipe.ingredients}</p>
                    </p>
                  </div>

                  <button onClick={() => showForm(Recipe.id)} className={classes.btnSm}>
                    Edit
                  </button>
                  <button className={classes.btnSm} onClick={() => handleDelete(Recipe.id)}>
                    Delete
                  </button>
                  <button className={classes.btnLg} onClick={() => AddIngredient(Recipe.id)}>
                    Add Ingredient
                  </button>
                  <span onClick={() => toggleFav(Recipe.id)} className={classes.curPointer}>
                    {Recipe.favorite ? "💖" : "🤍"}
                  </span>
                </Card>
              )
            })}
          </>
        )}

        {/* <Card className={classes.RecipeItem}>
                                        <div className={classes.imgDiv}>
                                                <img src={Pizza} />
                                        </div>
                                        <div>
                                                <p><strong>Pizza: </strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem repudiandae maxime accusantium consequuntur, sit eaque, non asperiores ea labore ab accusamus. Ducimus possimus quis corporis deleniti dicta mollitia. Praesentium, fuga architecto quia ipsam ad modi delectus itaque ea quos expedita, maxime quod deleniti, animi quidem consectetur. Laudantium tempora modi, quisquam esse blanditiis pariatur sequi quibusdam cupiditate corporis nulla beatae hic reprehenderit minima! Quod, ut alias. Distinctio sapiente, nemo nam error vel pariatur sint, tempora quibusdam iste mollitia molestias debitis et doloremque dolore esse itaque officiis atque obcaecati enim. Impedit cum expedita libero sit sed perferendis possimus eaque culpa tempora aspernatur.</p>
                                                <p><strong>Ingredients: </strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora asperiores laboriosam, explicabo doloribus culpa facere eum sunt hic rem incidunt sint dolorum inventore tempore neque.</p>
                                        </div>
                                        
                                </Card> */}
      </div>
    </section>
  )
}

export default AllRecipes
