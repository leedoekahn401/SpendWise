export const BASE_URL = "http://localhost:8080/api";

export const API_PATH = {
    AUTH:{
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        CHANGE_PASSWORD: "/auth/change-pass/me",
        GET_INFO: "/auth/info/me",
        GET_INFOS: "/auth/info"
    },
    TRANSACTION:{
       CREATE: "/transaction",
       GET_TRANSACTION: "/transaction",
       GET_INCOME: "/transaction/income",
       GET_EXPENSE: "/transaction/expense"
    },
    GROUP:{
        CREATE: "/group",
        GET_MY_GROUPS: "/group",
        GET_GROUP: "/group/me"
    },
    INVITE:{
        SEND_INVITE: "/group/send-invite",
        ACCEPT_INVITE: "/group/accept-invite",
        GET_INVITES: "/group/invites"
    },
    DASHBOARD:{
        GET_DAILY_SUMMARY: "/dashboard/summary"
    },
    UPLOAD:{
        AVATAR: "/upload"
    },


}