/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import PersonalInfoStep from "./steps/PersonalInfoStep";
import ContactStep from "./steps/ContactStep";
import AddressStep from "./steps/AddressStep";
import TeachingProfileStep from "./steps/TeachingProfileStep";
import QualificationStep from "./steps/QualificationStep";
import KYCStep from "./steps/KYCStep";
import { API_BASE_URL } from "@/lib/constant";

/* -------------------- Cookie Helpers -------------------- */

function setCookie(name, value, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

function getCookie(name) {
  if (typeof document === "undefined") return null;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1]
    ? decodeURIComponent(
        document.cookie
          .split("; ")
          .find((row) => row.startsWith(name + "="))
          .split("=")[1]
      )
    : null;
}

function deleteCookie(name) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

/* -------------------- Helpers -------------------- */

function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

/* -------------------- Thank You Component -------------------- */

function RegistrationThankYou({ onNewProfile, onGoHome }) {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center p-10 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-xl text-center space-y-4"
      >
        <h1 className="text-3xl md:text-4xl font-semibold">
          Thank you for registering! 🎉
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Your registration has been submitted successfully. Once our team has
          reviewed your documents, we’ll notify you about the status of your
          tutor profile.
        </p>
      </motion.div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        <Button
          variant="outline"
          className="whitespace-nowrap"
          onClick={onNewProfile}
        >
          Register a new profile
        </Button>
        <Button className="whitespace-nowrap" onClick={onGoHome}>
          Go to home
        </Button>
      </div>
    </div>
  );
}

