import produce from 'immer'
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Cell } from '../cell'

interface CellsState {
    loading: boolean;
    error: string | null;
    notification: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    }
}

const initialState: CellsState = {
    loading: false,
    notification: null,
    error: null,
    order: [],
    data: {}
}

const reducer = produce((state: CellsState = initialState, action: Action): CellsState  => {
    //state.notification = null
    switch(action.type) {
        case ActionType.SAVE_SELLS_ERROR:
            state.error = action.payload
            return state
        case ActionType.SAVE_SELLS_SUCCESS:
            state.notification = 'Saved'
            return state
        case ActionType.FETCH_CELLS:
            state.loading = true
            state.error = null
            return state
        case ActionType.FETCH_CELLS_COMPLETE:
            state.order = action.payload.map(cell => cell.id)
            state.data = action.payload.reduce((acc, cell) => {
                acc[cell.id] = cell
                return acc
            }, {} as CellsState['data'])
            return state
        case ActionType.FETCH_CELLS_ERROR:
            state.loading = false
            state.error = action.payload
            return state
        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload

            state.data[id].content = content
            return state
        case ActionType.DELETE_CELL:
            delete state.data[action.payload]
            state.order = state.order.filter(id => id !== action.payload)

            return state
        case ActionType.MOVE_CELL:
            const  { direction } = action.payload
            const index = state.order.findIndex((cellId) => cellId === action.payload.id)
            const targetIndex = direction === 'up' ? index - 1 : index + 1
            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return state
            }
            state.order[index] = state.order[targetIndex]
            state.order[targetIndex] = action.payload.id
            return state
        case ActionType.INSERT_CELL_AFTER:
            const cell: Cell = {
                id: randomId(),
                content: '',
                type: action.payload.type,
            }

            state.data[cell.id] = cell

            const currentIndex = state.order.findIndex(id => id === action.payload.id)
            if (currentIndex < 0) {
                state.order.unshift(cell.id)
            } else {
                state.order.splice(currentIndex + 1, 0, cell.id)
            }
            return state
        default:
            return state
    }
})

const randomId = () => {
    return Math.random().toString(36).substr(2, 5)
}

export default reducer