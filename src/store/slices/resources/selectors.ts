import { RootState } from "@app/store/rootReducer"

export const selectPixabayResources = (state: RootState) => state.resources.pixabay
