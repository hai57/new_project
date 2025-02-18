import AXIOS_INSTANCE from "apis/axiosClient";
import { BaseResponse, BaseService, DataResponse, PageRequest, Pagination } from "../baseService";
import { SUCCESS } from "constants/statusCode";
import { SystemDTO } from "models/user";

export interface DanhMucDTO {
    id: Number | null;
    name: String;
    code: String;
    description?: String;
    active?: boolean;
    delete?: boolean;
}

export interface DanhMucHeThongDTO {
    id: string;
    parentId: string;
    code: string;
    name: string;
    parentName: string;
    userName: string;
    description: string;
    icon: string;
    color: string;
    contextPath: string;
    defaultPath: string;
    active: boolean;
    default_: boolean;
    checked?: boolean;
    priority: number;
    heThongDichVus?: DanhMucHeThongDichVuDTO[];
    adType: string;
    system: SystemDTO[];
}

export interface DanhMucHeThongDichVuDTO extends DanhMucDTO {
    url: String;
    checked?: boolean;
    message?: string;
    color?:string;
    icon?:string;
}

export interface DanhMucDungRiengDTO {
    id: string;
    name: string;
    description: string;
    active: boolean;
    delete: boolean;
    code: String;
    typeDM: TypeDM;
    phamViQuanLyId?: Number;
    phamViQuanLyName?: String;
    parentCode?: string;
    default_?: boolean;
    checked?: boolean;
    url?: string;
    srcImage?: string;
    typeLV?: Number | null;
    icon?: any;
    title?: string;
    subTitle?: string;
    siteName?: string;
    siteCode?: string;
    userName?: string;
}
export enum TypeDM {
    CHUC_VU = "chuc-vu",
    PHONG_BAN = "phong-ban",
    LOAI_GIAY_TO = "loai-giay-to",
    DUNG_CHUNG = "dung-chung",
    PHIM_TAT = "phim-tat",
    HE_THONG = "he-thong",
    LOAI_DANH_MUC = "loai-danh-muc",
    DICH_VU = "dich-vu",
    ROUTER = "router",
    PHONG_BAN_SEARCH = "phong-ban/search",
    SYND_FEED = "new_synd_rss",
    ROUTER_APP = "router-app",
    LINH_VUC = "linh-vuc",
    LOAI_THONG_BAO = "loai-thong-bao",
    DM_KEYWORD = "keyword",
    NHOM_DICH_VU = "nhom-dich-vu",
    PHAN_HE = "phan-he",
    SERVER = "server",
}

export interface DanhMucPhanHeDTO extends DanhMucDungRiengDTO {
    parentId: number;
    parentCode: string;
    parentName: string;
    checked?: boolean;
}

export interface DanhMucDungRiengRequest extends PageRequest {
    typeDM: TypeDM;
    isActive?: Boolean;
    keywordsButton?: string;
    siteCode?: string;
    idEdit?: Number;
}

// export class DanhMucDungRiengService extends BaseService {
//     url: string = "/user-service";

//     getDMDungRieng = async (request: DanhMucDungRiengRequest): Promise<Pagination<DanhMucDungRiengDTO[]>> => {
//         let result = {
//             page: request.pageNumber,
//             size: request.pageSize,
//             total: 0,
//             rows: [],
//         } as Pagination<DanhMucDungRiengDTO[]>;
//         await AXIOS_INSTANCE.post(`${this.url}/danh-muc/phan-hang-search`, request)
//             .then((response) => {
//                 if (response.status === 200 && response.data) {
//                     result = {
//                         ...result,
//                         total: response.data.totalElements,
//                         rows: response.data.content,
//                     };
//                 }
//             })
//             .catch();
//         return result;
//     };

//     insertOrUpdate = async (request: DanhMucDungRiengDTO): Promise<BaseResponse> => {
//         let result = {} as BaseResponse;
//         await AXIOS_INSTANCE.post(`${this.url}/danh-muc/ph-add-or-update`, JSON.stringify(request), this.getTokenRequestHeaders())
//             .then((response) => {
//                 result = {
//                     isSuccess: response.data && response.status === 200,
//                     message: response.data.message,
//                 };
//             })
//             .catch(
//                 () =>
//                     (result = {
//                         isSuccess: false,
//                         message: "Có lỗi khi thực hiện kết nối tới server",
//                     })
//             );
//         return result;
//     };

