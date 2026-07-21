import { EditorialActivities } from "./EditorialActivities";
import { TeachingMentorshipSection } from "./TeachingMentorshipSection";
import { TutorialsSection } from "./TutorialsSection";

export function AcademicServiceSection() {
  return (
    <section id="academic-service" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Service & Leadership</h2>
          <p className="text-lg text-gray-600">
            Contributing to the scientific community through various roles and initiatives
          </p>
        </div>

        <EditorialActivities />
        <TeachingMentorshipSection />
        <TutorialsSection />
      </div>
    </section>
  );
}
