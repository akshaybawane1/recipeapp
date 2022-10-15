import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from  "../Style/style.module.css"
import Card from "./Card";
import LogInActions from "../store/LoginSlice"
import RecipeActions from "../store/RecipeSlice";
const SignUp = () => {
        const dispatch = useDispatch()

        const firstname = useRef()
        const Lastname = useRef()
        const email = useRef()
        const password = useRef()

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

                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.current.value) && /^[A-Za-z\s]+$/.test(firstname.current.value) && /^[A-Za-z\s]+$/.test(Lastname.current.value) && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.current.value)){
                        console.log("Valid Email")
                }else{
                        dispatch(RecipeActions.setErrorMsg("Please fill the form as per rules suggested"))
                        // const func = ThrottleError()
                        func()
                        console.log("Error occured")
                        return
                }

                const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8iwa3g4HhuY1eMs2WZCvTx_UfIHr9Kas"

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
                                        // console.log(data.error.message)
                                        let errorMsg = data.error.message || "Failed to authenticate"
                                        // console.log(errorMsg)
                                        throw new Error(errorMsg)
                                })
                        }
                }).then((data)=>{
                        // console.log(data.idToken)
                        dispatch(LogInActions.Login(data.idToken))
                }).catch((err)=>{
                        // console.log(err)
                        dispatch(RecipeActions.setErrorMsg(err.message.toString()))
                        func()
                })
        }

        return ( 
                <section className={classes.centerCont}>
                        
                        <Card>
                                <form className={classes.MyForm} onSubmit={handleSubmit}>
                                        <h1>Welcome to ChefMagic</h1>
                                        <input type="name" ref={firstname} placeholder="Enter your first name" pattern="[A-Za-z]{1,255}" title="Must contain only letter" required/>
                                        <input type="name" ref={Lastname} placeholder="Enter your last name" pattern="[A-Za-z]{1,255}" title="Must contain only letter" required/>
                                        <input ref={email} placeholder="Enter your email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="Please enter valid email address" required/>
                                        <input type="password" ref={password} placeholder="Enter your Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
                                        <button className={classes.btnSm} type="submit">Sign Up</button>
                                </form>
                        </Card>
                </section>
         );
}
 
export default SignUp;