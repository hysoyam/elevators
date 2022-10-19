import * as React from 'react';
import { Observer } from 'mobx-react';
import { useStore } from './FieldContext';

interface IElevator {
    id: string
}

function Elevator({ id }: IElevator) {

    const speed = 1000 / 16 / 10

    //@ts-ignore
    const store = useStore as IStore
    store.addElevator(id)
    let elevator = store.getElevator(id)

    function elevatorLogic(id = 1) {

        requestAnimationFrame(elevatorLogic)

        const currentTime = Date.now()
        const deltaTime = currentTime - elevator.lastTime

        if (elevator.status === 'idle') {
            if (elevator.targets.length) {
                elevator.setStatus('moving')
            }
        }

        if (elevator.status === 'waiting') {
            if (elevator.waitTimeLast < 1) {

                if (elevator.targets.length) {
                    elevator.setStatus('moving')
                } else {
                    elevator.setStatus('idle')
                }

            } else {
                elevator.setWaitTimeLast(elevator.waitTimeLast - deltaTime)
            }
        }

        if (elevator.status === 'moving') {
            //calculate direction
            if (elevator.height < elevator.targets[0] * 100 - 100) {

                elevator.setDirection('up')
            } else {

                elevator.setDirection('down')
            }
            //calculate position
            if (elevator.direction === 'up') {
                //up
                elevator.setHeigth(elevator.height + Math.floor(deltaTime / speed))
            } else {
                //down
                elevator.setHeigth(elevator.height - Math.floor(deltaTime / speed))
            }

            // if elevator on the target floor
            if (elevator.height > (elevator.targets[0] * 100) - 100 - 1 && elevator.height < (elevator.targets[0] * 100) - 100 + 1) {
                // stays on floor 3 sec 
                elevator.setStatus('waiting')
                elevator.setWaitTimeLast(3000)
                elevator.removeCurrentTarget()

            }
        }
        // updete time
        elevator.setLastTime(currentTime)
    }

    React.useEffect(() => {
        elevatorLogic()
    }, [])

    return (<>
        <Observer>
            {() => {
                return (
                    <>
                        <div
                            id={elevator.id}
                            className={`elevator ${elevator.status === 'waiting' ? 'stay' : ''}`}
                            style={{ bottom: elevator.height + 'px' }}>
                        </div>

                    </>)
            }}
        </Observer>

    </>);
}

export default Elevator;