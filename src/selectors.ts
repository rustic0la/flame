import { RootState } from "./store";

export const selectSelectedPerson = (state: RootState) => state.selectedPerson;

export const selectFavorites = (state: RootState) => state.favorites;
