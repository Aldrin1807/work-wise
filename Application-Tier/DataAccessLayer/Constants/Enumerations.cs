using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Constants
{
    public class Enumerations
    {
        public enum Categories
        {
            AccountFinance,
            BankJobs,
            DataEntryJob,
            ProjectManager,
            EducationAndTraining,
            SoftwareJobs,
            HealthCareJobs,
            Marketing,
            CustomerService,
            GraphicDesign,
            Sales,
            Manufacturing,
            ResearchAndDevelopment,
            Legal,
            Agriculture,
            Hospitality,
            Transportation,
            MediaAndCommunication,
            RealEstate,
            EnvironmentalServices,
            SocialServices,
            Retail,
            Telecommunications,
            ArtsAndEntertainment,
            Construction,
            Aviation,
            Nonprofit,
            Automotive,
            Fashion,
            Energy,
            Publishing,
            Insurance,
            Consulting,
            Pharmaceuticals,
            Architecture,
            Government,
            Security,
            Aerospace,
            Biotechnology,
            Science,
            Veterinary,
            Fitness,
            Beauty,
            Sports,
            Recreation,
            InsuranceUnderwriting
        }
        public enum NotificationType
        {
            Information,
            Success,
            Warning,
            Error
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
