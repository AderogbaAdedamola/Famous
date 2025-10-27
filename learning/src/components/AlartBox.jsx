import './styles/AlartBox.css'

export default function AlartBox(props) {
    console.log(props)
    return(
        <div className="alart-container">
            <div className="alart-text-box">
                <p>{props.alartText}</p>
            </div>
            <div className="alart-button-container">
                <button id="cancel" 
                    onClick={props.alartCancelFunction}
                    style={{ opacity: props.opacity && props.opacity}}>
                        Cancel
                </button>
                <button id="save" 
                    onClick={props.alartPositiveFunction}
                    style={{backgroundColor: props.bgColor && props.bgColor,
                            opacity: props.opacity && props.opacity
                    }}>
                    {props.alartPositiveBtnText}
                </button>
            </div>
        </div>
    )
}