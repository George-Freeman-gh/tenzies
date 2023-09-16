

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
return (
    <div className="die-box" style={styles} onClick={props.holdDice}>
           <h1 className="die-text">{props.value}</h1>
           
    </div>
)
}



export default Die