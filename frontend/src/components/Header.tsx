import React from "react";

interface HeaderProps {
  onAdminDashboardClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminDashboardClick }) => {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">eKYC</h1>
        <button className="bg-red-400 hover:bg-red-700 rounded" onClick={onAdminDashboardClick}>Admin Login</button>
      </div>
    </header>
  );
};

export default Header;
