import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  return (
    <>
      {localStorage.getItem("store_code") ? (
        <Outlet />
      ) : (
        <Navigate to="/PNpimPortal" />
      )}
    </>
  );
};

export default PrivateComponent;
