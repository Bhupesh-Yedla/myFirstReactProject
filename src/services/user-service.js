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

export default UserService;
