import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CVSubmissionForm } from "@/components/CVSubmissionForm";
import { ArrowLeft, MapPin, Briefcase, Calendar, DollarSign } from "lucide-react";

// This would normally come from a context or API
const mockOpportunities = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    description: "We're looking for an experienced frontend developer to join our growing team and help build the next generation of web applications. You'll be working on cutting-edge projects using the latest technologies and best practices.",
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Strong understanding of web performance optimization",
      "Experience with modern CSS frameworks (Tailwind, styled-components)",
      "Excellent communication skills",
      "Experience with testing frameworks (Jest, React Testing Library)",
    ],
    responsibilities: [
      "Lead frontend architecture decisions",
      "Mentor junior developers",
      "Collaborate with design and backend teams",
      "Write clean, maintainable code",
      "Participate in code reviews and technical discussions",
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

const OpportunityDetail = () => {
  const { id } = useParams();
  const opportunity = mockOpportunities.find((opp) => opp.id === id);

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Opportunity Not Found</h1>
          <Button asChild>
            <Link to="/">Back to Opportunities</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)]">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Opportunities
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardTitle className="text-3xl mb-2">{opportunity.title}</CardTitle>
                    <p className="text-xl text-muted-foreground font-medium">{opportunity.company}</p>
                  </div>
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    {opportunity.type}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-5 w-5" />
                    <span>{opportunity.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span>Posted {opportunity.postedDate}</span>
                  </div>
                  {opportunity.salary && (
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <DollarSign className="h-5 w-5" />
                      <span>{opportunity.salary}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About the Role</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-base leading-relaxed">{opportunity.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-base">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {opportunity.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-base">{resp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {opportunity.benefits && opportunity.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CVSubmissionForm
                opportunityId={opportunity.id}
                opportunityTitle={opportunity.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
