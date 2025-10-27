import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Opportunity } from "@/types/opportunity";

interface AddOpportunityDialogProps {
  onAdd: (opportunity: Opportunity) => void;
}

export const AddOpportunityDialog = ({ onAdd }: AddOpportunityDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time" as Opportunity["type"],
    salary: "",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOpportunity: Opportunity = {
      id: Date.now().toString(),
      ...formData,
      requirements: formData.requirements.split("\n").filter(r => r.trim()),
      responsibilities: formData.responsibilities.split("\n").filter(r => r.trim()),
      benefits: formData.benefits ? formData.benefits.split("\n").filter(b => b.trim()) : undefined,
      postedDate: "Today",
    };

    onAdd(newOpportunity);
    setOpen(false);
    setFormData({
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
      description: "",
      requirements: "",
      responsibilities: "",
      benefits: "",
    });
    
    toast({
      title: "Opportunity Added",
      description: "The career opportunity has been successfully added.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Add New Opportunity
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Career Opportunity</DialogTitle>
          <DialogDescription>
            Fill in the details for the new position. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Tech Corp"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. San Francisco, CA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Job Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as Opportunity["type"] })}
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Salary Range</Label>
            <Input
              id="salary"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              placeholder="e.g. $100k - $150k"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the role..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements (one per line) *</Label>
            <Textarea
              id="requirements"
              required
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="5+ years of React experience&#10;Strong TypeScript skills&#10;..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Responsibilities (one per line) *</Label>
            <Textarea
              id="responsibilities"
              required
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              placeholder="Lead frontend architecture&#10;Mentor junior developers&#10;..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits (one per line)</Label>
            <Textarea
              id="benefits"
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              placeholder="Health insurance&#10;401k matching&#10;..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Opportunity</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
