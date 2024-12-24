import { callAPI } from "@/config/axios";

export const switchRoleApi = async (
  userId: string,
  newRole: "CUSTOMER" | "ORGANIZER"
) => {
  try {
    const response = await callAPI.patch(`/user/switch-role/${userId}`, {
      role: newRole,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to switch role");
  }
};
