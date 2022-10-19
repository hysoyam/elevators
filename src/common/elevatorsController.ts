import { useStore } from "./FieldContext";
import { IStore } from "./store/store";

export function useElevatorsController() {
    // @ts-ignore
    const store = useStore() as IStore


    const getElevator = store.getElevator

    function getLeastBusyElevator() {
        let leastBusyIndex = 0
        store.elevators.forEach((el, index) => {
            if (el.targets.length <= 0) {
                leastBusyIndex = index
            }
        })
        console.log(leastBusyIndex);

        return store.elevators[leastBusyIndex]
    }
    
    function getLeastBusyElevatorIndex() {
        let leastBusyIndex = 0
        store.elevators.forEach((el, index) => {
            if (el.targets.length <= 0) {
                leastBusyIndex = index
            }
        })
        console.log(leastBusyIndex);

        return leastBusyIndex
    }

    function callElevator(a = 1) {
        console.log('calling elevaror', a);
    }

    return {
        callTo: function (targetFloor: number) {
            if (targetFloor < 1) { throw new Error(`Указанное количесво этажей меньше 1`); }
            //@ts-ignore
            if (store.floors < targetFloor) { throw new Error(`Указанное количесво этажей:${targetFloor} больше текущего:${this.floors}`); }

            callElevator(targetFloor)
            // проверка на то есть ли уже этаж в очереди
            // getLeastBusyElevator().addTarget(targetFloor)

            store.elevators[getLeastBusyElevatorIndex()].addTarget(targetFloor)
        }
    }
}