/* -------------------- Main Component -------------------- */

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [openDob, setOpenDob] = useState(false);
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(new Date());
  const [dobInputValue, setDobInputValue] = useState("");

  const [currentStep, setCurrentStep] = useState(1);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [demoVideoFile, setDemoVideoFile] = useState(null);

  const [tutorId, setTutorId] = useState(null);
  const [demoVideoUrl, setDemoVideoUrl] = useState(null);
  const [isSavingTeaching, setIsSavingTeaching] = useState(false);
  const [isSavingQualification, setIsSavingQualification] = useState(false);
  const [isSubmittingKYC, setIsSubmittingKYC] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  // completed flag -> controls Thank You screen
  const [isCompleted, setIsCompleted] = useState(false);

  // Education (with file)
  const [educations, setEducations] = useState([
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
  ]);

  // snapshot of initial educations from API (for change detection)
  const [initialEducations, setInitialEducations] = useState(null);

  // Achievements (with file)
  const [achievements, setAchievements] = useState([
    { title: "", description: "", year_received: "", file: null, document_path: null },
  ]);

  // snapshot of initial achievements from API (for change detection)
  const [initialAchievements, setInitialAchievements] = useState(null);

  // Class & subjects array (multiple)
  const [classSubjects, setClassSubjects] = useState([
    { class_name: "", subjects: "" },
  ]);

  // Location (for map)
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    address_line1: "",
    locality: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  // KYC files (new uploads)
  const [kycFiles, setKycFiles] = useState({
    profilePhoto: null,
    pan: null,
    aadhaarFront: null,
    aadhaarBack: null,
    profile_selfie: null,
    aadhaarWithFace: null,
  });

  // Existing KYC docs from API (latest per type)
  const [existingKycDocs, setExistingKycDocs] = useState({
    profile_selfie: null,
    aadhaar_front: null,
    aadhaar_back: null,
    aadhar_holding_selfie: null,
    pan: null,
  });

  // Current teaching status (multi-select)
  const teachingStatusOptions = [
    "School teacher",
    "College faculty",
    "Coaching institute faculty",
    "Full-time private tutor",
    "Part-time tutor",
    "Online-only tutor",
  ];
  const [teachingStatuses, setTeachingStatuses] = useState([]);

  // Basic field states
  const [formData, setFormData] = useState({
    // Personal
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    languages: "",
    // Contact
    email: "",
    phone: "",
    whatsapp_number: "",
    referral_code: "",
    // Address
    address_line1: "",
    address_line2: "",
    locality: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    preferred_localities: "",
    // Teaching profile
    boards: "",
    mediums: "",
    teach_student_home: false,
    teach_tutor_home: false,
    teach_online: false,
    total_experience_years: "",
    // Notifications / misc
    newsletter_frequency: "never",
    workspace_description: "",
  });

  const steps = [
    { title: "Personal Info." }, // 1
    { title: "Contact Details" }, // 2
    { title: "Address" }, // 3
    { title: "Teaching Profile" }, // 4
    { title: "Qualification Details" }, // 5
    { title: "KYC" }, // 6
  ];

  const isLastStep = currentStep === steps.length;
  const isFirstStep = currentStep === 1;

  /* -------------------- Init from cookies -------------------- */

  useEffect(() => {
    const completed = getCookie("registration_completed");
    if (completed === "true") {
      setIsCompleted(true);
      return;
    }

    const savedStep = getCookie("registration_step");
    if (savedStep) {
      const num = Number(savedStep);
      if (!isNaN(num) && num >= 1 && num <= steps.length) {
        setCurrentStep(num);
      }
    }
  }, []);

  /* -------------------- Persist step to cookie -------------------- */

  useEffect(() => {
    setCookie("registration_step", String(currentStep), 7);
  }, [currentStep]);

  /* -------------------- Step handlers -------------------- */

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleChange = (field) => (e) => {
    const value =
      e && e.target && e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleTeachingStatus = (status) => (checked) => {
    setTeachingStatuses((prev) => {
      const isChecked = !!checked;
      if (isChecked) {
        if (prev.includes(status)) return prev;
        return [...prev, status];
      } else {
        return prev.filter((item) => item !== status);
      }
    });
  };

  /* -------- Prefill from API: GET /tutors/{id} -------- */

  useEffect(() => {
    const encodedUid =
      typeof window !== "undefined"
        ? window.localStorage.getItem("uid")
        : null;

    if (!encodedUid) return;

    let decodedTutorId = null;
    try {
      decodedTutorId = atob(encodedUid);
      setTutorId(decodedTutorId);
    } catch (err) {
      console.error("Failed to decode uid from localStorage", err);
      toast.error("Unable to read tutor ID from browser storage.");
      return;
    }

    if (!decodedTutorId) return;

    const fetchTutor = async () => {
      try {
        setLoadingProfile(true);
        const res = await fetch(`${API_BASE_URL}/tutors/${decodedTutorId}`, {
          headers: { accept: "application/json" },
        });

        if (!res.ok) {
          let message = "Failed to load tutor profile.";
          try {
            const errorData = await res.json();
            if (Array.isArray(errorData?.detail) && errorData.detail[0]?.msg) {
              message = errorData.detail[0].msg;
            } else if (typeof errorData?.detail === "string") {
              message = errorData.detail;
            }
          } catch (parseError) {
            console.error("Failed to parse error response:", parseError);
          }
          toast.error(message);
          return;
        }

        const data = await res.json();

        setFormData((prev) => ({
          ...prev,
          first_name: data.first_name || "",
          middle_name: data.middle_name || "",
          last_name: data.last_name || "",
          gender: data.gender || "",
          languages: Array.isArray(data.languages)
            ? data.languages.join(", ")
            : data.languages || "",
          email: data.email || "",
          phone: data.phone || "",
          whatsapp_number: data.whatsapp_number || "",
          referral_code: data.referral_code || "",
          address_line1: data.address_line1 || "",
          address_line2: data.address_line2 || "",
          locality: data.locality || "",
          city: data.city || "",
          district: data.district || "",
          state: data.state || "",
          pincode: data.pincode || "",
          preferred_localities: Array.isArray(data.preferred_localities)
            ? data.preferred_localities.join(", ")
            : data.preferred_localities || "",
          boards: Array.isArray(data.boards)
            ? data.boards.join(", ")
            : data.boards || "",
          mediums: Array.isArray(data.mediums)
            ? data.mediums.join(", ")
            : data.mediums || "",
          teach_student_home: !!data.teach_student_home,
          teach_tutor_home: !!data.teach_tutor_home,
          teach_online: !!data.teach_online,
          total_experience_years:
            data.total_experience_years != null
              ? String(data.total_experience_years)
              : "",
        }));

        setDemoVideoUrl(data.demo_video_url || null);

        if (data.date_of_birth) {
          const d = new Date(data.date_of_birth);
          if (isValidDate(d)) {
            setDate(d);
            setMonth(d);
            setDobInputValue(formatDate(d));
          }
        }

        setLocation((prev) => ({
          ...prev,
          lat: data.latitude ?? null,
          lng: data.longitude ?? null,
          address_line1: data.address_line1 ?? "",
          locality: data.locality ?? "",
          city: data.city ?? "",
          district: data.district ?? "",
          state: data.state ?? "",
          pincode: data.pincode ?? "",
        }));

        if (data.classes_subjects && typeof data.classes_subjects === "object") {
          const entries = Object.entries(data.classes_subjects);
          if (entries.length) {
            setClassSubjects(
              entries.map(([class_name, subjects]) => ({
                class_name,
                subjects: Array.isArray(subjects)
                  ? subjects.join(", ")
                  : subjects || "",
              }))
            );
          }
        }

        if (data.current_teaching_status) {
          const statuses = data.current_teaching_status
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          setTeachingStatuses(statuses);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching your profile.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchTutor();
  }, []);

  /* -------- Prefill Qualification: education + achievements -------- */

  useEffect(() => {
    if (!tutorId) return;

    const fetchQualification = async () => {
      try {
        // ----- Education -----
        try {
          const eduRes = await fetch(
            `${API_BASE_URL}/tutors/${tutorId}/education`,
            {
              headers: { accept: "application/json" },
            }
          );

          if (eduRes.ok) {
            const eduData = await eduRes.json();

            if (Array.isArray(eduData) && eduData.length > 0) {
              const mappedEdu = eduData.map((edu) => ({
                id: edu.id,
                tutor_id: edu.tutor_id,
                education_type: edu.education_type || "",
                board_or_university: edu.board_or_university || "",
                school_or_college: edu.school_or_college || "",
                stream_or_specialization:
                  edu.stream_or_specialization || "",
                degree_name: edu.degree_name || "",
                year_of_passing: edu.year_of_passing || "",
                percentage_or_cgpa: edu.percentage_or_cgpa || "",
                file: null,
                document_path: edu.document_path || null,
              }));

              setEducations(mappedEdu);
              setInitialEducations(mappedEdu); // baseline for change detection
            }
          }
        } catch (error) {
          console.error("Failed to fetch education data", error);
        }

        // ----- Achievements -----
        try {
          const achRes = await fetch(
            `${API_BASE_URL}/tutors/${tutorId}/achievement`,
            {
              headers: { accept: "application/json" },
            }
          );

          if (achRes.ok) {
            const achData = await achRes.json();

            if (Array.isArray(achData) && achData.length > 0) {
              const mappedAch = achData.map((ach) => ({
                id: ach.id,
                tutor_id: ach.tutor_id,
                title: ach.title || "",
                description: ach.description || "",
                year_received: ach.year_received || "",
                file: null,
                document_path: ach.document_path || null,
              }));

              setAchievements(mappedAch);
              setInitialAchievements(mappedAch); // baseline
            }
          }
        } catch (error) {
          console.error("Failed to fetch achievement data", error);
        }
      } catch (error) {
        console.error("Failed to fetch qualification data", error);
      }
    };

    fetchQualification();
  }, [tutorId]);

  /* -------- Prefill profile picture: GET /tutors/{id}/profile-picture -------- */

  useEffect(() => {
    if (!tutorId) return;

    const fetchProfilePicture = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/tutors/${tutorId}/profile-picture`,
          {
            headers: { accept: "application/json" },
          }
        );

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        setProfilePictureUrl(data.profile_picture_url || null);
      } catch (error) {
        console.error("Failed to fetch profile picture", error);
      }
    };

    fetchProfilePicture();
  }, [tutorId]);

  /* -------- Prefill KYC docs: GET /tutors/{id}/kyc -------- */

  useEffect(() => {
    if (!tutorId) return;

    const fetchKyc = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/tutors/${tutorId}/kyc`, {
          headers: { accept: "application/json" },
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        if (!Array.isArray(data.documents)) return;

        const latestByType = {};

        for (const doc of data.documents) {
          if (!doc.document_type) continue;
          const existing = latestByType[doc.document_type];

          if (
            !existing ||
            new Date(doc.uploaded_at) > new Date(existing.uploaded_at)
          ) {
            latestByType[doc.document_type] = doc;
          }
        }

        setExistingKycDocs({
          profile_selfie:
            latestByType.profile_selfie?.document_path || null,
          aadhaar_front:
            latestByType.aadhaar_front?.document_path || null,
          aadhaar_back:
            latestByType.aadhaar_back?.document_path || null,
          aadhar_holding_selfie:
            latestByType.aadhar_holding_selfie?.document_path || null,
          pan: latestByType.pan?.document_path || null,
        });
      } catch (error) {
        console.error("Failed to fetch KYC docs", error);
      }
    };

    fetchKyc();
  }, [tutorId]);

  /* ---------- Helpers: change detection for Qualification ---------- */

  const hasEducationChanged = (current, initial) => {
    // New row (no initial) -> changed if not empty
    if (!initial) {
      return (
        !!current.education_type ||
        !!current.board_or_university ||
        !!current.school_or_college ||
        !!current.stream_or_specialization ||
        !!current.degree_name ||
        !!current.year_of_passing ||
        !!current.percentage_or_cgpa ||
        !!current.file
      );
    }

    if (current.file) return true;

    return !(
      current.education_type === initial.education_type &&
      current.board_or_university === initial.board_or_university &&
      current.school_or_college === initial.school_or_college &&
      current.stream_or_specialization === initial.stream_or_specialization &&
      current.degree_name === initial.degree_name &&
      current.year_of_passing === initial.year_of_passing &&
      current.percentage_or_cgpa === initial.percentage_or_cgpa &&
      current.document_path === initial.document_path
    );
  };

  const hasAchievementChanged = (current, initial) => {
    if (!initial) {
      return (
        !!current.title ||
        !!current.description ||
        !!current.year_received ||
        !!current.file
      );
    }

    if (current.file) return true;

    return !(
      current.title === initial.title &&
      current.description === initial.description &&
      current.year_received === initial.year_received &&
      current.document_path === initial.document_path
    );
  };

  /* ---------- Save Teaching Profile ---------- */

  const saveTeachingProfile = async () => {
    if (!tutorId) {
      toast.error("Tutor ID is missing. Please reload the page.");
      return;
    }

    setIsSavingTeaching(true);

    try {
      const classesSubjectsObj = {};
      classSubjects.forEach((cs) => {
        if (!cs.class_name || !cs.subjects) return;
        const subjectList = cs.subjects
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        if (subjectList.length > 0) {
          classesSubjectsObj[cs.class_name] = subjectList;
        }
      });

      let finalDemoVideoUrl = demoVideoUrl || null;

      if (demoVideoFile) {
        const demoForm = new FormData();
        demoForm.append("file", demoVideoFile);

        const demoRes = await fetch(
          `${API_BASE_URL}/tutors/${tutorId}/demo-video`,
          {
            method: "POST",
            body: demoForm,
            headers: {
              accept: "application/json",
            },
          }
        );

        if (!demoRes.ok) {
          let message = "Failed to upload demo video.";
          try {
            const errorData = await demoRes.json();
            if (Array.isArray(errorData?.detail) && errorData.detail[0]?.msg) {
              message = errorData.detail[0].msg;
            } else if (typeof errorData?.detail === "string") {
              message = errorData.detail;
            }
          } catch (parseError) {
            console.error("Failed to parse error response:", parseError);
          }
          toast.error(message);
          setIsSavingTeaching(false);
          return;
        }

        const demoData = await demoRes.json();
        finalDemoVideoUrl = demoData.demo_video_url || null;
        setDemoVideoUrl(finalDemoVideoUrl);
      }

      const putPayload = {
        phone: formData.phone || null,
        whatsapp_number: formData.whatsapp_number || null,
        referral_code: formData.referral_code || null,
        first_name: formData.first_name || null,
        middle_name: formData.middle_name || null,
        last_name: formData.last_name || null,
        gender: formData.gender || null,
        date_of_birth: date ? date.toISOString().split("T")[0] : null,
        languages: formData.languages
          ? formData.languages
              .split(",")
              .map((l) => l.trim())
              .filter(Boolean)
          : null,
        address_line1: formData.address_line1 || null,
        address_line2: formData.address_line2 || null,
        locality: formData.locality || null,
        city: formData.city || null,
        district: formData.district || null,
        state: formData.state || null,
        pincode: formData.pincode || null,
        preferred_localities: formData.preferred_localities
          ? formData.preferred_localities
              .split(",")
              .map((l) => l.trim())
              .filter(Boolean)
          : null,
        latitude: location.lat ?? null,
        longitude: location.lng ?? null,
        place_id: null,
        formatted_address: null,
        boards: formData.boards
          ? formData.boards
              .split(",")
              .map((b) => b.trim())
              .filter(Boolean)
          : null,
        mediums: formData.mediums
          ? formData.mediums
              .split(",")
              .map((m) => m.trim())
              .filter(Boolean)
          : null,
        classes_subjects:
          Object.keys(classesSubjectsObj).length > 0
            ? classesSubjectsObj
            : null,
        teach_student_home:
          typeof formData.teach_student_home === "boolean"
            ? formData.teach_student_home
            : null,
        teach_tutor_home:
          typeof formData.teach_tutor_home === "boolean"
            ? formData.teach_tutor_home
            : null,
        teach_online:
          typeof formData.teach_online === "boolean"
            ? formData.teach_online
            : null,
        total_experience_years: formData.total_experience_years
          ? Number(formData.total_experience_years)
          : null,
        current_teaching_status:
          teachingStatuses.length > 0
            ? teachingStatuses.join(", ")
            : null,
        demo_video_url: finalDemoVideoUrl,
      };

      const res = await fetch(`${API_BASE_URL}/tutors/${tutorId}`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(putPayload),
      });

      if (!res.ok) {
        let message = "Failed to save teaching profile.";
        try {
          const errorData = await res.json();
          if (Array.isArray(errorData?.detail) && errorData.detail[0]?.msg) {
            message = errorData.detail[0].msg;
          } else if (typeof errorData?.detail === "string") {
            message = errorData.detail;
          }
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
        }
        toast.error(message);
        setIsSavingTeaching(false);
        return;
      }

      const updated = await res.json();
      setDemoVideoUrl(updated.demo_video_url || finalDemoVideoUrl || null);

      toast.success("Teaching profile saved successfully.");
      setCurrentStep(5);
    } catch (error) {
      console.error(error);
      toast.error("Unable to save teaching profile. Please try again.");
    } finally {
      setIsSavingTeaching(false);
    }
  };

  /* ---------- Save Qualification ---------- */

  const saveQualification = async () => {
    if (!tutorId) {
      toast.error("Tutor ID is missing. Please reload the page.");
      return;
    }

    setIsSavingQualification(true);

    try {
      // ----- EDUCATION -----
      for (let index = 0; index < educations.length; index++) {
        const edu = educations[index];
        const initialEdu = initialEducations?.[index];

        const isEmptyEdu =
          !edu.education_type &&
          !edu.board_or_university &&
          !edu.school_or_college &&
          !edu.stream_or_specialization &&
          !edu.degree_name &&
          !edu.year_of_passing &&
          !edu.percentage_or_cgpa &&
          !edu.file;

        // Completely empty row -> ignore
        if (isEmptyEdu) continue;

        // If initial data exists and nothing changed -> skip POST
        if (initialEducations && !hasEducationChanged(edu, initialEdu)) {
          continue;
        }

        // Validation
        if (!edu.education_type) {
          toast.error("Please select education type for all education entries.");
          setIsSavingQualification(false);
          return;
        }

        const form = new FormData();
        form.append("education_type", edu.education_type);
        form.append("board_or_university", edu.board_or_university || "");
        form.append("school_or_college", edu.school_or_college || "");
        form.append(
          "stream_or_specialization",
          edu.stream_or_specialization || ""
        );
        form.append("degree_name", edu.degree_name || "");
        form.append("year_of_passing", edu.year_of_passing || "");
        form.append("percentage_or_cgpa", edu.percentage_or_cgpa || "");
        if (edu.file) {
          form.append("file", edu.file);
        }

        const res = await fetch(
          `${API_BASE_URL}/tutors/${tutorId}/education`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: form,
          }
        );

        if (!res.ok) {
          let message = "Failed to save education details.";
          try {
            const errorData = await res.json();
            if (Array.isArray(errorData?.detail) && errorData.detail[0]?.msg) {
              message = errorData.detail[0].msg;
            } else if (typeof errorData?.detail === "string") {
              message = errorData.detail;
            }
          } catch (parseError) {
            console.error("Failed to parse error response:", parseError);
          }
          toast.error(message);
          setIsSavingQualification(false);
          return;
        }

        await res.json();
      }

      // ----- ACHIEVEMENTS -----
      for (let index = 0; index < achievements.length; index++) {
        const ach = achievements[index];
        const initialAch = initialAchievements?.[index];

        const isEmptyAch =
          !ach.title && !ach.description && !ach.year_received && !ach.file;

        if (isEmptyAch) continue;

        // If initial data exists and nothing changed -> skip POST
        if (initialAchievements && !hasAchievementChanged(ach, initialAch)) {
          continue;
        }

        const form = new FormData();
        form.append("title", ach.title || "");
        form.append("description", ach.description || "");
        form.append("year_received", ach.year_received || "");
        if (ach.file) {
          form.append("file", ach.file);
        }

        const res = await fetch(
          `${API_BASE_URL}/tutors/${tutorId}/achievement`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: form,
          }
        );

        if (!res.ok) {
          let message = "Failed to save achievements.";
          try {
            const errorData = await res.json();
            if (Array.isArray(errorData?.detail) && errorData.detail[0]?.msg) {
              message = errorData.detail[0].msg;
            } else if (typeof errorData?.detail === "string") {
              message = errorData.detail;
            }
          } catch (parseError) {
            console.error("Failed to parse error response:", parseError);
          }
          toast.error(message);
          setIsSavingQualification(false);
          return;
        }

        await res.json();
      }

      toast.success("Qualification details saved successfully.");
      setCurrentStep(6);
    } catch (error) {
      console.error(error);
      toast.error("Unable to save qualification details. Please try again.");
    } finally {
      setIsSavingQualification(false);
    }
  };

  /* ---------- Save KYC ---------- */

  const saveKYC = async () => {
    if (!tutorId) {
      toast.error("Tutor ID is missing. Please reload the page.");
      return;
    }

    setIsSubmittingKYC(true);

    try {
      // Profile picture (top)
      if (kycFiles.profilePhoto) {
        const form = new FormData();
        form.append("file", kycFiles.profilePhoto);

        const res = await fetch(
          `${API_BASE_URL}/tutors/${tutorId}/profile-picture`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: form,
          }
        );

        if (!res.ok) {
          let message = "Failed to upload profile picture.";
          try {
            const errorData = await res.json();
            if (Array.isArray(errorData?.detail) && errorData.detail[0]?.msg) {
              message = errorData.detail[0].msg;
            } else if (typeof errorData?.detail === "string") {
              message = errorData.detail;
            }
          } catch (parseError) {
            console.error("Failed to parse error response:", parseError);
          }
          toast.error(message);
          setIsSubmittingKYC(false);
          return;
        }

        await res.json();
      }

      const docMappings = [
        { key: "profile_selfie", type: "profile_selfie" },
        { key: "aadhaarFront", type: "aadhaar_front" },
        { key: "aadhaarBack", type: "aadhaar_back" },
        { key: "aadhaarWithFace", type: "aadhar_holding_selfie" },
        { key: "pan", type: "pan" },
      ];

      for (const { key, type } of docMappings) {
        const file = kycFiles[key];
        if (!file) continue;

        const form = new FormData();
        form.append("document_type", type);
        form.append("file", file);

        const res = await fetch(
          `${API_BASE_URL}/tutors/${tutorId}/kyc/upload`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
            },
            body: form,
          }
        );

        if (!res.ok) {
          let message = "Failed to upload KYC document.";
          try {
            const errorData = await res.json();
            if (Array.isArray(errorData?.detail) && errorData.detail[0]?.msg) {
              message = errorData.detail[0].msg;
            } else if (typeof errorData?.detail === "string") {
              message = errorData.detail;
            }
          } catch (parseError) {
            console.error("Failed to parse error response:", parseError);
          }
          toast.error(message);
          setIsSubmittingKYC(false);
          return;
        }

        await res.json();
      }

      toast.success("KYC documents submitted successfully.");

      // ✅ Mark completed in cookies & local state
      setCookie("registration_completed", "true", 7);
      setIsCompleted(true);
    } catch (error) {
      console.error(error);
      toast.error("Unable to submit KYC documents. Please try again.");
    } finally {
      setIsSubmittingKYC(false);
    }
  };

  // Prevent default form submit; we handle everything via buttons.
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  /* ---------- Thank You handlers ---------- */

  const handleRegisterNewProfile = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("uid");
      window.localStorage.removeItem("token");
    }
    deleteCookie("registration_step");
    deleteCookie("registration_completed");

    // Force fresh start from sign-up page (adjust route if needed)
    window.location.href = "/tutor-register";
  };

  const handleGoHome = () => {
    navigate("/");
  };

  /* ---------- If completed -> show Thank You instead of form ---------- */

  if (isCompleted) {
    return (
      <RegistrationThankYou
        onNewProfile={handleRegisterNewProfile}
        onGoHome={handleGoHome}
      />
    );
  }

  /* -------------------- Normal Registration Form UI -------------------- */

  return (
    <div className="w-full flex flex-col items-center justify-center p-10 gap-10">
      {/* Header */}
      <div className="mb-10">
        <motion.h5
          className="text-4xl font-medium mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Get Started
        </motion.h5>

        <motion.p
          className="text-lg text-muted-foreground text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Fill out the details to create your tutor profile and start
          connecting with students.
        </motion.p>
      </div>

      {/* Stepper */}
      <div className="flex flex-col gap-5 px-20 w-full justify-start items-center">
        <Stepper
          value={currentStep}
          onValueChange={handleStepChange}
          className="space-y-8"
        >
          <StepperNav className="gap-3.5">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              return (
                <StepperItem
                  key={step.title}
                  step={stepNumber}
                  className="relative flex-1 items-start"
                >
                  <StepperTrigger className="flex flex-col items-start justify-center gap-3.5 grow">
                    <StepperIndicator className="bg-border rounded-full h-1 w-full data-[state=active]:bg-primary data-[state=completed]:bg-primary" />
                    <div className="flex flex-col items-start gap-1">
                      <StepperTitle className="text-start font-semibold group-data-[state=inactive]/step:text-muted-foreground">
                        {step.title}
                      </StepperTitle>
                    </div>
                  </StepperTrigger>
                </StepperItem>
              );
            })}
          </StepperNav>
        </Stepper>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-[1440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-8"
          >
            {currentStep === 1 && (
              <PersonalInfoStep
                formData={formData}
                onChange={handleChange}
                date={date}
                month={month}
                setMonth={setMonth}
                value={dobInputValue}
                setValue={setDobInputValue}
                open={openDob}
                setOpen={setOpenDob}
                setDate={setDate}
              />
            )}

            {currentStep === 2 && (
              <ContactStep formData={formData} onChange={handleChange} />
            )}

            {currentStep === 3 && (
              <AddressStep
                formData={formData}
                onChange={handleChange}
                location={location}
                setLocation={setLocation}
              />
            )}

            {currentStep === 4 && (
              <TeachingProfileStep
                formData={formData}
                onChange={handleChange}
                classSubjects={classSubjects}
                setClassSubjects={setClassSubjects}
                teachingStatusOptions={teachingStatusOptions}
                teachingStatuses={teachingStatuses}
                toggleTeachingStatus={toggleTeachingStatus}
                demoVideoFile={demoVideoFile}
                demoVideoUrl={demoVideoUrl}
                onDemoVideoChange={(file) => setDemoVideoFile(file)}
              />
            )}

            {currentStep === 5 && (
              <QualificationStep
                educations={educations}
                setEducations={setEducations}
                achievements={achievements}
                setAchievements={setAchievements}
              />
            )}

            {currentStep === 6 && (
              <KYCStep
                kycFiles={kycFiles}
                setKycFiles={setKycFiles}
                existingKycDocs={existingKycDocs}
                setExistingKycDocs={setExistingKycDocs}
                profilePictureUrl={profilePictureUrl}
                setProfilePictureUrl={setProfilePictureUrl}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation Buttons */}
        <Separator className="my-8" />
        <div className="flex items-center justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            className="whitespace-nowrap"
            onClick={handleBack}
            disabled={
              isFirstStep ||
              isSavingTeaching ||
              isSavingQualification ||
              isSubmittingKYC
            }
          >
            Go back
          </Button>

          {currentStep === 4 ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  className="whitespace-nowrap"
                  disabled={loadingProfile || isSavingTeaching}
                >
                  {isSavingTeaching && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSavingTeaching ? "Saving..." : "Save"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Save teaching profile?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your personal details, contact information, address, and
                    teaching profile (including demo video) will be saved to
                    your tutor account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isSavingTeaching}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      type="button"
                      onClick={async () => {
                        await saveTeachingProfile();
                      }}
                      disabled={isSavingTeaching}
                    >
                      {isSavingTeaching && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isSavingTeaching ? "Saving..." : "Confirm & save"}
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : currentStep === 5 ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  className="whitespace-nowrap"
                  disabled={isSavingQualification}
                >
                  {isSavingQualification && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSavingQualification ? "Saving..." : "Save"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Save qualification details?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Your education and achievement details will be saved to your
                    tutor profile.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isSavingQualification}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      type="button"
                      onClick={async () => {
                        await saveQualification();
                      }}
                      disabled={isSavingQualification}
                    >
                      {isSavingQualification && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isSavingQualification ? "Saving..." : "Confirm & save"}
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : currentStep === 6 ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  className="whitespace-nowrap"
                  disabled={isSubmittingKYC}
                >
                  {isSubmittingKYC && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmittingKYC ? "Submitting..." : "Submit"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit KYC documents?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your profile picture and identity documents will be uploaded
                    for verification. You won&apos;t be able to edit them while
                    your KYC is under review.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isSubmittingKYC}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      type="button"
                      onClick={async () => {
                        await saveKYC();
                      }}
                      disabled={isSubmittingKYC}
                    >
                      {isSubmittingKYC && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isSubmittingKYC ? "Submitting..." : "Confirm & submit"}
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button
              type="button"
              className="whitespace-nowrap"
              onClick={handleNext}
              disabled={loadingProfile}
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
