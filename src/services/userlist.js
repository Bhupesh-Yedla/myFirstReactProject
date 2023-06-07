import React from "react";
import UserService from "./user-service";

const UserList = (props) => {
    console.log(props);
    const displayUserList = props.details.map((user) => {
        return (<UserService user={user} />);
    });

}

export default UserList;