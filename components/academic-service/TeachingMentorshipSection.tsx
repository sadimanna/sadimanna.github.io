import { students } from "@/lib/data/students";

const teaching = [
  {
    course: "Introduction to Data Science (M. Tech. (CDS) 1st Year)",
    institution: "Indian Institute of Science, Bangalore",
    year: "2026-27",
    topics: ["Probability", "Statistics", "Machine Learning"],
  },
  {
    course: "Artificial Intelligence and Machine Learning (M.Tech (CS))",
    institution: "Indian Statistical Institute, Kolkata",
    year: "2018-19",
    topics: ["Object Detection", "Segmentation", "Machine Learning Concepts", "Project Evaluation on Deep Learning & CV"],
  },
  {
    course: "Introduction to Machine Learning (M.Tech (ETCE))",
    institution: "Indian Institute of Engineering Science and Technology, Shibpur",
    year: "2018-19",
    topics: ["Machine Learning Algorithms", "Tutorial Sessions for First Semester Students"],
  },
];

export function TeachingMentorshipSection() {
  return (
    <div className="service__block">
      <h3>2. Teaching &amp; Mentorship</h3>
      <div className="service__cols">
        <div>
          <h4 className="label">Teaching Assistant</h4>
          <ul className="index">
            {teaching.map((t) => (
              <li key={t.course}>
                <p className="partners__inst">{t.course}</p>
                <p className="label">
                  {t.institution}, <time>{t.year}</time>
                </p>
                <ul className="topics">
                  {t.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="label">Mentorship</h4>
          <ul className="index cols-2">
            {students.map((student) => (
              <li key={student.id}>
                <p className="partners__inst">{student.name}</p>
                <p className="label">
                  {student.institution}, {student.status}
                </p>
                <p>{student.researchTopic}</p>
                <ul className="topics">
                  {student.venues.map((venue, idx) => (
                    <li key={idx}>{venue}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
