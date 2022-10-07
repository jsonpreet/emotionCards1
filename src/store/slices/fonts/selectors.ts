import { RootState } from "@app/store/rootReducer";

export const selectFonts = (state: RootState) => state.fonts.fonts;
