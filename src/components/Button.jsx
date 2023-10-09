// note: must have trailing space!!
const buttonStyle = 'p-4 text-white text-lg font-bold rounded outline-none '


// props
//  value: value used and displayed on button
//  setExpression: callback function used to update expression
//  expression: current expression value
export function Button(props) {
    return (
        <button onClick={() => props.setExpression(props.expression() + props.value)} className={buttonStyle + "bg-gray-800 hover:bg-blue-700 active:bg-blue-800 " + props.style}>
            {props.value}
        </button>
    )
}


// props:
//  setExpression: function called when enter is pressed
export function BackspaceButton(props) {
    const backspace = function () {
        const expression = props.expression()
        if (!(expression === undefined || expression.length == 0)) {
            props.setExpression(expression.substring(0, expression.length-1))
        }
    }

    return(
        <button onClick={backspace} className={buttonStyle + "bg-gray-700 hover:bg-red-500 active:bg-red-600 " + props.style}>⌫</button>
    )
}

// props:
//  setExpression: function called when enter is pressed
export function ClearButton(props) {
    return(
        <button onClick={() => props.setExpression('')} className={buttonStyle + "bg-gray-700 hover:bg-red-500 active:bg-red-600 " + props.style}>AC</button>
    )
}


// props:
//  callback: function called when enter is pressed
export function EnterButton(props) {
    return(
        <button onClick={props.callback} className={buttonStyle + "bg-gray-700 hover:bg-orange-400 active:bg-orange-500 " + props.style}>=</button>
    )
}



