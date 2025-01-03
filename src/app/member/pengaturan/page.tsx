"use client";

import CustomerSettings from "@/components/CustomerSettings";
import CusSidebar from "@/components/CustSidebar";
import OrganizerSettings from "@/components/OrganizerSettings";
import OrgSidebar from "@/components/OrgSideBar";
import * as React from "react";

const SettingProfilePage: React.FC = () => {
  const [role, setRole] = React.useState<"CUSTOMER" | "ORGANIZER">("CUSTOMER");

  return (
    <div className="flex">
      {role === "CUSTOMER" ? <CusSidebar /> : <OrgSidebar />}

      <div>
        {role === "CUSTOMER" ? <CustomerSettings /> : <OrganizerSettings />}
      </div>
    </div>
  );
};

export default SettingProfilePage;
