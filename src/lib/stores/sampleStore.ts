import { writable } from "svelte/store";
import { getApi, errHandler } from '../../service/api.js';

const setSample = () => {
    let initValues = {};

    const {subscribe, update, set} = writable({...initValues});

    const getSample = async (/** @type {any} */) => {
        try {
            const options = {
                path: '',
            };
            const res = await getApi(options);
        } catch (err : any) {
            const res = err.response.status;
            errHandler(res);
        }
    }
    return {
        subscribe,
        getSample,
    }
}

export const sample = setSample();