import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import {
    UpdateCellAction,
    MoveCellAction,
    DeleteCellAction,
    InsertCellAfterAction,
    Direction,
    Action
} from '../actions'
import { Cell, CellTypes } from '../cell'

export const  updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
}

export const  deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    }
}

export const  moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
}

export const  insertCellAfter = (id: string|null, cellType: CellTypes): InsertCellAfterAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type: cellType
        }
    }
}

export const fetchCells = () => {
     return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionType.FETCH_CELLS });
        try {
            const { data }: {data: Cell[]} = await axios.get('/cells')
            dispatch({
                type: ActionType.FETCH_CELLS_COMPLETE,
                payload: data
            });
        } catch(err) {
            dispatch({
                type: ActionType.FETCH_CELLS_ERROR,
                payload: err.message
            });
        }
     }
}