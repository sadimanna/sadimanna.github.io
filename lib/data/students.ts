export type Student = {
  id: string;
  name: string;
  institution: string;
  researchTopic: string;
  venues: string[];
  status: "Completed" | "Ongoing";
};

export const students: Student[] = [
  {
    id: "1",
    name: "Ritik Kumar Badiya",
    institution: "IISc Bangalore",
    researchTopic: "Gradient Inversion Attack",
    venues: ["Under Review"],
    status: "Ongoing",
  },
  {
    id: "2",
    name: "Ashmit Sinha",
    institution: "IISc Bangalore",
    researchTopic: "Gradient Inversion Attack",
    venues: ["Under Review"],
    status: "Ongoing",
  },
  {
    id: "3",
    name: "Arpan Bairagi",
    institution: "ISI Kolkata",
    researchTopic: "Heart Rate Monitoring",
    venues: ["ICIP 2026"],
    status: "Ongoing",
  },
  {
    id: "4",
    name: "Suyash Kumar",
    institution: "IIT BHU",
    researchTopic: "Semi-Supervised Learning, Medical Imaging",
    venues: ["AI4Fertility Workshop"],
    status: "Completed",
  },
  {
    id: "5",
    name: "Priyangshu Mandal",
    institution: "IIT Kharagpur",
    researchTopic: "Self-Supervised Learning",
    venues: ["Under Review"],
    status: "Completed",
  },
  {
    id: "6",
    name: "Soumitri Chattopadhyay",
    institution: "Jadavpur University",
    researchTopic: "Signature Verification, Self-supervised Learning",
    venues: ["ICIP 2022", "ICPR 2022", "IEEE TAI 2024"],
    status: "Completed",
  },
  {
    id: "7",
    name: "Supreet Sahu",
    institution: "IIT Kharagpur",
    researchTopic: "Self-Supervised Learning",
    venues: ["M.Tech. Dissertation"],
    status: "Completed",
  },
  {
    id: "8",
    name: "Sayan Das",
    institution: "ISI Kolkata",
    researchTopic: "Self-supervised Medical Imaging",
    venues: ["M.Tech Dissertation"],
    status: "Completed",
  },
  {
    id: "9",
    name: "Tias Mondal",
    institution: "IIT Kharagpur",
    researchTopic: "Self-Supervised Learning",
    venues: ["M.Tech. Dissertation"],
    status: "Completed",
  },
];
