import { EditorialActivities } from "./EditorialActivities";
import { TeachingMentorshipSection } from "./TeachingMentorshipSection";
import { TutorialsSection } from "./TutorialsSection";

export function AcademicServiceSection() {
  return (
    <section id="academic-service" className="section section--well">
      <div className="wrap">
        <div className="head-split">
          <h2>Academic Service &amp; Leadership</h2>
          <p>Contributing to the scientific community through various roles and initiatives</p>
        </div>

        <div className="service">
          <EditorialActivities />
          <TeachingMentorshipSection />
          <TutorialsSection />
        </div>
      </div>
    </section>
  );
}
