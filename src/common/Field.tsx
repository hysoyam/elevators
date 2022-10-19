 
import { Observer } from 'mobx-react';
import * as React from 'react';
import { useStore } from './FieldContext';
import Floor from './Floor';
import Shaft from './Shaft';
import { IStore } from './store/store';


interface IField {
    floors?: number
    shafts?: number
}


function Field({ floors = 5, shafts = 1 }: IField) {
    //@ts-ignore
    const store = useStore() as IStore

    // const current = {
    //     busy: store.elevators[0].status,
    //     path: store.elevators[0].targets,
    //     currentFloor: [store.elevators[0].currentFloor],
    //     // currentTarget: [store.elevators[0].targets[]],
    //     targets: store.elevators[0].targets,
    // }
    // const initial = JSON.parse(JSON.stringify(current));

    return <Observer>

        {() => {
            return (<>
                <div className="field">

                    <div className="shafts">
                        <Shaft id={'01'} startFloor={1} floors={floors} />
                        <Shaft id={'02'} startFloor={1} floors={floors} />
                    </div>

                    <div className="floors">
                        <Floor floor={5} />
                        <Floor floor={4} />
                        <Floor floor={3} />
                        <Floor floor={2} />
                        <Floor floor={1} />
                    </div>
                </div>
                <div className="info">
                    {/* <p>initial:{JSON.stringify(initial)}</p> */}
                    <p>current:{JSON.stringify(store.elevators)}</p>
                </div>
            </>)
        }}

    </Observer >
}
export default Field