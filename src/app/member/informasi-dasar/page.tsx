"use client";

import CustomerEditProfile from "@/components/CustomerEditProfile";
import CusSidebar from "@/components/CustSidebar";
import OrganizerEditProfile from "@/components/OrganizerEditProfile";
import * as React from "react";

const EditProfilePage: React.FC = () => {
  const [role, setRole] = React.useState<"CUSTOMER" | "ORGANIZER">("CUSTOMER");

  return (
    <div className="flex">
      <CusSidebar />

      <div>
        {role === "CUSTOMER" ? (
          <CustomerEditProfile />
        ) : (
          <OrganizerEditProfile />
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
