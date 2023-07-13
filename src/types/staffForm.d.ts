export interface StaffApplicationForm {
  oid: string;
  id: string;
  submittingUserId: string;
  approvingUserId: string | undefined;
  approvingUserName: string | undefined;
  status: "Pending Review" | "Approved" | "Rejected" | "Archived";
  osrsName: string;
  discordName: string;
  staffReference: boolean;
  staffReferenceName: string;
  desiredRoles: string[];
  joinedAventusInput: string;
  reasonForApplicationInput: string;
  reasonForGoodFitInput: string;
}