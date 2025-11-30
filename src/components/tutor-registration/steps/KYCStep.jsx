import React from "react";
import StepSection from "./StepSection";
import FileUpload from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SelfieCapture from "@/components/camera/SelfieCapture";
import FileWithFaceCapture from "@/components/camera/FileWithFaceCapture";

function KYCStep({
  kycFiles,
  setKycFiles,
  existingKycDocs,
  setExistingKycDocs,
  profilePictureUrl,
  setProfilePictureUrl,
}) {
  const clearExistingDoc = (type) => {
    setExistingKycDocs((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  return (
    <StepSection
      title="KYC"
      description="Verify your identity to build trust with parents and students."
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
          {/* Profile photo upload (used for /profile-picture) */}
          <div className="col-span-full sm:col-span-3 space-y-2">
            <Label className="text-base font-medium text-foreground">
              Your Photo (Profile Selfie)
            </Label>

            {profilePictureUrl && !kycFiles.profilePhoto ? (
              <div className="mt-2 space-y-2">
                <img
                  src={profilePictureUrl}
                  alt="Profile picture"
                  className="h-40 w-auto rounded-md border object-contain"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setProfilePictureUrl(null)}
                  >
                    Replace photo
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is your currently uploaded profile picture.
                </p>
              </div>
            ) : (
              <>
                <FileUpload
                  id="profilePhoto"
                  label=""
                  accept="image/*"
                  helperText="Clear face photo, max size ~5MB"
                  onFileChange={(file) =>
                    setKycFiles((prev) => ({
                      ...prev,
                      profilePhoto: file,
                    }))
                  }
                />
                {kycFiles.profilePhoto && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Selected file:{" "}
                    <span className="font-medium">
                      {kycFiles.profilePhoto.name}
                    </span>
                  </p>
                )}
              </>
            )}
          </div>

          {/* PAN */}
          <div className="col-span-full sm:col-span-3">
            <Label className="text-base font-medium text-foreground">
              PAN Card
            </Label>

            {existingKycDocs?.pan && !kycFiles.pan ? (
              <div className="mt-2 space-y-2">
                <img
                  src={existingKycDocs.pan}
                  alt="PAN"
                  className="h-40 w-auto rounded-md border object-contain"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => clearExistingDoc("pan")}
                  >
                    Replace document
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  This is your currently uploaded PAN document.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-2">
                  <FileUpload
                    id="pan"
                    label=""
                    accept="image/*"
                    helperText="PAN card image, max size ~10MB"
                    onFileChange={(file) =>
                      setKycFiles((prev) => ({
                        ...prev,
                        pan: file,
                      }))
                    }
                  />
                </div>
                {kycFiles.pan && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Selected file:{" "}
                    <span className="font-medium">
                      {kycFiles.pan.name}
                    </span>
                  </p>
                )}
              </>
            )}
          </div>

          {/* Aadhaar front */}
          <div className="col-span-full sm:col-span-3">
            <Label className="text-base font-medium text-foreground">
              Aadhaar Card (front side)
            </Label>

            {existingKycDocs?.aadhaar_front && !kycFiles.aadhaarFront ? (
              <div className="mt-2 space-y-2">
                <img
                  src={existingKycDocs.aadhaar_front}
                  alt="Aadhaar front"
                  className="h-40 w-auto rounded-md border object-contain"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => clearExistingDoc("aadhaar_front")}
                  >
                    Replace document
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  This is your currently uploaded Aadhaar front image.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-2">
                  <FileUpload
                    id="aadhaarFront"
                    label=""
                    accept="image/*"
                    helperText="Upload Aadhaar front (image), max size ~10MB"
                    onFileChange={(file) =>
                      setKycFiles((prev) => ({
                        ...prev,
                        aadhaarFront: file,
                      }))
                    }
                  />
                </div>
                {kycFiles.aadhaarFront && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Selected file:{" "}
                    <span className="font-medium">
                      {kycFiles.aadhaarFront.name}
                    </span>
                  </p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  Make sure all details are clearly visible.
                </p>
              </>
            )}
          </div>

          {/* Aadhaar back */}
          <div className="col-span-full sm:col-span-3">
            <Label className="text-base font-medium text-foreground">
              Aadhaar Card (back side)
            </Label>

            {existingKycDocs?.aadhaar_back && !kycFiles.aadhaarBack ? (
              <div className="mt-2 space-y-2">
                <img
                  src={existingKycDocs.aadhaar_back}
                  alt="Aadhaar back"
                  className="h-40 w-auto rounded-md border object-contain"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => clearExistingDoc("aadhaar_back")}
                  >
                    Replace document
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  This is your currently uploaded Aadhaar back image.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-2">
                  <FileUpload
                    id="aadhaarBack"
                    label=""
                    accept="image/*"
                    helperText="Upload Aadhaar back (image), max size ~10MB"
                    onFileChange={(file) =>
                      setKycFiles((prev) => ({
                        ...prev,
                        aadhaarBack: file,
                      }))
                    }
                  />
                </div>
                {kycFiles.aadhaarBack && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Selected file:{" "}
                    <span className="font-medium">
                      {kycFiles.aadhaarBack.name}
                    </span>
                  </p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  Make sure all details are clearly visible.
                </p>
              </>
            )}
          </div>

          {/* Selfie without Aadhaar (profile_selfie from /kyc) */}
          <div className="col-span-full sm:col-span-3">
            <Label className="text-base font-medium text-foreground">
              Selfie (without Aadhaar)
            </Label>

            {existingKycDocs?.profile_selfie && !kycFiles.profile_selfie ? (
              <div className="mt-2 space-y-2">
                <img
                  src={existingKycDocs.profile_selfie}
                  alt="Selfie"
                  className="h-40 w-auto rounded-md border object-contain"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => clearExistingDoc("profile_selfie")}
                  >
                    Retake selfie
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  This is your currently uploaded selfie.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-2">
                  <SelfieCapture
                    onCapture={(file) =>
                      setKycFiles((prev) => ({
                        ...prev,
                        profile_selfie: file,
                      }))
                    }
                  />
                </div>

                {kycFiles.profile_selfie && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Captured file:{" "}
                    <span className="font-medium">
                      {kycFiles.profile_selfie.name}
                    </span>
                  </p>
                )}

                <p className="mt-1 text-xs text-muted-foreground">
                  Make sure your face is clearly visible with good lighting.
                </p>
              </>
            )}
          </div>

          {/* Selfie with Aadhaar (aadhar_holding_selfie) */}
          <div className="col-span-full sm:col-span-3">
            <Label className="text-base font-medium text-foreground">
              Selfie holding Aadhaar (face visible)
            </Label>

            {existingKycDocs?.aadhar_holding_selfie &&
            !kycFiles.aadhaarWithFace ? (
              <div className="mt-2 space-y-2">
                <img
                  src={existingKycDocs.aadhar_holding_selfie}
                  alt="Selfie holding Aadhaar"
                  className="h-40 w-auto rounded-md border object-contain"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => clearExistingDoc("aadhar_holding_selfie")}
                  >
                    Retake selfie with Aadhaar
                  </Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  This is your currently uploaded selfie with Aadhaar.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-2">
                  <FileWithFaceCapture
                    onCapture={(file) =>
                      setKycFiles((prev) => ({
                        ...prev,
                        aadhaarWithFace: file,
                      }))
                    }
                  />
                </div>

                {kycFiles.aadhaarWithFace && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Captured file:{" "}
                    <span className="font-medium">
                      {kycFiles.aadhaarWithFace.name}
                    </span>
                  </p>
                )}

                <p className="mt-1 text-xs text-muted-foreground">
                  Hold your Aadhaar in your hand and ensure both your face and
                  the Aadhaar details are clearly visible inside the box.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </StepSection>
  );
}

export default KYCStep;
