import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseReponseI, BaseService } from "apis/baseService";
import { openNotification } from "apis/redux/actions/notificationAction";
import { store } from "apis/redux/store";
import { CauHinhThanhCongCu, CauHinhThongBao } from "models/cauHinhThuocTinh";

export enum TypeCaNhanHoa {
    LOG = "LOG",
    THONG_BAO = "THONG_BAO",
    THANH_CONG_CU = "THANH_CONG_CU",
    TRUC_QUAN_DL_BIEU_DO = "TRUC_QUAN_DL_BIEU_DO",
    MENU = "MENU",
    LAYOUT = "LAYOUT",
    DASHBOARD = "DASHBOARD",
    DASHBOARD_PUBLIC = "DASHBOARD_PUBLIC",
    DM_DICH_VU = "DM_DICH_VU",
    TASK_DICH_VU = "TASK_DICH_VU",
    TASK_DICH_VU_M16 = "TASK_DICH_VU_M16",
    TASK_DICH_VU_PROPERTIES = "TASK_DICH_VU_PROPERTIES",
    DM_DICH_VU_C15 = "DM_DICH_VU_C15",
    DM_DICH_VU_C15_PROPERTIES = "DM_DICH_VU_C15_PROPERTIES",
    THUOC_TINH = "THUOC_TINH",
    TASK_MO_PHONG_C14 = "TASK_MO_PHONG_C14",
    TASK_VIEW_MODEL_C14 = "TASK_VIEW_MODEL_C14",
    VIEW_MODAL_FLOW = "VIEW_MODAL_FLOW",
    TASK_KPDL_C13 = "TASK_KPDL_C13",
    WORKSPACE = "WORKSPACE",
    PHAN_VUNG_DU_LIEU = "PHAN_VUNG_DU_LIEU",
    PHAN_VUNG_DU_LIEU_NHOM = "PHAN_VUNG_DU_LIEU_NHOM",
    PHAN_VUNG_DU_LIEU_BANG = "PHAN_VUNG_DU_LIEU_BANG",
    PHAN_VUNG_DU_LIEU_DATABASE = "PHAN_VUNG_DU_LIEU_DATABASE",
    TASK_XU_LY_DU_LIEU = "TASK_XU_LY_DU_LIEU",
    SEGMENT = "SEGMENT",
    MODEL = "MODEL",
    TASK_XU_LY_DU_LIEU_TEN_BUOC_MO_TA = "TASK_XU_LY_DU_LIEU_TEN_BUOC_MO_TA",
    VIEW_MODEL_M16 = "VIEW_MODEL_M16",
    VIEW_MODEL_PROPERTIES_M16 = "VIEW_MODEL_PROPERTIES_M16",
    PROPERTIES_DV_THONG_TIN_SU_DUNG = "PROPERTIES_DV_THONG_TIN_SU_DUNG",
    TASK_DARK_MODE_TTKTXH = "TASK_DARK_MODE_TTKTXH",
    SYSTEM_CONFIGURATION = "SYSTEM_CONFIGURATION",
    SYSTEM_CONFIGURATION_PHIM_TAT = "SYSTEM_CONFIGURATION_PHIM_TAT",
    TASK_XU_LY_DU_LIEU_KHO_LUU_TRU = "TASK_XU_LY_DU_LIEU_KHO_LUU_TRU",
}

export interface CaNhanHoaSettingChung {
    content: CauHinhThanhCongCu;
    type: TypeCaNhanHoa;
    userId: string;
    id: number | null;
}

export interface CaNhanHoaThongBao {
    content: CauHinhThongBao;
    type: TypeCaNhanHoa.THONG_BAO;
    userId: string;
    id: number | null;
}

export class CaNhanHoaService extends BaseService {
    url: string = "/user-service";

    getCaNhanHoa = async (userId: string): Promise<CaNhanHoaSettingChung[]> => {
        let result: CaNhanHoaSettingChung[] = [];
        await AXIOS_INSTANCE.post(`${this.url}/user-setting/find-by-user-id/`, { userId }).then((res) => {
            if (res && res.status !== 200) {
                store.dispatch(openNotification({ open: true, severity: "error", content: "Server không thể thực hiện" }));
            }
            if (res && res.status === 200 && res.data) {
                result = res.data.map((item: CaNhanHoaSettingChung) => ({ ...item, content: JSON.parse(`${item.content}`) }));
            }
        });
        return result;
    };

    insertCaNhanHoaLog = async (request: CaNhanHoaSettingChung): Promise<BaseReponseI<CaNhanHoaSettingChung>> => {
        let result = {} as BaseReponseI<CaNhanHoaSettingChung>;

        await AXIOS_INSTANCE.post(`${this.url}/user-setting/add-or-update`, request).then((res) => {
            if (res.status === 200 && res.data) {
                result = {
                    isSuccess: true,
                    data: res.data.result,
                    message: "Thực hiện thao tác thành công",
                };
            }
            if (res.status !== 200) {
                store.dispatch(openNotification({ open: true, severity: "error", content: "Server không thể thực hiện" }));
            }
        });

        return result;
    };
}
