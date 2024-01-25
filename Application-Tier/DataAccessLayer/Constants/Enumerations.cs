using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Constants
{
    public class Enumerations
    {

        public enum NotificationType
        {
            Information,
            Success,
            Warning,
            Error
        }

        public enum NotificationStatus
        {
            Read,
            Unread
        }
        public enum JobApplicationStatus
        {
            Submitted,
            Rejected,
            ApprovedForInterview
        }

        public enum Qualification
        {
            HighSchoolDiploma,
            AssociateDegree,
            BachelorDegree,
            MasterDegree,
            Doctorate,
            ProfessionalCertification,
            VocationalTraining,
            WorkExperience
        }

    }
}
