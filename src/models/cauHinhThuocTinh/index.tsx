// import { AttachFileDTO } from "../../models/attachFileDTO";

export interface LichTrinhPhanVung {
    id: number | null;
    giuPhanVungCu: boolean;
    cauHinhLogs: CauHinhLog[];
}

export const LichTrinhPhanVung_INT: LichTrinhPhanVung = {
    id: null,
    giuPhanVungCu: false,
    cauHinhLogs: [],
};

export interface Config {
    timeFrame: "day"|"week"|"month"|"year";
    logLevel: "TRACE"|"DEBUG"|"INFO"|"WARN"|"ERROR"|"FATAL";
    limitInputQuantity: number;
    limitOutputQuantity: number;
}

export const Config_INT: Config = {
    timeFrame: "day",
    logLevel: "TRACE",
    limitInputQuantity: 500,
    limitOutputQuantity: 5000
}
export interface CauHinhLog {
    id: number | null;
    day: String;
    month: String;
    week: String;
    time: String;
    type: number;
    active: boolean;
}

export const CauHinhLog_INT: CauHinhLog = {
    id: null,
    day: "",
    month: "",
    week: "",
    time: "",
    type: 0,
    active: false,
};

export interface CauHinhThuocTinhDTO {
    mauSacTieuDe: string;
    mauDangChon: string;
    mauNen: string;
    CauHinhLog: CauHinhLog[];
}

export interface CauHinhThongBao {
    fontChu: string;
    fontSize: number;
    orderBy: number;
    tenOrderBy: string;
    color: string;
    id: number | null;
    currentColor?: string;
    mauSacActive: string;
    mauSachDeactive: string;
    sizeThongBao: string;
    sapXepMacDinh: boolean;
}

export enum POSITION {
    NGANG = 0,
    DOC = 1,
}

export enum ORDER {
    A_Z = 0,
    Z_A = 1,
}

export enum VI_TRI {
    TREN = 1,
    DUOI = 2,
}

export enum ORDER_BY {
    ASC = "ASC",
    DESC = "DESC",
}

export enum KICH_CO {
    TOI_THIEU = "TOI_THIEU",
    TOI_DA = "TOI_DA",
}

export interface CauHinhThanhCongCu {
    id: number | null;
    color: string;
    currentColor: string;
    viTri: POSITION;
    tenOrderBy: string;
    orderBy: ORDER;
    maximumSize: number;
    minimumSize: number;
    sizeCongCu: KICH_CO;
    // files: AttachFileDTO[];
}

export interface CauHinhLayout {
    id: number | null;
    background: string;
    mauMenuList: string;
    mauTableHeader: string;
    mauTextTable: string;
    mauTableFooter: string;
    mauThanhMenu: string;
    mauFooter: string;
    mauTextFooter: string;
}

export interface CauHinhHeThong {
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

export const CauHinhHeThong_INT: CauHinhHeThong = {
    id: 0,
    tenHeThong: "",
    tenDonVi: "",
    email: "",
    phone: null,
    // files: new Array<AttachFileDTO>(),
    header: "",
    footer: "",
    failCount: 5,
};

export interface CauHinhPhimTatKhongSuDung {
    index: number;
    tenPhimTat: string;
    moTa: string;
}

export const CauHinhPhimTatKhongSuDung_INT: CauHinhPhimTatKhongSuDung = {
    index: 0,
    tenPhimTat: "",
    moTa: "",
};
