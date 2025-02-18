export interface Pagination<T extends Iterable<any>> {
    page: number;
    size: number;
    total: number;
    rows: T;
    content?: T;
}

export interface PageRequest {
    pageSize: number;
    pageNumber: number;
    keywords?: string;
    active?: any;
    direction?: string;
    sortBy?: string;
    keywordsButton?: string;
    resetForm?: boolean;
}
export interface PageRequestCustom {
    size: number;
    page: number;
    keywords?: string;
    active?: any;
    direction?: string;
    sortBy?: string;
    keywordsButton?: string;
    resetForm?: boolean;
}
export const PageRequestINT: PageRequest = {
    pageSize: 10,
    pageNumber: 0,
};

export interface ParamExport extends PageRequest {
    downloadType?: string;
}

export interface BaseResponse {
    isSuccess: boolean;
    message: any;
    data?: any;
    description?: any;
}

export interface DataResponse<T> {
    code: string;
    description: string;
    errors: string;
    message: string;
    result?: T;
    meta?: string;
}

export interface BaseReponseI<T> {
    isSuccess: boolean;
    message: string;
    data: T;
}

export class BaseService {
    protected getTokenRequestHeaders = () => {
        return {
            headers: {
                "Content-Type": "application/json",
            },
        };
    };
}

export enum ResponseCode {
    CONFLICT = "409",
    NOT_FOUND = "404",
    SUCCESS = "200",
    BAD_REQUEST = "400",
}