//     deleteById = async (request: DanhMucDungRiengDTO): Promise<BaseResponse> => {
//         let result = {} as BaseResponse;
//         await AXIOS_INSTANCE.post(`${this.url}/danh-muc/delete`, JSON.stringify({ id: request.id }), this.getTokenRequestHeaders())
//             .then((response) => {
//                 result = {
//                     isSuccess: response.data && response.status === 200,
//                     message: response.data.message,
//                 };
//             })
//             .catch(
//                 () =>
//                     (result = {
//                         isSuccess: false,
//                         message: "Có lỗi khi thực hiện kết nối tới server",
//                     })
//             );
//         return result;
//     };
// }
export class DanhMucDungRiengService extends BaseService {
    url: string = "/user-service";

    getAll = async (typeDM: TypeDM) => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/${typeDM}/findAll`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = {
                    ...result,
                    data: response.data,
                };
            }
        });
        return result;
    };

    getById = async (id: string, typeDM: TypeDM) => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/${typeDM}/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = {
                    ...result,
                    data: response,
                };
            }
        });
        return result;
    };

    getByCode = async (code: string, typeDM: TypeDM) => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/${typeDM}/findByCode/${code}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            console.log("response : ", response);
            if (response.status === 200 && response.data) {
                result = {
                    ...result,
                    data: response.data,
                };
            }
        });
        return result;
    };

    getByUserId = async (userId: string, typeDM: TypeDM) => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/${typeDM}/findByUserId/${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = {
                    ...result,
                    data: response,
                };
            }
        });
        return result;
    };

    getDMDungRieng = async (request: DanhMucDungRiengRequest): Promise<Pagination<DanhMucDungRiengDTO[]>> => {
        let result = {
            page: request.pageNumber,
            size: request.pageSize,
            total: 0,
            rows: [],
        } as Pagination<DanhMucDungRiengDTO[]>;
        if (request.typeDM === TypeDM.PHONG_BAN) {
            await AXIOS_INSTANCE.get(`${this.url}/danh-muc/` + String(TypeDM.PHONG_BAN_SEARCH), {
                headers: {
                    "Content-Type": "application/json",
                },
                params: request,
            }).then((response) => {
                if (response.status === 200 && response.data) {
                    result = {
                        ...result,
                        total: response.data.totalElements,
                        rows: response.data.content,
                    };
                }
            });
        } else {
            await AXIOS_INSTANCE.get(`${this.url}/danh-muc/${request.typeDM}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                params: request,
            }).then((response) => {
                if (response.status === 200 && response.data) {
                    result = {
                        ...result,
                        total: response.data.totalElements,
                        rows: response.data.content,
                    };
                }
            });
        }

        return result;
    };

    getDMPhongBangByAcitve = async (linhVucId: string) => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/phong-ban/find-by-active?linhVucId=${linhVucId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = {
                    ...result,
                    data: response.data,
                    isSuccess: true,
                };
            }
        });
        return result;
    };

    getDMPhimTatSelect = async (request: DanhMucDungRiengRequest) => {
        let result = { rows: [] };
        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/${request.typeDM}/list`, {
            headers: {
                "Content-Type": "application/json",
            },
            params: request,
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = {
                    ...result,
                    rows: response.data,
                };
            }
        });
        return result;
    };

    getDMHeThong = async (request: DanhMucDungRiengRequest): Promise<Pagination<DanhMucHeThongDTO[]>> => {
        let result = {
            page: request.pageNumber,
            size: request.pageSize,
            total: 0,
            rows: [],
        } as Pagination<DanhMucHeThongDTO[]>;

        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/he-thong/findAll`, {
            headers: {
                "Content-Type": "application/json",
            },
            params: request,
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = {
                    ...result,
                    total: response.data.totalElements,
                    rows: response.data.content,
                };
            }
        });
        return result;
    };

    getDMPhanHe = async (request: DanhMucDungRiengRequest): Promise<Pagination<DanhMucPhanHeDTO[]>> => {
        let result = {
            page: request.pageNumber,
            size: request.pageSize,
            total: 0,
            rows: [],
        } as Pagination<DanhMucPhanHeDTO[]>;

        await AXIOS_INSTANCE.post(`${this.url}/danh-muc/phan-he/find-all`, request, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = {
                    ...result,
                    total: response.data.totalElements,
                    rows: response.data.content,
                };
            }
        });
        return result;
    };

    getDMHeThongByParentId = async (id: number): Promise<DanhMucHeThongDTO[]> => {
        let result: DanhMucHeThongDTO[] = [];
        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/he-thong/findByParentId/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = response.data.result;
            }
        });
        return result;
    };

    getDMPhanHeByParentCode = async (code: string): Promise<DanhMucPhanHeDTO[]> => {
        let result: DanhMucPhanHeDTO[] = [];
        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/phan-he/find-by-parent-code/${code}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = response.data.result;
            }
        });
        return result;
    };

    getDMHeThongByParentAndUserId = async (parentId: number, userId: string): Promise<DanhMucHeThongDTO[]> => {
        let result: DanhMucHeThongDTO[] = [];
        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/he-thong/findByParentAndUserId/?parentId=${19}&userId=${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = response.data.result;
            }
        });
        return result;
    };

    getDMHeThongByUserId = async (): Promise<DanhMucHeThongDTO[]> => {
        let result: DanhMucHeThongDTO[] = [];
        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/he-thong/getParentByUserId`, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = response.data.result;
            }
        });
        return result;
    };

    getDMHeThongByParentAndUserIdHome = async (parentId: number, userId: string): Promise<DanhMucHeThongDTO[]> => {
        let result: DanhMucHeThongDTO[] = [];
        console.log("parentId : ", parentId);
        console.log("userId : ", userId);
        const requestDTO = {
            parentId: parentId,
            userId: userId,
        };
        console.log("requestDTO : ", requestDTO);
        await AXIOS_INSTANCE.post("/user-service/danh-muc/he-thong/findByParentAndUserId_Home", requestDTO).then((response) => {
            if (response && response.status === 200 && response.data) {
                result = response.data.result;
            }
        });
        return result;
    };

    getDMHeThongChilrenByUserId = async (userId: string): Promise<DanhMucHeThongDTO[]> => {
        let result: DanhMucHeThongDTO[] = [];
        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/he-thong/findByParentAndUserId/children`, {
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                userId: userId,
            },
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = response.data.result;
            }
        });
        return result;
    };

    insert = async (request: DanhMucDungRiengDTO): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.post(`${this.url}/danh-muc/${request.typeDM}`, JSON.stringify(request), this.getTokenRequestHeaders())
            .then((response) => {
                result = {
                    isSuccess: response.data && response.status === 200,
                    message: response.data.message ? response.data.message : "Thêm thành công",
                };
            })
            .catch(
                () =>
                    (result = {
                        isSuccess: false,
                        message: "Có lỗi khi thực hiện kết nối tới server",
                    })
            );
        return result;
    };

    addOrUpdateHT = async (request: DanhMucHeThongDTO): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.post(`${this.url}/danh-muc/he-thong/add-or-update`, JSON.stringify(request), this.getTokenRequestHeaders())
            .then((response) => {
                result = {
                    isSuccess: response.data && response.status === 200,
                    message: response.data.message,
                };
            })
            .catch(
                () =>
                    (result = {
                        isSuccess: false,
                        message: "Có lỗi khi thực hiện kết nối tới server",
                    })
            );
        return result;
    };

    addPH = async (request: DanhMucPhanHeDTO): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.post(`${this.url}/danh-muc/phan-he`, JSON.stringify(request), this.getTokenRequestHeaders())
            .then((response) => {
                result = {
                    isSuccess: response.data && response.status === 200,
                    message: response.data.message,
                };
            })
            .catch(
                () =>
                    (result = {
                        isSuccess: false,
                        message: "Có lỗi khi thực hiện kết nối tới server",
                    })
            );
        return result;
    };

    updatePH = async (request: DanhMucPhanHeDTO): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.put(`${this.url}/danh-muc/phan-he`, JSON.stringify(request), this.getTokenRequestHeaders())
            .then((response) => {
                result = {
                    isSuccess: response.data && response.status === 200,
                    message: response.data.message,
                };
            })
            .catch(
                () =>
                    (result = {
                        isSuccess: false,
                        message: "Có lỗi khi thực hiện kết nối tới server",
                    })
            );
        return result;
    };

    insertPB = async (request: DanhMucDungRiengDTO): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.post(`${this.url}/danh-muc/${request.typeDM}/insert`, JSON.stringify(request), this.getTokenRequestHeaders())
            .then((response) => {
                let message;
                if (response.status == 208) {
                    message = "Mã phòng ban đã tồn tại!";
                } else if (response.status !== 200) {
                    message = response.data.message;
                } else {
                    message = "Thêm thành công";
                }
                result = {
                    isSuccess: response.data && response.status === 200,
                    message: message,
                };
            })
            .catch(
                () =>
                    (result = {
                        isSuccess: false,
                        message: "Có lỗi khi thực hiện kết nối tới server",
                    })
            );
        return result;
    };
    addOrUpdatePT = async (request: DanhMucDungRiengDTO): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.post(`${this.url}/danh-muc/${request.typeDM}/add-or-update`, JSON.stringify(request), this.getTokenRequestHeaders())
            .then((response) => {
                let message;
                if (response.status == 208) {
                    message = "Mã phòng ban đã tồn tại!";
                } else if (response.status !== 200) {
                    message = response.data.message;
                } else if (response.data.statusCodeValue === 500) {
                    let bodyMessage = JSON.parse(String(response.data.body));
                    message = bodyMessage.message;
                } else {
                    message = "Thêm thành công";
                }
                result = {
                    isSuccess: response.data && response.status === 200 && response.data.statusCodeValue !== 500,
                    message: message,
                };
            })
            .catch(
                () =>
                    (result = {
                        isSuccess: false,
                        message: "Có lỗi khi thực hiện kết nối tới server",
                    })
            );
        return result;
    };
    updatePB = async (request: DanhMucDungRiengDTO): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.put(`${this.url}/danh-muc/${request.typeDM}/update`, JSON.stringify(request), this.getTokenRequestHeaders())
            .then((response) => {
                let message;
                if (response.status == 208) {
                    message = "Mã phòng ban đã tồn tại!";
                } else if (response.status !== 200) {
                    message = response.data.message;
                } else {
                    message = "Cập nhật thành công";
                }
                result = {
                    isSuccess: response.data && response.status === 200,
                    message: message,
                };
                result = {
                    isSuccess: response.data && response.status === 200,
                    message: message,
                };
            })
            .catch(
                () =>
                    (result = {
                        isSuccess: false,
                        message: "Có lỗi khi thực hiện kết nối tới server",
                    })
            );
        return result;
    };
    update = async (request: DanhMucDungRiengDTO): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.put(`${this.url}/danh-muc/${request.typeDM}`, JSON.stringify(request), this.getTokenRequestHeaders())
            .then((response) => {
                result = {
                    isSuccess: response.data && response.status === 200,
                    message: response.data.message ? response.data.message : "Cập nhật thành công",
                };
            })
            .catch(
                () =>
                    (result = {
                        isSuccess: false,
                        message: "Có lỗi khi thực hiện kết nối tới server",
                    })
            );
        return result;
    };

    deleteById = async (id: String, typeDM: TypeDM): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.delete(`${this.url}/danh-muc/${typeDM}/${id}`, this.getTokenRequestHeaders())
            .then((response) => {
                result = {
                    isSuccess: response.data && response.status === 200,
                    message: response.data.message,
                };
            })
            .catch(
                () =>
                    (result = {
                        isSuccess: false,
                        message: "Phòng ban tồn tại người dùng nên không thể xóa",
                    })
            );
        return result;
    };

    deleteMultiple = async (idList: number[], typeDM: TypeDM): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.post(`${this.url}/danh-muc/${typeDM}/delete-all?ids=${idList}`, this.getTokenRequestHeaders())
            .then((response) => {
                result = {
                    isSuccess: response.data && response.status === 200,
                    message: response.data.message,
                };
            })
            .catch();
        return result;
    };

    deletePhongBanById = async (id: String, typeDM: TypeDM): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        await AXIOS_INSTANCE.delete(`${this.url}/danh-muc/${typeDM}/delete/${id}`, this.getTokenRequestHeaders())
            .then((response) => {
                result = {
                    isSuccess: response.data && response.status === 200,
                    message: response.data.message,
                };
            })
            .catch(
                () =>
                    (result = {
                        isSuccess: false,
                        message: "Phòng ban tồn tại người dùng nên không thể xóa",
                    })
            );
        return result;
    };

    getDMRouter = async (): Promise<BaseResponse> => {
        let result = {} as BaseResponse;
        const response = await AXIOS_INSTANCE.get(`${this.url}/danh-muc/router/find-by-site-code`);
        if (response.data && response.status === SUCCESS) {
            result = {
                ...result,
                data: response.data,
                isSuccess: true,
            };
        }
        return result;
    };

    getDMPhimTat = async (request: DanhMucDungRiengRequest): Promise<Pagination<DanhMucDungRiengDTO[]>> => {
        let result = {
            page: request.pageNumber,
            size: request.pageSize,
            total: 0,
            rows: [],
        } as Pagination<DanhMucDungRiengDTO[]>;

        await AXIOS_INSTANCE.get(`${this.url}/danh-muc/phim-tat/search-custom`, {
            headers: {
                "Content-Type": "application/json",
            },
            params: request,
        }).then((response) => {
            if (response.status === 200 && response.data) {
                result = {
                    ...result,
                    total: response.data.totalElements,
                    rows: response.data.content,
                };
            }
        });
        return result;
    };

    checkAccessHeThong = async (siteCode: string): Promise<DataResponse<any>> => {
        let result = {} as DataResponse<any>;
        siteCode !== "null" &&
            (await AXIOS_INSTANCE.get(`${this.url}/danh-muc/${TypeDM.HE_THONG}/check-access/${siteCode}`, this.getTokenRequestHeaders())
                .then((response) => {
                    result = response.data;
                    // console.log("checking access", result.result);
                })
                .catch());
        return result;
    };
}
// export class DanhMucPhongBanService extends BaseService {
//     url: string = "/user-service";

