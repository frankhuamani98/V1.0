import React from "react";

interface DashboardFooterProps {
  appName?: string;
  companyName?: string;
  version?: string;
}

const DashboardFooter = ({
  appName = "Banner Manager",
  companyName = "Student",
  version = "1.0.0"
}: DashboardFooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t py-1">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <div className="text-sm text-slate-500">
            &copy; {currentYear} {companyName}. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
