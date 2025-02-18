import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseReponseI, BaseService } from "apis/baseService";
import { openNotification } from "apis/redux/actions/notificationAction";
import { store } from "apis/redux/store";
import { SystemConfigInfoDTO } from "models/danhMuc/danhMucDVDTO";

export interface SystemConfigRequest {
  type: "SYSTEM_INFO";
  data: SystemConfigInfoDTO;
  siteCode: string;
  id: number | null
}
export interface SystemConfigResponse {
  id: number;
  type: string;
  data: SystemConfigInfoDTO;
  siteCode: string;
}

export interface FileResponse {
  fileExtension: string;
  fileId: string;
  filename: string;
}

export interface ServiceListResponse {
  id: number,
  name: string,
  code: string,
}


export class SystemConfigService extends BaseService {
  url: string = "/control-app";
  urlSystem: string = this.url + "/system-config"


  insertOrUpdateSystem = async (request: SystemConfigRequest): Promise<SystemConfigResponse | null> => {
      let result = {} as SystemConfigResponse;
      if (request.id) {
      await AXIOS_INSTANCE.put(`${this.urlSystem}/${request.id}`, request).then((res) => {
          if (res.status === 200 && res.data) {
              result = res.data;
          }
          if (res.status !== 200) {
              store.dispatch(openNotification({ open: true, severity: "error", content: "Server không thể thực hiện" }));
          }
      });
    } else {
      await AXIOS_INSTANCE.post(`${this.urlSystem}/create`, request).then((res) => {
          if (res.status === 200 && res.data) {
              result = res.data;
          }
          if (res.status !== 200) {
              store.dispatch(openNotification({ open: true, severity: "error", content: "Server không thể thực hiện" }));
          }
      });
    }

      return result;
  };

  getSystemConfigBySiteCode = async (siteCode: string, type: string): Promise<SystemConfigResponse | null> => {
    let result = {} as SystemConfigResponse;

    await AXIOS_INSTANCE.get(`${this.urlSystem}/find-by-site-type?siteCode=${siteCode}&type=${type}`).then((res)=> {
      if (res.status === 200 && res.data) {
        result = res.data;
      }
      if(res.status !== 200) {
        store.dispatch(openNotification({open: true, severity: "error", content: "Server không thể thực hiên"}));
      }
    })
    return result
  }

  fileUpload = async (file: File, resource: string): Promise<BaseReponseI<FileResponse>>  => {
    let result : BaseReponseI<FileResponse>;
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await AXIOS_INSTANCE.post(`${this.url}/file/upload?resource=${resource}`, formData)
      if (response.status === 200) {
        console.log("Upload thành công:", response.data);
        result = {
          isSuccess: response.status === 200,
          message: "Thành công",
          data: response.data,
        };
      } else {
          console.error("Lỗi khi upload file:", response.status);
          return null;
      }

    } catch(error) {
      console.error("Lỗi khi gọi API upload file:", error);
      return null;
    }
    return result
  }
  //phan he
  getList = async (active: boolean, siteCode: string): Promise<ServiceListResponse[]> => {
        let result = [] as ServiceListResponse[];
        await AXIOS_INSTANCE.get(`${this.url}/dm-service/getList?active=${active}&siteCode=${siteCode}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = response.data;
            } else {
              console.error("Server không thực hiện được");
            }
        });
        return result;
    };

}
