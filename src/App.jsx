import { For, createSignal, createEffect } from 'solid-js'
import { BackspaceButton, Button, ClearButton, EnterButton } from './components/Button.jsx'
import './index.css'

const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+']

function App() {
    const [expression, setExpression] = createSignal('')
    // bodge: fix weird expression becomes undef for no reason
    createEffect(() => setExpression(expression() === undefined ? '' : expression()))

    const evaluate = function () {
        let result = '';
        try {
            result = eval(expression())
        } catch (error) {
            result = 'error'
            console.error(error)
        }
        setExpression(result)

        console.log("EXPRESSSION:");
        console.log(expression)
        console.log("setExpression:");
        console.log(setExpression)
    }

    return (
    <div className='m-4 max-w-md'>
        <div className='text-3xl text-gray-50 mb-2'>
            Calculator
        </div>
        <div className='grid grid-cols-4 grid-rows-5 gap-1'>
            <div className='row-span-1 text-3xl font-bold bg-gray-700 rounded text-white col-span-full flex items-center'>
                <div className='pl-4'>
                    {expression()}
                </div>
            </div>

            <ClearButton setExpression={setExpression} style='col-span-2'/>
            <BackspaceButton expression={expression} setExpression={setExpression} style='col-span-2'/>

            <For each={buttons}>
                {(buttonValue) => {
                    const buttonWidth = buttonValue == '0' ? 'col-span-2' : ''
                    return (
                        <Button value={buttonValue} expression={expression} setExpression={setExpression} style={buttonWidth}></Button>
                    )
                }}
            </For>
            
            <EnterButton style="col-span-full" callback={evaluate} />
            

        </div>
    </div>
    )
}

export default App
