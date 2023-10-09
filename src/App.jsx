import { For, createSignal, createEffect } from 'solid-js'
import { BackspaceButton, Button, ClearButton, EnterButton } from './components/Button.jsx'
import './index.css'

const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+']
const keys = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+', 'Enter', 'Backspace']
const errorValue = 'error'


function handleButton(value, expression, setExpression) {
    if (expression() == errorValue) {
        setExpression('')
    }
    setExpression(expression() + value)
}

function evaluate(expression, setExpression) {
    let result = '';
    try {
        result = eval(expression())
    } catch (error) {
        result = errorValue
        console.error(error)
    }
    setExpression(result)
}

function backspace(expression, setExpression) {
    if (expression() === errorValue) {
        setExpression('')
    }
    const value = expression()
    if (!(value === undefined || value.length == 0)) {
        setExpression(value.substring(0, value.length-1))
    }
}

function clear(setExpression) {
    setExpression('')
}

function handleKeyboardPress(event, expression, setExpression) {
    const key = event.key
    console.log(key)
    if (buttons.includes(key)) {
        handleButton(key, expression, setExpression)
    }
    else if (key == "=") {
        evaluate(expression, setExpression)
    }
    else if (key == "Backspace") {
        backspace(expression, setExpression)
    }
}


function App() {
    const [expression, setExpression] = createSignal('')
    // bodge: fix weird expression becomes undef for no reason
    createEffect(() => setExpression(expression() === undefined ? '' : expression()))


    return (
    <div onKeyDown={(event) => handleKeyboardPress(event, expression, setExpression)} tabIndex="0" className='outline-none ring-0'>
    <div className='p-4 max-w-lg h-screen mx-auto'>
        <div className='text-3xl text-gray-50 mb-2'>
            Calculator
        </div>
        <div className='grid grid-cols-4 grid-rows-5 gap-1 [&>*]:transition-colors [&>*]:duration-[100ms]'>
            {/* Expression/Result display */}
            <div className='row-span-1 text-3xl font-bold bg-gray-700 rounded text-white col-span-full flex items-center overflow-x-auto'>
                <div className='pl-4'>
                    {expression()}
                </div>
            </div>

            <ClearButton callback={() => clear(setExpression)} style='col-span-2'/>
            <BackspaceButton callback={() => backspace(expression, setExpression)} style='col-span-2'/>

            <For each={buttons}>
                {(buttonValue) => {
                    const buttonWidth = buttonValue == '0' ? 'col-span-2' : ''
                    return (
                        <Button 
                            value={buttonValue} 
                            callback={() => handleButton(buttonValue, expression, setExpression)} 
                            style={buttonWidth} 
                        />
                    )
                }}
            </For>
            
            <EnterButton style="col-span-full" callback={() => evaluate(expression, setExpression)} />
            

        </div>
    </div>
    </div>
    )
}

export default App
