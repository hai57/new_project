export interface DanhMucDTO {
    id: Number | null;
    name: String;
    description?: String;
    isActive?: boolean;
}

export interface DanhMucDuLieuQuocGiaDTO {
    id: Number | null;
    maQuocGia?: String;
    tenTiengViet?: String;
    maAlpha?: String;
    tenTiengAnh?: String;
    tenTatTiengViet?: String;
    tenTatTiengAnh?: String;
    ngonNguAlpha2?: String;
    ngonNguAlpha3?: String;
    tenDiaPhuong?: String;
    nuocDocLap?: String;
    ngayBanHanh?: String;
}

export interface DanhMucNganhDaoTaoDTO {
    id: Number | null;
    maTrinhDo?: String;
    tenTrinhDo?: String;
    maNganh?: String;
    tenNganh?: String;
    deleted?: Boolean;
}
export interface SearchDanhMucNganhDaoTaoDTORequest {
    keywords: string;
    levelCode?: string;
    code?: String;
    name?: String;
    pageSize: number;
    pageNumber: number;
}

export interface DanhMucCoQuanDonViDTO {
    id: Number | null;
    maDonVi?: String;
    tenDonVi?: String;
    tenDonViChuQuan?: String;
    diaChi?: String;
    dienThoai?: String;
    email?: String;
    fax?: String;
    website?: String;
}

export interface DanhMucDuLieuDungChungDTO {
    id: Number | null;
    ma?: String;
    ten?: String;
    moTa?: String;
    used?: Boolean;
    quyetDinhBanHanh?: String;
    coQuanBanHanh?: String;
    ngayBanHanh?: String;
}
export const initialValues: DanhMucDuLieuDungChungDTO = {
    id: 0,
    ma: "",
    ten: "",
    moTa: "",
    used: false,
    quyetDinhBanHanh: "",
    coQuanBanHanh: "",
    ngayBanHanh: ""
};

export interface DanhMucDuLieuQuanHuyenDTO extends DanhMucDuLieuDungChungDTO {
    maTinhThanh?: String;
}

export interface DanhMucDuLieuPhuongXaDTO extends DanhMucDuLieuDungChungDTO {
    maQuanHuyen?: String;
}

export interface DanhMucDiaChiDTO {
    name?: String;
    code?: String;
}

export interface ThongTinDiaChiDTO {
    soNhaDuong?: string;

    maPhuongXa: string;
    tenPhuongXa: string;

    maQuanHuyen: string;
    tenQuanHuyen: string;

    maTinhThanh: string;
    tenTinhThanh: string;
}

export const initialValuesDiaChi: ThongTinDiaChiDTO = {
    soNhaDuong: "",

    maPhuongXa: "",
    tenPhuongXa: "",

    maQuanHuyen: "",
    tenQuanHuyen: "",

    maTinhThanh: "",
    tenTinhThanh: "",
};

export interface SearchDMRequest {
    keywords: string;
    active?: boolean;
    isActive?: boolean;
    direction: string;
    sortBy: string;
    pageSize: number;
    pageNumber: number;
}

export const initSearchDMRequest : SearchDMRequest = {
    keywords: "",
    direction: "DESC",
    sortBy: "createdDate",
    pageSize: 10,
    pageNumber: 0
}

export interface SearchDMDLDCRequest {
    keywords: string;
    maTinhThanh?: string;
    maQuanHuyen?: string;
    code?: String;
    name?: String;
    state?: number;
    pageSize: number;
    pageNumber: number;
}

export const initSearchDMDLDCRequest : SearchDMDLDCRequest = {
    keywords: "",
    maTinhThanh: "",
    maQuanHuyen: "",
    code: "",
    name: "",
    state: -1,
    pageSize: 10,
    pageNumber: 0
}
