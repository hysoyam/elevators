import * as React from 'react';
import { useElevatorsController } from './elevatorsController';
import { useStore } from './FieldContext';


function Floor(props: { floor: number }) {
    const controller = useElevatorsController()
    const store = useStore()
    return (
        <div className='floor'>
            <h2>Floor{props.floor}</h2>
            <button onClick={() => {
                controller.callTo(props.floor)
            }}>call</button>
        </div>)
}

export default Floor
