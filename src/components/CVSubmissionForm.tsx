import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CVSubmissionFormProps {
  opportunityId: string;
  opportunityTitle: string;
}

export const CVSubmissionForm = ({ opportunityId, opportunityTitle }: CVSubmissionFormProps) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setCvFile(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setCvFile(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cvFile) {
      toast({
        title: "CV Required",
        description: "Please upload your CV in PDF format.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send the data to a backend
    console.log("Submitting application:", {
      opportunityId,
      ...formData,
      cvFile,
    });

    toast({
      title: "Application Submitted!",
      description: "Your application has been successfully submitted. We'll be in touch soon!",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      coverLetter: "",
    });
    setCvFile(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Application</CardTitle>
        <CardDescription>
          Apply for {opportunityTitle}. All fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              placeholder="Tell us why you're a great fit for this role..."
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label>Upload CV (PDF) *</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-border"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {cvFile ? (
                <div className="flex items-center justify-between bg-secondary p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">{cvFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(cvFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setCvFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">
                    Drag and drop your CV here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse (PDF only)
                  </p>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                  />
                  <Button type="button" variant="outline" asChild>
                    <label htmlFor="cv-upload" className="cursor-pointer">
                      Browse Files
                    </label>
                  </Button>
                </>
              )}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
