/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import StepSection from "./StepSection";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import FileUpload from "@/components/ui/file-upload";

function TeachingProfileStep({
  formData,
  onChange,
  classSubjects,
  setClassSubjects,
  teachingStatusOptions,
  teachingStatuses,
  toggleTeachingStatus,
  demoVideoFile,
  demoVideoUrl, 
  onDemoVideoChange,
}) {
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null);

  
  useEffect(() => {
    if (demoVideoFile) {
      const url = URL.createObjectURL(demoVideoFile);
      setLocalPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    setLocalPreviewUrl(null);
  }, [demoVideoFile]);

  // Priority: local selected file > server URL > nothing
  const finalPreviewUrl = localPreviewUrl || demoVideoUrl || null;

  return (
    <StepSection
      title="Teaching Profile"
      description="Let students know what and how you teach."
    >
      <div className="space-y-6">
        {/* Boards & Mediums */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          <div className="col-span-full">
            <Label className="text-base font-medium text-foreground">
              Boards (comma separated)
            </Label>
            <Input
              className="mt-2"
              placeholder="CBSE, ICSE, State Board"
              value={formData.boards}
              onChange={onChange("boards")}
            />
          </div>

          <div className="col-span-full">
            <Label className="text-base font-medium text-foreground">
              Mediums (comma separated)
            </Label>
            <Input
              className="mt-2"
              placeholder="English, Hindi"
              value={formData.mediums}
              onChange={onChange("mediums")}
            />
          </div>
        </div>

        {/* Classes & Subjects */}
        <div className="space-y-3">
          <Label className="text-base font-medium text-foreground">
            Classes &amp; Subjects
          </Label>
          <p className="text-xs text-muted-foreground">
            Add class (like 6th, 7th, 10th) and list subjects as comma
            separated.
          </p>

          <div className="space-y-4">
            {classSubjects.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-4 sm:grid-cols-6 border rounded-xl p-4"
              >
                <div className="col-span-full sm:col-span-2">
                  <Label>Class</Label>
                  <Input
                    className="mt-2"
                    placeholder="6th / 10th / 12th"
                    value={item.class_name}
                    onChange={(e) => {
                      const next = [...classSubjects];
                      next[index].class_name = e.target.value;
                      setClassSubjects(next);
                    }}
                  />
                </div>
                <div className="col-span-full sm:col-span-4">
                  <Label>Subjects (comma separated)</Label>
                  <Input
                    className="mt-2"
                    placeholder="Maths, Science, English"
                    value={item.subjects}
                    onChange={(e) => {
                      const next = [...classSubjects];
                      next[index].subjects = e.target.value;
                      setClassSubjects(next);
                    }}
                  />
                </div>
                <div className="col-span-full flex justify-end">
                  {classSubjects.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setClassSubjects((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setClassSubjects((prev) => [
                ...prev,
                { class_name: "", subjects: "" },
              ])
            }
          >
            + Add class &amp; subjects
          </Button>
        </div>

        {/* Modes of teaching & Experience */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          <div className="col-span-full sm:col-span-3">
            <Label className="text-base font-medium text-foreground">
              Modes of Teaching
            </Label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Checkbox
                  id="teach-student-home"
                  checked={formData.teach_student_home}
                  onCheckedChange={(checked) =>
                    onChange("teach_student_home")({
                      target: { checked, type: "checkbox" },
                    })
                  }
                />
                <Label
                  htmlFor="teach-student-home"
                  className="text-sm font-normal"
                >
                  At Student&apos;s Home
                </Label>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Checkbox
                  id="teach-tutor-home"
                  checked={formData.teach_tutor_home}
                  onCheckedChange={(checked) =>
                    onChange("teach_tutor_home")({
                      target: { checked, type: "checkbox" },
                    })
                  }
                />
                <Label
                  htmlFor="teach-tutor-home"
                  className="text-sm font-normal"
                >
                  At Tutor&apos;s Home
                </Label>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Checkbox
                  id="teach-online"
                  checked={formData.teach_online}
                  onCheckedChange={(checked) =>
                    onChange("teach_online")({
                      target: { checked, type: "checkbox" },
                    })
                  }
                />
                <Label htmlFor="teach-online" className="text-sm font-normal">
                  Online
                </Label>
              </div>
            </div>
          </div>

          <div className="col-span-full sm:col-span-3">
            <Label className="text-base font-medium text-foreground">
              Total Experience (years)
            </Label>
            <Input
              className="mt-2"
              placeholder="3.5"
              value={formData.total_experience_years}
              onChange={onChange("total_experience_years")}
            />
          </div>
        </div>

        {/* Current teaching status */}
        <div className="space-y-3">
          <Label className="text-base font-medium text-foreground">
            Current teaching status (select all that apply)
          </Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {teachingStatusOptions.map((status) => {
              const id = `status-${status.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <div
                  key={status}
                  className="flex items-center gap-2 text-sm"
                >
                  <Checkbox
                    id={id}
                    checked={teachingStatuses.includes(status)}
                    onCheckedChange={toggleTeachingStatus(status)}
                  />
                  <Label htmlFor={id} className="text-sm font-normal">
                    {status}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Demo Video Upload + Preview */}
        <div className="space-y-3">
          <div className="max-w-md space-y-3">
            {finalPreviewUrl && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {localPreviewUrl
                    ? "Preview of selected demo video"
                    : "Current demo video"}
                </p>
                <video
                  className="w-full rounded-md border"
                  controls
                  src={finalPreviewUrl}
                />
              </div>
            )}

            <FileUpload
              id="demoVideo"
              label="Demo Video (optional)"
              accept="video/*"
              helperText="Supported: MP4, WebM, MOV. Recommended under 50MB."
              onFileChange={onDemoVideoChange}
            />

            {demoVideoFile && (
              <p className="text-xs text-muted-foreground">
                Selected file:{" "}
                <span className="font-medium">{demoVideoFile.name}</span>
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Upload a short teaching demo to help parents and students
              understand your teaching style. A clear 2–5 minute video works
              best.
            </p>
          </div>
        </div>
      </div>
    </StepSection>
  );
}

export default TeachingProfileStep;
