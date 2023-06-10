export interface StaffApplicationForm {
  id: string;
  submittingUserId: string;
  status: "Pending Review" | "Approved" | "Rejected" | "Archived";
  osrsName: string;
  discordName: string;
  staffReferenceName: string;
  desiredRole:
    "Events" |
    "Human Resources" |
    "Highlights" |
    "Tech" |
    "Recruitment";
  joinedAventusInput: string;
  reasonForApplicationInput: string;
  reasonForGoodFitInput: string;
}