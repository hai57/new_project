import moment from "moment";

export default class StringUtil {
    static isNullOrEmty(str: any): boolean {
        if (
            typeof str == "undefined" ||
            !str ||
            str.length === 0 ||
            str === "" ||
            !/[^\s]/.test(str) ||
            /^\s*$/.test(str) ||
            str.toString().replace(/\s/g, "") === ""
        )
            return true;
        else return false;
    }
    static formatMoney(str: string): string {
        if (str.match(/,/g)) {
            const newString = `${str.toString().replace(/,/g, "")}`;
            return `${newString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
        }
        return `${str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
    static checkInputNumber(str: string) {
        if (/^[1-9]?[\d]+$/g.test(str)) {
            return true;
        }
        return false;
    }

    static sumNumber(rows: any[], field: string) {
        return rows.reduce((acc, init) => {
            return acc + Number(init[field]);
        }, 0);
    }

    static formatDate(date?: Date | null) {
        if (date) {
            return moment(date).format("DD/MM/YYYY");
        }
        return "";
    }

    static getyear(date?: Date | null) {
        if (date) {
            return moment(date).year();
        }
        return "";
    }

    static parseTo0xNumber(value?: number) {
        if (value) {
            return value > 0 && value < 10 ? "0" + value : value;
        }
        return 0;
    }

    static b64toBlob(data: string, contentType: string): Blob {
        console.log("b64toBlob");
        try {
            const byteString = atob(data.split(",")[1]);
            const ab = new Uint8Array(byteString.length); // Create Uint8Array

            for (let i = 0; i < byteString.length; i++) {
                ab[i] = byteString.charCodeAt(i); // Populate the Uint8Array
            }

            return new Blob([ab] as BlobPart[], { type: contentType }); // Cast to BlobPart[]
        } catch (error) {
            console.error("Error in b64toBlob:", error);
            return new Blob(); // Return an empty Blob in case of an error
        }
    }
}

export function toolTipScroll(state: { width: number }) {
    return `max-height: 100px; max-width: ${state.width * 0.78}px; min-width: ${state.width * 0.78}px;
    overflow: scroll;
    text-overflow: ellipsis;
    word-wrap: normal;
    white-space: normal;
    display: block;
    word-break: break-word;
    pointer-events: auto !important;
    `;
}

export function toolTipScrollForWeb() {
    return `max-height: 200px;
    max-width: 300px;
    overflow: auto;
    text-overflow: ellipsis;
    word-wrap: normal;
    white-space: normal;
    display: block;
    word-break: break-word;
    pointer-events: auto !important;
    `;
}

export function toolTipPosition(totalLayout: number) {
    if (totalLayout === 1) return ["4%", "-8%"];
    return ["4%", "-20%"];
}
export function toolTipPositionForWeb(pt: any) {
    return [pt[0] - 50, 50];
}

export function doRongChart(width: number, grid: number, isOpenCauHinhBieuDo?: boolean, isZoom?: boolean) {
    let doRongChart = 0;
    if (isOpenCauHinhBieuDo) {
        doRongChart = (((width * 10) / 12 - 130) * (width > 765 ? (grid ? grid : 12) : 12)) / 12;
    } else if (isZoom || (isOpenCauHinhBieuDo && isOpenCauHinhBieuDo == true)) {
        doRongChart = ((width - 10 * (grid ? 12 / grid : 1)) * (width > 765 ? (grid ? grid : 12) : 12)) / 12;
    } else {
        doRongChart = ((width * 0.8 - 10 * (grid ? 12 / grid : 1)) * (width > 765 ? (grid ? grid : 12) : 12)) / 12;
    }
    return doRongChart;
}

export function kichThuocTB(width: number, grid: number, columnNumbers: number, isOpenCauHinhBieuDo?: boolean, isZoom?: boolean) {
    const giaTriTB = (doRongChart(width, grid, isOpenCauHinhBieuDo, isZoom) - 80) / columnNumbers;
    return giaTriTB;
}

export function heightChuyenDe() {
    return "100%";
}

export function gridChuyenDe() {
    return [{ bottom: "2%", containLabel: true, left: "3%", right: "4%", top: "15%" }];
}
