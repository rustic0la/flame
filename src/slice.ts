import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPerson } from "./components/People";

export interface State {
  favorites: IPerson[];
  selectedPerson: IPerson | null;
}

const initialState: State = {
  favorites: [],
  selectedPerson: null,
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    toggleFavorites: (state, action: PayloadAction<IPerson>) => {
      const person = action.payload;
      if (state.favorites.map(({ url }) => url).includes(person.url)) {
        state.favorites = state.favorites.filter(
          (fav) => fav.url !== person.url
        );
      } else {
        state.favorites.push(person);
      }
    },
    setPerson: (state, action: PayloadAction<IPerson>) => {
      state.selectedPerson = action.payload;
    },
    toggleToLocalStorage: (_, action: PayloadAction<IPerson>) => {
      const person = action.payload;

      if (localStorage.getItem(person.url)) {
        localStorage.removeItem(person.url);
      } else {
        localStorage.setItem(person.url, JSON.stringify(person));
      }
    },
  },
});

export const { toggleFavorites, setPerson, toggleToLocalStorage } =
  stateSlice.actions;

export default stateSlice.reducer;
