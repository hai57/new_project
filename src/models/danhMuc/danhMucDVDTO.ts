import { FileResponse } from "apis/caNhanHoaService/systemConfigService";
// import { AttachFileDTO } from "../../models/attachFileDTO";

export interface DMDichVuDTO {
    id: Number | null;
    name: String;
    code: String;
    description: String;
    active: boolean;
    layoutActive: boolean;
    sudung: boolean;
    dichVuId: Number | null;
    maLinhVuc: string;
    tenLinhVuc: String;
    totalPageNumber: number;
    mauSacActive?: string;
    mauSachDeactive?: string;
    option: Number;
    type: Number;
    message?: string;
}

export const initDanhMucDV: DMDichVuDTO = {
    id: null,
    type: 0,
    name: "",
    code: "",
    description: "",
    active: true,
    layoutActive: true,
    sudung: true,
    dichVuId: null,
    maLinhVuc: "",
    tenLinhVuc: "",
    totalPageNumber: 0,
    option: 0,
};

export interface PageRequest {
    pageSize: number;
    pageNumber: number;
}

export interface RequestSearchDMDV extends PageRequest {
    keywords?: string;
    isActive?: boolean;
    isUsed?: number;
    direction?: string;
    sortBy?: string;
    keywordsButton?: string;
    active?: number;
    maLinhVuc?: string;
    typeSetting?: string;
}

export const initRequestSearchDMDV: RequestSearchDMDV = {
    keywords: "",
    pageNumber: 0,
    pageSize: 10,
    direction: "DESC",
    sortBy: "",
    active: 0,
    isUsed: 0,
    maLinhVuc: "",
    typeSetting: "",
};

export interface CauHinhDMDichVuDTO {
    id: number | null;
    dichVuId: number | null;
    viTriDanhSach: number;
    mauSacActive: string;
    mauSachDeactive: string;
    sizeToiThieu: number;
    sizeToiDa: number;
    tenFont: string;
    sizeToiThieuIsUsed: boolean;
    sizeToiDaIsUsed: boolean;
    hienThiMacDinh: boolean;
    ghiChu: string;
}

export const initCauHinhDV: any = {
    id: 0,
    dichVuId: 0,
    viTriDanhSach: 0,
    mauSacActive: "#367fa9",
    mauSachDeactive: "#AAA",
    sizeToiThieu: 13,
    sizeToiDa: 13,
    tenFont: "Time New Roman",
    sizeToiDaIsUsed: false,
    sizeToiThieuIsUsed: false,
    hienThiMacDinh: false,
    ghiChu: "",
};

export interface CauHinhTaskDichVuDTO {
    id: number | null;
    orderby: number;
    recordId: String | null;
    mauSacDoUuTien: string;
    mauSacHighLight: string;
    sizeToiThieu: number;
    sizeToiDa: number;
    tenFont: string;
    sizeToiThieuIsUsed: boolean;
    sizeToiDaIsUsed: boolean;
    hienThiMacDinh: boolean;
    ghiChu: string;
}

export interface CauHinhTaskDVPropertiesDTO {
    id: number | null;
    recordId: String | null;
    orderby: number;
    mauSac: string;
    sizeToiThieu: number;
    sizeToiDa: number;
    tenFont: string;
    sizeToiThieuIsUsed: boolean;
    sizeToiDaIsUsed: boolean;
    hienThiMacDinh: boolean;
    ghiChu: string;
    style: string;
}
export interface CauHinhViewModelM16DTO {
    id: number | null;
    orderby: number;
    recordId: String | null;
    mauSacActive: string;
    mauSacDeactive: string;
    sizeToiThieu: number;
    sizeToiDa: number;
    tenFont: string;
    sizeToiThieuIsUsed: boolean;
    sizeToiDaIsUsed: boolean;
    hienThiMacDinh: boolean;
    ghiChu: string;
}

export interface CauHinhViewModelM16PropertiesDTO {
    id: number | null;
    recordId: String | null;
    orderby: number;
    mauSacActive: string;
    mauSacDeactive: string;
    sizeToiThieu: number;
    sizeToiDa: number;
    tenFont: string;
    sizeToiThieuIsUsed: boolean;
    sizeToiDaIsUsed: boolean;
    hienThiMacDinh: boolean;
    ghiChu: string;
    style: string;
}

export interface CauHinhHeThongDTO {
    id: number | null;
    tenHeThong: string;
    tenDonVi: string;
    email: string;
    phone: number | null;
    // files: AttachFileDTO[];
    header: string;
    footer: string;
    failCount: number;
}

export interface SystemConfigInfoDTO {
    systemName: string;
    orgName: string;
    email: string;
    phone: number | null;
    headerInfo: string;
    footerInfo: string;
    filename: string;
    fileId: string;
    attachFileServer?: FileResponse[];
    // files: AttachFileDTO[];
    // failCount: number;
}

export const SystemConfigInfoDTO_INT : SystemConfigInfoDTO = {
    systemName: "",
    orgName: "",
    email: "",
    phone: 0,
    headerInfo: "",
    footerInfo: "",
    filename: "",
    fileId: ""
}

export interface CauHinhPhimTatKhongSuDungDTO {
    index:  number;
    tenPhimTat: string;
    moTa: string;
}
