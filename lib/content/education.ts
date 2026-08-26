import type { EducationItem, PriorEducationItem } from "./types";

export const EDUCATION: EducationItem[] = [
  {
    institution: "Columbia University",
    period: "Sep 2026 - Expected Dec 2027",
    location: "New York, NY",
    degree: "M.S. Computer Science",
    details: ["Pathway: Network Systems"],
  },
  {
    institution: "FLAME University",
    period: "Aug 2021 - May 2025",
    location: "Pune, India",
    degree:
      "B.Sc. (Hons.) Computer Science · PG Diploma in Interdisciplinary Studies",
    details: [
      "CGPA: 8.9/10",
      "Merit scholarships: 25% of tuition (2021-2024), 60% of tuition (2024-2025)",
      "Honors thesis: Precipitation Nowcasting Using ConvLSTM with INSAT-3D Satellite Data over the Indian Subcontinent",
    ],
  },
];

export const PRIOR_EDUCATION: PriorEducationItem[] = [];
