import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";

export function startLogin () {
    return {
        type: LOGIN_START
    }
}

export function login (email,password){
    return (disptch) => {
        const url = APIUrls.login()
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: getFormBody({email,password})
        })
    }
}

// export function startLogin () {
//     return {
//         type: LOGIN_SUCCESS
//     }
// }

// export function startLogin () {
//     return {
//         type: LOGIN_FAILED
//     }
// }