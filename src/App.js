import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import Indent from "./pages/Indent";
import Login from "./pages/Login";
import Error from "./pages/Error";
import FeedbacL1AndL2 from "./pages/FeedbacL1AndL2";
import ReportL1AndL2 from "./pages/ReportL1AndL2";
import IndentL3 from "./pages/IndentL3";
import FavoriteL3 from "./pages/FavoriteL3";
import ReportL3 from "./pages/ReportL3";
import DayEndReportAdmin from "./pages/DayEndReportAdmin";
import SendStoreReportAdmin from "./pages/SendStoreReportAdmin";
import AdminHome from "./pages/AdminHome";
import PortelCloseReport from "./pages/PortelCloseReport";
import FeedbacL1AndL2ForPhysical from "./pages/FeedbacL1AndL2ForPhysical";

function App() {
  return (
    <>
      <BrowserRouter basename="/PNpimPortal">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route
            exact
            path="/feedbackL1andL2/:storeCode/:rsoName/"
            component={FeedbacL1AndL2}
          />
          <Route
            exact
            path="/FeedbacL1AndL2ForPhysical/:storeCode/:rsoName/"
            component={FeedbacL1AndL2ForPhysical}
          />

          <Route
            exact
            path="/reportL1andL2/:storeCode/:rsoName/"
            component={ReportL1AndL2}
          />
          <Route
            exact
            path="/favoriteL3/:storeCode/:rsoName/"
            component={FavoriteL3}
          />
          <Route
            exact
            path="/indentL3/:storeCode/:rsoName/"
            component={IndentL3}
          />
          <Route
            exact
            path="/reportL3/:storeCode/:rsoName/"
            component={ReportL3}
          />
          <Route
            exact
            path="/dayEndreportForAdmin/:storeCode/:rsoName/"
            component={DayEndReportAdmin}
          />
          <Route
            exact
            path="/SendStoreReportAdmin/:storeCode/:rsoName/"
            component={SendStoreReportAdmin}
          />
          <Route
            exact
            path="/AdminHome/:storeCode/:rsoName/"
            component={AdminHome}
          />
          <Route
            exact
            path="/PortelCloseReport/:storeCode/:rsoName/:level/"
            component={PortelCloseReport}
          />
          <Route exact path="/error" component={Error} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
