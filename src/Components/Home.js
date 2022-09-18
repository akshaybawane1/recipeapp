import Card from "./Card"
import classes from "../Style/style.module.css"
const Home = () => {
  return (
    <section className={`${classes.centerCont} ${classes.homePage}`}>
      <h1>Welcome</h1>
      <p>A recipe is a formula of ingredients and a list of instructions for creating prepared foods. It is used to control quality, quantity, and food costs in a foodservice operation. A recipe may be simple to complex based on the requirements of the operation and the intended user. For example, an experienced chef may need a recipe with only a few details, while a beginner cook may need more information about ingredients, preparation steps, cooking times and temperatures, visual cues, and equipment requirements. 

Recipes are formatted differently depending on the author and the intended use. Professional chefs record recipes in pocket notebooks, binders, or digital devices, using simple to complex details, depending on the type of recipe and the experience level of the chef.  Information might include ingredients, prep steps, kitchen notes, and hand-drawn plate presentations. Recipes for the general consumer must be written with the assumption that the intended user knows very little about food preparation. When writing recipes that others will use in your kitchen, provide as much information so that anyone who is preparing, inexperienced or skilled, can easily understand. Include information on ingredients, prep steps for fabricating or measuring, cooking instructions, recipe yield, and required equipment. </p>
    </section>
  )
}

export default Home
