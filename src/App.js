import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import loadingGif from "../src/images/Loading_icon.gif";
import PrivateComponent from "./component/PrivateComponent";
import UpperHeader from "./component/UpperHeader";
const Error = React.lazy(() => import("./pages/Error"));
const FeedbackL1AndL2 = React.lazy(() => import("./pages/FeedbackL1AndL2"));
const ReportL1AndL2 = React.lazy(() => import("./pages/ReportL1AndL2"));
const IndentL3 = React.lazy(() => import("./pages/IndentL3"));
const FavoriteL3 = React.lazy(() => import("./pages/FavoriteL3"));
const ReportL3 = React.lazy(() => import("./pages/ReportL3"));
const DayEndReportAdmin = React.lazy(() => import("./pages/DayEndReportAdmin"));
const SendStoreReportAdmin = React.lazy(() =>
  import("./pages/SendStoreReportAdmin")
);
const AdminHome = React.lazy(() => import("./pages/AdminHome"));
const PortalCloseReport = React.lazy(() => import("./pages/PortalCloseReport"));
const FeedbackL1AndL2ForPhysical = React.lazy(() =>
  import("./pages/FeedbackL1AndL2ForPhysical")
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <>
              <UpperHeader />
              <div className="text-center">
                <img src={loadingGif} alt="" />
              </div>
            </>
          }
        >
          <Routes>
            <Route index path="/PNpimPortal" element={<Login />} />
            <Route element={<PrivateComponent />}>
              <Route
                path="/feedbackL1andL2/:storeCode/:rsoName/"
                element={<FeedbackL1AndL2 />}
              />
              <Route
                path="/FeedbackL1AndL2ForPhysical/:storeCode/:rsoName/"
                element={<FeedbackL1AndL2ForPhysical />}
              />
              <Route
                path="/reportL1andL2/:storeCode/:rsoName/"
                element={<ReportL1AndL2 />}
              />
              <Route
                path="/favoriteL3/:storeCode/:rsoName/"
                element={<FavoriteL3 />}
              />
              <Route
                path="/indentL3/:storeCode/:rsoName/"
                element={<IndentL3 />}
              />
              <Route
                path="/reportL3/:storeCode/:rsoName/"
                element={<ReportL3 />}
              />
              <Route
                path="/dayEndReportForAdmin/:storeCode/:rsoName/"
                element={<DayEndReportAdmin />}
              />
              <Route
                path="/SendStoreReportAdmin/:storeCode/:rsoName/"
                element={<SendStoreReportAdmin />}
              />
              <Route
                path="/AdminHome/:storeCode/:rsoName/"
                element={<AdminHome />}
              />
              <Route
                path="/PortalCloseReport/:storeCode/:rsoName/:level/"
                element={<PortalCloseReport />}
              />
              <Route path="/error" element={<Error />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
