import { RootState } from "@app/store/rootReducer"

export const selectUploads = (state: RootState) => state.uploads.uploads
export const selectUploading = (state: RootState) => state.uploads.uploading