//     getDMPhongBan = async (request: DanhMucDungRiengRequest): Promise<Pagination<DanhMucDungRiengDTO[]>> => {
//         let result = {
//             page: request.pageNumber,
//             size: request.pageSize,
//             total: 0,
//             rows: [],
//         } as Pagination<DanhMucDungRiengDTO[]>;
//         await AXIOS_INSTANCE.get(`${this.url}/danh-muc/phong-ban`, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             params: request,
//         }).then((response) => {
//             if (response.status === 200 && response.data) {
//                 result = {
//                     ...result,
//                     total: response.data.totalElements,
//                     rows: response.data.content,
//                 };
//             }
//         });
//         return result;
//     };

//     insert = async (request: DanhMucDungRiengDTO): Promise<BaseResponse> => {
//         let result = {} as BaseResponse;
//         await AXIOS_INSTANCE.post(`${this.url}/danh-muc/phong-ban`, JSON.stringify(request), this.getTokenRequestHeaders())
//             .then((response) => {
//                 result = {
//                     isSuccess: response.data && response.status === 200,
//                     message: response.data.message,
//                 };
//             })
//             .catch(
//                 () =>
//                     (result = {
//                         isSuccess: false,
//                         message: "Có lỗi khi thực hiện kết nối tới server",
//                     })
//             );
//         return result;
//     };
//     update = async (request: DanhMucDungRiengDTO): Promise<BaseResponse> => {
//         let result = {} as BaseResponse;
//         await AXIOS_INSTANCE.put(`${this.url}/danh-muc/phong-ban`, JSON.stringify(request), this.getTokenRequestHeaders())
//             .then((response) => {
//                 result = {
//                     isSuccess: response.data && response.status === 200,
//                     message: response.data.message,
//                 };
//             })
//             .catch(
//                 () =>
//                     (result = {
//                         isSuccess: false,
//                         message: "Có lỗi khi thực hiện kết nối tới server",
//                     })
//             );
//         return result;
//     };
//     deleteById = async (id: String): Promise<BaseResponse> => {
//         let result = {} as BaseResponse;
//         await AXIOS_INSTANCE.delete(`${this.url}/danh-muc/phong-ban/${id}`, this.getTokenRequestHeaders())
//             .then((response) => {
//                 result = {
//                     isSuccess: response.data && response.status === 200,
//                     message: response.data.message,
//                 };
//             })
//             .catch(
//                 () =>
//                     (result = {
//                         isSuccess: false,
//                         message: "Có lỗi khi thực hiện kết nối tới server",
//                     })
//             );
//         return result;
//     };
// }
// export class DanhMucLoaiGiayToService extends BaseService {
//     url: string = "/user-service";

