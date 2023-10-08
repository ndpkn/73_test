import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LikedStations, Station } from "../../types/types";
import { RootState } from "../store";

const initialState: LikedStations = {
  likedStations: []
}

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Station>) => {
      state.likedStations = [...state.likedStations, action.payload]
    },
    removeFromFavorites: (state, action: PayloadAction<Station>) => {
      state.likedStations = state.likedStations.filter((item) => item.id !== action.payload.id)
    }
  }
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions
export const favoriteList = (state: RootState) => state.favorite
export default favoriteSlice.reducer