import { Opportunity } from "@/types/opportunity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  return (
    <Card className="hover:shadow-[var(--shadow-elevated)] transition-[box-shadow] duration-300 group">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">{opportunity.type}</Badge>
          {opportunity.salary && (
            <span className="text-sm font-semibold text-primary">{opportunity.salary}</span>
          )}
        </div>
        <CardTitle className="group-hover:text-primary transition-colors">{opportunity.title}</CardTitle>
        <CardDescription className="text-base font-medium">{opportunity.company}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {opportunity.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Briefcase className="mr-2 h-4 w-4" />
            {opportunity.type}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            Posted {opportunity.postedDate}
          </div>
        </div>
        <p className="mt-4 text-sm line-clamp-2">{opportunity.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="default">
          <Link to={`/opportunity/${opportunity.id}`}>View Details & Apply</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
