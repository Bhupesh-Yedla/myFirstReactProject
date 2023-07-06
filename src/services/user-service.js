import { myAxios } from './helper';

var userdata='';

function UserService (props){
    userdata = props.data;
    //console.log(userdata);
}

export const login = (event) => {
    return myAxios
    .get("/demo", {params: userdata} )
    .then((response) => response.data);
};

export const signup = (event) => {
    return myAxios
    .post("/signup", userdata)
    .then((response) => response.data);
};

export const endInnings = (userdata) => {
    console.log(userdata)
    return myAxios
        .post("/enterscore", JSON.stringify(userdata), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.data)
}

export default UserService;
