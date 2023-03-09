import { constRoute } from "@utils/route";
import React, { Component, memo } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@components/dashboard/index";
import Login from "@components/layout/main-layout/public-layout/login";
import UserList from "@components/users/user-list";
import CreateUser from "@components/users/create-user";

const Routing = () => {
  return (
    <>
      <Routes>
          <Route path={constRoute.dashboard} element={<Dashboard />} />
          <Route path={constRoute.login} element={<Login />} />
          <Route path={constRoute.createUser} element={<CreateUser />} />
          <Route path={constRoute.users} element={<UserList/>} />
      </Routes>
    </>
  );
};
export default memo(Routing);
