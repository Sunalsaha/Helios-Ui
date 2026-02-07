import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface LeadershipTeamProps {
  team?: TeamMember[];
}

const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`bg-white/80 backdrop-blur-sm border border-orange-100/50 shadow-lg rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-orange-200/70 transition-all duration-300 hover:-translate-y-2 ${className || ''}`}
    {...props}
  />
);

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`relative ${className || ''}`} {...props} />
);

const AboutusLeadershipSection = ({
  team: customTeam,
}: LeadershipTeamProps) => {
  const defaultTeam: TeamMember[] = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Executive Officer",
      bio: "Visionary leader with 20+ years in medical technology and healthcare innovation.",
      image: profile1,
    },
    {
      name: "Dr. James Rodriguez",
      role: "Chief Technology Officer",
      bio: "Former NASA engineer specializing in AI and medical device development.",
      image: profile2,
    },
    {
      name: "Dr. Emily Chen",
      role: "Head of Research",
      bio: "Leading researcher in medical imaging and diagnostic technologies.",
      image: profile3,
    },
    {
      name: "Michael Thompson",
      role: "VP of Operations",
      bio: "Operations expert ensuring global delivery and service excellence.",
      image: profile4,
    },
  ];

  const teamData = customTeam || defaultTeam;

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-orange-900 via-orange-600 to-amber-700 bg-clip-text text-transparent pb-2">
            Leadership Team
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Meet the visionary leaders driving innovation and excellence at
            HELIOS Medical Systems.
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-6 sm:mt-8"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {teamData.map((member, index) => (
            <Card key={index}>
              <CardContent>
                {/* Profile Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 text-center leading-tight">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-orange-600 font-semibold text-xs sm:text-sm lg:text-base mb-3 text-center ">
                  {member.role}
                </p>

                {/* Bio */}
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed text-center px-2">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutusLeadershipSection;