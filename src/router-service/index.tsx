import { constRoute } from "@utils/route";
import React, { memo } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@components/dashboard/index";

const Routing = () => {
  return (
    <>
      <Routes>
          <Route path={constRoute.dashboard} element={<Dashboard />} />
      </Routes>
    </>
  );
};
export default memo(Routing);
