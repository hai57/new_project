export function getSiteDefault() {
    const C_USER_DATA = getUserData();
    return C_USER_DATA ? JSON.parse(C_USER_DATA).siteDefault : "";
}
export function getOrgsDefault() {
    const C_USER_DATA = getUserData();
    return C_USER_DATA ? JSON.parse(C_USER_DATA).orgsDefault : "";
}

export function getSuperAdmin(): boolean {
    const C_USER_DATA = getUserData();
    return C_USER_DATA ? JSON.parse(C_USER_DATA).superAdmin === "true" : false;
}

export function getHasRoleLevelOrg(): boolean {
    const C_USER_DATA = getUserData();
    return C_USER_DATA ? JSON.parse(C_USER_DATA).hasRoleLevelOrg : false;
}
export function getHasRoleLevelSystem(): boolean {
    const C_USER_DATA = getUserData();
    return C_USER_DATA ? JSON.parse(C_USER_DATA).hasRoleLevelSystem : false;
}
export function getAdmin(): boolean {
    const C_USER_DATA = getUserData();;
    return C_USER_DATA ? JSON.parse(C_USER_DATA).isAdmin === "true" : false;
}
export function getSites() {
    const C_USER_DATA = getUserData();;
    return C_USER_DATA ? JSON.parse(C_USER_DATA).sites : [];
}
export function getUserType() {
    const C_USER_DATA = getUserData();
    return C_USER_DATA ? JSON.parse(C_USER_DATA).userType : "CONG_CHUC";
}
export function getUserId() {
    const C_USER_DATA = getUserData();
    return C_USER_DATA ? JSON.parse(C_USER_DATA).userId : "";
}
export function getToken() {
    const C_USER_DATA = getUserData();
    return C_USER_DATA ? JSON.parse(C_USER_DATA).token : "";
}

export function getFulllName() {
    const C_USER_DATA = getUserData();
    return C_USER_DATA ? JSON.parse(C_USER_DATA).fullName : "";
}

export function getUserData() {
    return localStorage.getItem("C_USER_DATA");
}

export function getSiteCurrent() : string {
    const siteName = localStorage.getItem("SITE_SELECTED");
    return siteName ? siteName : "";
}


export function getAvatar() {
    return localStorage.getItem("avatar");
}
//HienLT52
export function getInfoConfigAndLogo() {
    return localStorage.getItem("initSysConfiLogo");
}
export function getInfoLogo() {
    return localStorage.getItem("SysLogoLogin");
}
export function setKeyC_Data(key : string,value : any) {
    const C_USER_DATA = getUserData();
    localStorage.setItem("C_USER_DATA", JSON.stringify({ ...JSON.parse(C_USER_DATA!), [key]: value }));
}
export function deleteKeyC_Data(key : string) {
    const C_USER_DATA = getUserData();
    const obj = JSON.parse(C_USER_DATA!);
    delete obj[key];
    localStorage.setItem("C_USER_DATA", JSON.stringify(obj));
}


