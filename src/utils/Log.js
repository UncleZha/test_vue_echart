import api from "../axios/api.url";
import axios from "../axios/axios";

function getLog(describe, itemVal) {
    axios({
            method: "post",
            url: api.queryLog,
            data: {
                log: describe + ":" + JSON.stringify(itemVal)
            }
        })
        .then(res => {
            if (res.code == 0) {} else {
                console.log(res.message)
            }
        })
        .catch(rtn => {
            console.log(rtn);
        });
}

export default getLog;