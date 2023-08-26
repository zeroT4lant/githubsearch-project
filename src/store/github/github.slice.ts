import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const LocalStorage_Fav_Key = 'rfk'

interface githubState {
    favourites: string[]
}

const initialState: githubState = {
    favourites : JSON.parse(localStorage.getItem(LocalStorage_Fav_Key) ?? '[]')//если строки нет парсим пустой массив
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload)
            localStorage.setItem(LocalStorage_Fav_Key,JSON.stringify(state.favourites))
        },
        removeFavourite(state, action: PayloadAction<string>){
            state.favourites = state.favourites.filter(item => item !== action.payload)
        }
    }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer