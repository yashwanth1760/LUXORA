import React, { Suspense } from "react";
import DashboardPage from "./page";
import { BarLoader, PuffLoader } from "react-spinners";

const layoutDashboard = () => {
  return (
    <div className="px-auto">
      <h1 className="text-3xl md:text-5xl font-extrabold leading-tight bg-gradient-to-br from-yellow-500 to-yellow-700 text-transparent bg-clip-text drop-shadow-md mb-8">
        Dashboard
      </h1>
      <Suspense fallback={<PuffLoader color="#FFD700" className="mt-4 " width={'100%'} />}>
        <DashboardPage />
      </Suspense>
    </div>
  );
};

export default layoutDashboard;
