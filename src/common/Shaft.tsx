import * as React from 'react';
import Elevator from './Elevator';
import { useStore } from './FieldContext';


interface IShaft {
    floors: number
    id: string
    startFloor?: number
}

function Shaft(props: IShaft) {
  
    const elevatorIdid = 'elevator-' + props.id

    return (
        <div className="shaft" style={{ height: 100 * props.floors + 'px' }}>
            <Elevator id={elevatorIdid} />
        </div>);
}

export default Shaft
