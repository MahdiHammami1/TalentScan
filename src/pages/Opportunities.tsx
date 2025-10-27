import { useState } from "react";
import { OpportunityCard } from "@/components/OpportunityCard";
import { AddOpportunityDialog } from "@/components/AddOpportunityDialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Opportunity } from "@/types/opportunity";

const initialOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    description: "We're looking for an experienced frontend developer to join our growing team and help build the next generation of web applications.",
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Strong understanding of web performance optimization",
      "Experience with modern CSS frameworks (Tailwind, styled-components)",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Lead frontend architecture decisions",
      "Mentor junior developers",
      "Collaborate with design and backend teams",
      "Write clean, maintainable code",
    ],
    benefits: ["Health insurance", "401k matching", "Remote work options", "Professional development budget"],
    postedDate: "2 days ago",
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Creative Studios",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90k - $130k",
    description: "Join our design team to create beautiful, intuitive user experiences for our clients across various industries.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma and Adobe Creative Suite",
      "Strong portfolio demonstrating user-centered design",
      "Understanding of design systems and accessibility",
    ],
    responsibilities: [
      "Create user flows, wireframes, and prototypes",
      "Conduct user research and usability testing",
      "Collaborate with developers on implementation",
      "Maintain and evolve our design system",
    ],
    benefits: ["Health & dental insurance", "Flexible hours", "Creative workspace", "Annual design conference budget"],
    postedDate: "1 week ago",
  },
  {
    id: "3",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $140k",
    description: "Help us build innovative solutions as a full stack engineer in a fast-paced startup environment.",
    requirements: [
      "4+ years full stack development experience",
      "Strong knowledge of Node.js and React",
      "Experience with PostgreSQL or MongoDB",
      "Comfortable working in agile environments",
    ],
    responsibilities: [
      "Build and maintain full stack features",
      "Optimize application performance",
      "Participate in code reviews",
      "Contribute to technical documentation",
    ],
    benefits: ["Equity options", "Remote work", "Unlimited PTO", "Latest tech equipment"],
    postedDate: "3 days ago",
  },
];

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddOpportunity = (newOpportunity: Opportunity) => {
    setOpportunities([newOpportunity, ...opportunities]);
  };

  const filteredOpportunities = opportunities.filter(
    (opp) =>
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)]">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-[var(--gradient-primary)] bg-clip-text text-transparent">
            Career Opportunities
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find your next career opportunity and take the next step in your professional journey
          </p>
          <div className="flex justify-center">
            <AddOpportunityDialog onAdd={handleAddOpportunity} />
          </div>
        </header>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search by title, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No opportunities found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunities;
