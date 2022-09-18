import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "../Style/style.module.css"
import LogInActions from "../store/LoginSlice"
import RecipeActions from "../store/RecipeSlice"
import { Link } from "react-router-dom";

const Navbar = () => {
        const token = useSelector(state => state.Auth.token)
        // const ThrottleError = useSelector(state=>state.Recipes.ThrottleError)
        const email = useRef()
        const password = useRef()
        const dispatch = useDispatch()


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
        


        const handleLogin = (e)=>{
                e.preventDefault()

                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.current.value) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.current.value)){
                        console.log("Valid Email")
                }else{
                        dispatch(RecipeActions.setErrorMsg("Please Enter Valid Credentials"))
                        // const func = ThrottleError()
                        func()
                        // console.log("Error occured")
                        return
                }

                const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8iwa3g4HhuY1eMs2WZCvTx_UfIHr9Kas"
                fetch(url,{
                        method:"POST",
                        body: JSON.stringify({
                                email: email.current.value,
                                password: password.current.value,
                                returnSecureToken: false,
                        }),
                        headers:{
                                "Content-Type": "application/json"
                        }
                }).then((Res)=>{
                        if(Res.ok){
                                return Res.json()
                        }else{
                                return Res.json().then((data)=>{
                                        let errorMsg = "Failed to authenticate"
                                        throw new Error(errorMsg)
                                })
                        }
                }).then((data)=>{
                        dispatch(LogInActions.Login(data.idToken))
                }).catch((err)=>{
                        dispatch(RecipeActions.setErrorMsg("Please Enter Valid Credentials"))
                        const func = ThrottleError()
                        func()
                        console.log(err)
                })
        }

        const handleLogout = (e)=>{
                e.preventDefault()
                dispatch(LogInActions.Login(""))
        }

        const showForm = (e)=>{
                console.log("Clicked")
                // console.log(showRecipeForm)
                dispatch(RecipeActions.ToggleForm())
        }
        return ( 
                <nav className={classes.navbar}>
                       <div className="left">
                                <ul>
                                        <li className={classes.curPointer}><Link to="/">{token? "Home":"ChefMagic"}</Link></li>
                                        {token && <li className={classes.curPointer}><Link to="/allRecipe">All Recipes</Link></li>}
                                        {token &&<li className={classes.curPointer} onClick={showForm}>Add Recipes</li>}
                                        {token &&<li className={classes.curPointer}><Link to="/favorites">Favorite Recipes</Link></li>}
                                </ul>
                       </div>
                       {token ? <div className={`${classes.right} ${classes.centerLg}`}><button onClick={handleLogout} className={classes.btnSm} type="submit">Logout</button></div> : (<div className={classes.right}>
                                <form onSubmit={handleLogin}>
                                        <input ref={email} className={classes.inputField} type="email" placeholder="Email"/>
                                        <input ref={password} className={classes.inputField} type="password" placeholder="Password"/>
                                        <button className={classes.btnSm} type="submit">Login</button>
                                </form>
                        </div>) }
                       
                </nav>
         );
}
 
export default Navbar;