export interface IStore {

    floors: number;
    elevators: Elevator[];
    getElevator(id: string): Elevator | undefined;
    addElevator(id: string): void;
}

export function createStore(): IStore {

    return {
        floors: 5,
        elevators: [],
        getElevator(id: string) { return this.elevators.find(el => el.id === id) },
        addElevator(id: string) { const el = new Elevator(id); this.elevators.push(el) }
    }
}

class Elevator {
    id: string
    currentFloor: number
    direction: 'up' | 'down'
    status: 'idle' | 'waiting' | 'moving'
    targets: number[]
    lastTime: number
    waitTimeLast: number
    height: number
    setDirection: (direction: 'up' | 'down') => void
    setHeigth: (height: number) => void
    setLastTime: (lastTime: number) => void
    setWaitTimeLast: (waitTimeLast: number) => void
    setStatus: (status: 'idle' | 'waiting' | 'moving') => void
    setCurrentFloor: (currentFloor: number) => void
    removeCurrentTarget: () => void
    addTarget: (floor: number) => void

    constructor(id: string, currentFloor = 1, targets = []) {
        this.id = id
        this.currentFloor = currentFloor
        this.direction = 'up'   // down
        this.status = 'idle'  // waiting, moving 
        this.targets = targets
        this.lastTime = Date.now()
        this.waitTimeLast = 3000
        this.height = 0
        this.setDirection = function (direction: 'up' | 'down') { this.direction = direction }
        this.setHeigth = function (height: number) { this.height = height }
        this.setLastTime = function (lastTime: number) { this.lastTime = lastTime }
        this.setWaitTimeLast = function (waitTimeLast: number) { this.waitTimeLast = waitTimeLast }
        this.setStatus = function (status: 'idle' | 'waiting' | 'moving') { this.status = status }
        this.setCurrentFloor = function (currentFloor: number) { this.currentFloor = currentFloor }
        this.removeCurrentTarget = function () { this.targets.shift() }
        this.addTarget = function (floor: number) { this.targets.push(floor) }
    }
} 
