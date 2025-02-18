import { DanhMucDungRiengDTO, DanhMucHeThongDTO } from "apis/danhMuc/danhMucDungRiengService";
import { ThongTinDiaChiDTO } from "./danhMuc/danhMucDTO";

export interface User {
    userId: string;
    userName: string;
    fullName: string;
    title: string;
    gender: number;
    departmentId: number;
    phoneNumber: string;
    email: string;
    identityNumber: string;
    publishDate: null | Date;
    publishPlace: string;
    nationalityId: number;
    address: string;

    lastSigin: Date;
    userLocked: boolean;
    isActive: boolean;
    password: string;
    resetPassword: boolean;
    passwordReset: string;
}

export interface UserDTO {
    userId: string;
    userName: string;
    fullName: string;
    title: string;
    gender: number;
    departmentId: number;
    phoneNumber: string;
    email: string;
    identityNumber: string;
    publishDate: null | Date;
    publishPlace: string;
    nationalityId: number;
    address: string;

    lastSigin: Date;
    userLocked: boolean;
    active: boolean;
    password: string;
    resetPassword: boolean;
    passwordReset: string;
    userType?: string;
    adType?: string;
    system: SystemDTO[];

    site: DanhMucHeThongDTO[];
    organization: DanhMucDungRiengDTO[];
    linhVucs: DanhMucDungRiengDTO[];
}

export interface SystemDTO {
    id: number;
    name: string;
    status: string;
    description: string;
    deleted: boolean;
    show: boolean;
}

export interface ThongTinNguoiDungFrontEndDTO {
    userId: string;
    fullName: string;
    userName: string;
    soGiayTo: string | null;
    noiCap: string;
    ngayCap?: Date | null;
    ngaySinh?: Date | null;
    gioiTinhId?: number | null;
    loaiGiayToId?: number | null;
    maLoaiGiayTo?: string | null;
    chucVuId?: number | null;
    phongBanId?: number | null;
    heThongId?: number | null;
    soDienThoai: string;
    email: string;
    avatarBase64?: any;
}

export interface userMapDTO extends ThongTinNguoiDungFrontEndDTO, ThongTinDiaChiDTO {}

export interface UserEntiyInputDTO extends ThongTinNguoiDungFrontEndDTO, MapDiaChiFromBackend {}

export interface MapDiaChiFromBackend {
    tinhThanhId?: number | null;
    quanHuyenId?: number | null;
    phuongXaId?: number | null;
    tenTinhThanh?: string | null;
    tenQuanHuyen?: string | null;
    tenPhuongXa?: string | null;
    diaChi?: string | null;
}

export interface DataDropDownList {
    id: string;
    name: string;
    code?: string;
}

export interface UserOrg {
    userId: string;
    userName: string;
    orgId: number;
    orgName: string;
    fullName: string;
}

export interface LogDTO {
    action: string;
    phanHe: string;
}