//     getDMLoaiGiayTo = async (request: DanhMucDungRiengRequest): Promise<Pagination<DanhMucDungRiengDTO[]>> => {
//         let result = {
//             page: request.pageNumber,
//             size: request.pageSize,
//             total: 0,
//             rows: [],
//         } as Pagination<DanhMucDungRiengDTO[]>;
//         await AXIOS_INSTANCE.get(`${this.url}/danh-muc/loai-giay-to`, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             params: request,
//         }).then((response) => {
//             if (response.status === 200 && response.data) {
//                 result = {
//                     ...result,
//                     total: response.data.totalElements,
//                     rows: response.data.content,
//                 };
//             }
//         });
//         return result;
//     };

//     insert = async (request: DanhMucDungRiengDTO): Promise<BaseResponse> => {
//         let result = {} as BaseResponse;
//         await AXIOS_INSTANCE.post(`${this.url}/danh-muc/loai-giay-to`, JSON.stringify(request), this.getTokenRequestHeaders())
//             .then((response) => {
//                 result = {
//                     isSuccess: response.data && response.status === 200,
//                     message: response.data.message,
//                 };
//             })
//             .catch(
//                 () =>
//                     (result = {
//                         isSuccess: false,
//                         message: "Có lỗi khi thực hiện kết nối tới server",
//                     })
//             );
//         return result;
//     };
//     update = async (request: DanhMucDungRiengDTO): Promise<BaseResponse> => {
//         let result = {} as BaseResponse;
//         await AXIOS_INSTANCE.put(`${this.url}/danh-muc/loai-giay-to`, JSON.stringify(request), this.getTokenRequestHeaders())
//             .then((response) => {
//                 result = {
//                     isSuccess: response.data && response.status === 200,
//                     message: response.data.message,
//                 };
//             })
//             .catch(
//                 () =>
//                     (result = {
//                         isSuccess: false,
//                         message: "Có lỗi khi thực hiện kết nối tới server",
//                     })
//             );
//         return result;
//     };
//     deleteById = async (id: String): Promise<BaseResponse> => {
//         let result = {} as BaseResponse;
//         await AXIOS_INSTANCE.delete(`${this.url}/danh-muc/loai-giay-to/${id}`, this.getTokenRequestHeaders())
//             .then((response) => {
//                 result = {
//                     isSuccess: response.data && response.status === 200,
//                     message: response.data.message,
//                 };
//             })
//             .catch(
//                 () =>
//                     (result = {
//                         isSuccess: false,
//                         message: "Có lỗi khi thực hiện kết nối tới server",
//                     })
//             );
//         return result;
//     };
// }
