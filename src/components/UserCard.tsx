import React from "react";
import USER from "../models/User"

export const UserCard = (props: {user: USER}) => {
  return (
    <div>
      <h2>{props.user.name}</h2>
      <img src={props.user.profileImg} alt="user profile" />
    </div>
  )
}