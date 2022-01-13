import axios from "axios";
import store from '../store';
import { HOST_NAME } from "./constants";

export async function postToServer(url, data) {
    let res = await axios.post(HOST_NAME + url, data);
    return res.data;
}

export function updateState() {
    postToServer('/updateState', {
        state: store.getState().allEvents,
        username: store.getState().userInfo.username,
    });
}