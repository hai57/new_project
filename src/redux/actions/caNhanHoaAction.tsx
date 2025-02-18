import { CaNhanHoaService, TypeCaNhanHoa } from "apis/caNhanHoaService/caNhanHoaService";
import { getUserId } from "helpers/localStorage";
import { ThunkDispatch } from "redux-thunk";
import { CaNhanHoaState } from "../reducers/caNhanHoaReducer";

export type ACTION_CA_NHAN_HOA = "SET_CA_NHAN_HOA" | "UPDATE_CA_NHAN_HOA";

export interface CaNhanHoaAction {
    type: ACTION_CA_NHAN_HOA;
    payload: CaNhanHoaState;
}

export const loadCaNhanHoa = () => {
    return async (dispatch: ThunkDispatch<{}, {}, CaNhanHoaAction>) => {
        const userId = getUserId();
        let response: CaNhanHoaState = { caNhanHoa: [] };
        if (userId) {
            const res = await new CaNhanHoaService().getCaNhanHoa(userId);
            response = {
                caNhanHoa: res,
            };
        }
        dispatch({
            type: "SET_CA_NHAN_HOA",
            payload: response,
        });
    };
};

export const updateCaNhanHoa = (response: CaNhanHoaState) => {
    return {
        type: "UPDATE_CA_NHAN_HOA",
        payload: response,
    };
};
