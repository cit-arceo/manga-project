import { types } from '../types/types';

const initialState = {
    chapters: [],
    active: null
}


export const chaptersReducer = ( state = initialState, action ) => {

    switch (action.type) {
        
        case types.chaptersActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        
        case  types.chaptersAddNew:
            return {
                ...state,
                chapters: [ action.payload, ...state.chapters ]
            }

        case types.chaptersLoad:
            return {
                ...state,
                chapters: [ ...action.payload ]
            }
    
        case types.chaptersUpdated:
            return {
                ...state,
                chapters: state.chapters.map(
                    chapter => chapter.id === action.payload.id
                        ? action.payload.chapter
                        : chapter
                )
            }

        case types.chaptersDelete:
            return {
                ...state,
                active: null,
                chapters: state.chapters.filter( chapter => chapter.id !== action.payload )
            } 

        case types.chaptersLogoutCleaning:
            return {
                ...state,
                active: null,
                chapters: []
            }

        default:
            return state
    }


}