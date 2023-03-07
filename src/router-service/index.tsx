import { constRoute } from "@utils/route";
import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@components/dashboard/index";
import Login from "@components/layout/main-layout/public-layout/login";

const Routing = () => {
  return (
    <>
      <Routes>
          <Route path={constRoute.dashboard} element={<Dashboard />} />
          <Route path={constRoute.login} element={<Login />} />
      </Routes>
    </>
  );
};
export default memo(Routing);
