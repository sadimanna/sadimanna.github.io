import { journals } from "@/lib/data/journals";
import { conferences } from "@/lib/data/conferences";

export function EditorialActivities() {
  return (
    <div className="service__block">
      <h3>1. Editorial Activities</h3>
      <div className="service__cols service__cols--wide">
        <div>
          <h4 className="label">Journal Reviewer</h4>
          <ul className="service__list cols-2">
            {journals.map((journal, index) => (
              <li key={index}>{journal}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="label">Conference Reviewer</h4>
          <ul className="service__list">
            {conferences.map((conference, index) => (
              <li key={index}>{conference}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
