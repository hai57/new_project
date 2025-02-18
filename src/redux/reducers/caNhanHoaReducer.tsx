import { CaNhanHoaSettingChung } from "apis/caNhanHoaService/caNhanHoaService";
import { CaNhanHoaAction } from "../actions/caNhanHoaAction";

export interface CaNhanHoaState {
    caNhanHoa: CaNhanHoaSettingChung[];
}

const initialState: CaNhanHoaState = {
    caNhanHoa: [],
};

export const caNhanHoaReducer = (state: CaNhanHoaState = initialState, action: CaNhanHoaAction): CaNhanHoaState => {
    switch (action.type) {
        case "UPDATE_CA_NHAN_HOA":
            return { ...state, caNhanHoa: action.payload.caNhanHoa };
        case "SET_CA_NHAN_HOA":
            return { ...state, caNhanHoa: action.payload.caNhanHoa };
        default:
            return state;
    }
};
