import classes from "../Style/style.module.css"
const Card = (props) => {
        return <div className={`${classes.Card} ${props.className}`}>{props.children}</div>;
}
 
export default Card;