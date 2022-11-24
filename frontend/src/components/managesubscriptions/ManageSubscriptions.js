import React, {useEffect} from "react";
import {Route, Redirect, withRouter, Switch} from "react-router-dom";
import {Layout, Menu, message, Image} from "antd";
import {useState} from "react";
import {useCookies} from "react-cookie";
import utils from "../../common/Utils";

const ManageSubscriptions = () => {
  const [cookies, setCookies] = useCookies();
  const [state, setState] = useState({
    free: 0,
    premium: 0,
  });
  useEffect(() => {
   utils.utilFetch("get", )
  });
  let token = cookies.get("token");
  return <></>;
};

export default ManageSubscriptions;
