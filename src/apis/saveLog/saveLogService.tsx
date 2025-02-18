import AXIOS_INSTANCE from "apis/axiosClient";
import { LogDTO } from "models/user";
import { BaseService, PageRequest } from "../baseService";

export class SaveLogService extends BaseService {
    url: string = "/user-service";

    log = async (request: LogDTO): Promise<any> => {
        await AXIOS_INSTANCE.post(`${this.url}/log/common`, JSON.stringify(request), this.getTokenRequestHeaders()).then((response) => {
            if (response.status === 200) {
                return;
            }
        });
    };
}
