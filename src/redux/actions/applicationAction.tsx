export interface LoadingAction {
    type: "SHOW" | "HIDE";
}

export const showLoading = (): LoadingAction => ({
    type: "SHOW",
});
export const hideLoading = (): LoadingAction => ({
    type: "HIDE",
});
