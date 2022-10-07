import { RootState } from "@app/store/rootReducer"

export const selectPages = (state: RootState) => state.designEditor.pages
