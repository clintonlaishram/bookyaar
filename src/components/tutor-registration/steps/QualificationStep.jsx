import React from "react";
import StepSection from "./StepSection";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function QualificationStep({
  educations,
  setEducations,
  achievements,
  setAchievements,
}) {
  const clearEducationDocument = (index) => {
    setEducations((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        document_path: null,
      };
      return next;
    });
  };

  const clearAchievementDocument = (index) => {
    setAchievements((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        document_path: null,
      };
      return next;
    });
  };

  const renderDocumentPreview = (url) => {
    if (!url) return null;
    const isPdf = url.toLowerCase().endsWith(".pdf");

    if (isPdf) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-xs underline text-primary"
        >
          View uploaded document (PDF)
        </a>
      );
    }

    return (
      <img
        src={url}
        alt="Uploaded document"
        className="h-32 w-auto rounded-md border object-contain"
      />
    );
  };

  return (
    <StepSection
      title="Qualification Details"
      description="Add your education history and achievements."
    >
      <div className="space-y-8">
        {/* Educations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Education</h3>
          </div>

          {educations.map((edu, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-4 sm:grid-cols-6 border rounded-xl p-4"
            >
              <div className="col-span-full sm:col-span-3">
                <Label>Education Type *</Label>
                <Select
                  value={edu.education_type}
                  onValueChange={(value) => {
                    const next = [...educations];
                    next[index].education_type = value;
                    setEducations(next);
                  }}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select education type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th">10th</SelectItem>
                    <SelectItem value="12th">12th</SelectItem>
                    <SelectItem value="UG">UG</SelectItem>
                    <SelectItem value="PG">PG</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="Certification">Certification</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label>Board / University</Label>
                <Input
                  className="mt-2"
                  placeholder="CBSE / Delhi University"
                  value={edu.board_or_university}
                  onChange={(e) => {
                    const next = [...educations];
                    next[index].board_or_university = e.target.value;
                    setEducations(next);
                  }}
                />
              </div>

              <div className="col-span-full">
                <Label>School / College</Label>
                <Input
                  className="mt-2"
                  placeholder="ABC Public School"
                  value={edu.school_or_college}
                  onChange={(e) => {
                    const next = [...educations];
                    next[index].school_or_college = e.target.value;
                    setEducations(next);
                  }}
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label>Stream / Specialization</Label>
                <Input
                  className="mt-2"
                  placeholder="Science, Commerce, B.Sc Physics"
                  value={edu.stream_or_specialization}
                  onChange={(e) => {
                    const next = [...educations];
                    next[index].stream_or_specialization = e.target.value;
                    setEducations(next);
                  }}
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label>Degree Name</Label>
                <Input
                  className="mt-2"
                  placeholder="B.Sc, B.Tech, M.A"
                  value={edu.degree_name}
                  onChange={(e) => {
                    const next = [...educations];
                    next[index].degree_name = e.target.value;
                    setEducations(next);
                  }}
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label>Year of Passing</Label>
                <Input
                  className="mt-2"
                  placeholder="2022"
                  value={edu.year_of_passing}
                  onChange={(e) => {
                    const next = [...educations];
                    next[index].year_of_passing = e.target.value;
                    setEducations(next);
                  }}
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label>Percentage / CGPA</Label>
                <Input
                  className="mt-2"
                  placeholder="85% / 8.5 CGPA"
                  value={edu.percentage_or_cgpa}
                  onChange={(e) => {
                    const next = [...educations];
                    next[index].percentage_or_cgpa = e.target.value;
                    setEducations(next);
                  }}
                />
              </div>

              {/* Document: previous vs new upload */}
              <div className="col-span-full sm:col-span-3 space-y-2">
                <Label>Education Document</Label>

                {edu.document_path && !edu.file ? (
                  <div className="mt-2 space-y-2">
                    {renderDocumentPreview(edu.document_path)}
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => clearEducationDocument(index)}
                      >
                        Replace document
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This is your previously uploaded document for this
                      education entry.
                    </p>
                  </div>
                ) : (
                  <>
                    <FileUpload
                      id={`edu-file-${index}`}
                      label=""
                      accept="image/*,application/pdf"
                      helperText="Marksheet / Certificate (image or PDF)"
                      onFileChange={(file) => {
                        const next = [...educations];
                        next[index].file = file;
                        setEducations(next);
                      }}
                    />
                    {edu.file && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Selected file:{" "}
                        <span className="font-medium">{edu.file.name}</span>
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="col-span-full flex justify-end">
                {educations.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setEducations((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setEducations((prev) => [
                ...prev,
                {
                  education_type: "",
                  board_or_university: "",
                  school_or_college: "",
                  stream_or_specialization: "",
                  degree_name: "",
                  year_of_passing: "",
                  percentage_or_cgpa: "",
                  file: null,
                  document_path: null,
                },
              ])
            }
          >
            + Add education
          </Button>
        </div>

        {/* Achievements (optional) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Achievements (optional)</h3>
          </div>

          {achievements.map((ach, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-4 sm:grid-cols-6 border rounded-xl p-4"
            >
              <div className="col-span-full sm:col-span-3">
                <Label>Title</Label>
                <Input
                  className="mt-2"
                  placeholder="Best Teacher Award"
                  value={ach.title}
                  onChange={(e) => {
                    const next = [...achievements];
                    next[index].title = e.target.value;
                    setAchievements(next);
                  }}
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <Label>Year Received</Label>
                <Input
                  className="mt-2"
                  placeholder="2021"
                  value={ach.year_received}
                  onChange={(e) => {
                    const next = [...achievements];
                    next[index].year_received = e.target.value;
                    setAchievements(next);
                  }}
                />
              </div>

              <div className="col-span-full">
                <Label>Description</Label>
                <Textarea
                  className="mt-2"
                  placeholder="Brief description of the achievement"
                  rows={2}
                  value={ach.description}
                  onChange={(e) => {
                    const next = [...achievements];
                    next[index].description = e.target.value;
                    setAchievements(next);
                  }}
                />
              </div>

              {/* Achievement document */}
              <div className="col-span-full sm:col-span-3 space-y-2">
                <Label>Certificate / Proof</Label>

                {ach.document_path && !ach.file ? (
                  <div className="mt-2 space-y-2">
                    {renderDocumentPreview(ach.document_path)}
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => clearAchievementDocument(index)}
                      >
                        Replace document
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This is your previously uploaded certificate/proof.
                    </p>
                  </div>
                ) : (
                  <>
                    <FileUpload
                      id={`ach-file-${index}`}
                      label=""
                      accept="image/*,application/pdf"
                      helperText="Upload achievement certificate or proof"
                      onFileChange={(file) => {
                        const next = [...achievements];
                        next[index].file = file;
                        setAchievements(next);
                      }}
                    />
                    {ach.file && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Selected file:{" "}
                        <span className="font-medium">{ach.file.name}</span>
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="col-span-full flex justify-end">
                {achievements.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setAchievements((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setAchievements((prev) => [
                ...prev,
                {
                  title: "",
                  description: "",
                  year_received: "",
                  file: null,
                  document_path: null,
                },
              ])
            }
          >
            + Add achievement
          </Button>
        </div>
      </div>
    </StepSection>
  );
}

export default QualificationStep;
