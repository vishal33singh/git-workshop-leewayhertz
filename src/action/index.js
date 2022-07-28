import { eventConstants } from "../constants"


export const handleSidebar = (data) => ({
    type : eventConstants.SET_SIDEBAR,
    payload: data,
})

export const updateKaikasDetails = (data) => ({
    type : eventConstants.UPDATE_KAIKAS_DETAILS,
    payload: data,
})
