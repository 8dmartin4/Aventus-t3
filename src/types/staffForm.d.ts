export interface StaffApplicationForm {
  id: string;
  submittingUserId: string;
  status: "Pending Review" | "Approved" | "Rejected" | "Archived";
  osrsName: string;
  discordName: string;
  staffReferenceName: string;
  desiredRoles: string[];
  joinedAventusInput: string;
  reasonForApplicationInput: string;
  reasonForGoodFitInput: string;
}