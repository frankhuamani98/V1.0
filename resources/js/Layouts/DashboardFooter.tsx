import React from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import DashboardFuter from "./DashboardFooter"; // Importa el footer

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar a la izquierda */}
      <Sidebar isOpen={false} toggleSidebar={function (): void {
              throw new Error("Function not implemented.");
          } } />

      {/* Contenido principal */}
      <div className="flex flex-col w-full">
        <DashboardHeader toggleSidebar={function (): void {
                  throw new Error("Function not implemented.");
              } } auth={{
                  user: {
                      username: "",
                      email: ""
                  }
              }} />
        <DashboardContent />

        {/* Footer al final */}
        <DashboardFuter />
      </div>
    </div>
  );
};

export default DashboardLayout;
