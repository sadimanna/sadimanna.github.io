import { journals } from "@/lib/data/journals";
import { conferences } from "@/lib/data/conferences";
import { Rail } from "@/components/Rail";

export function EditorialActivities() {
  return (
    <div className="service__block">
      <h3>1. Editorial Activities</h3>
      <div className="service__cols service__cols--wide">
        <Rail
          label="Journal reviewer"
          heading={<h4 className="label">Journal Reviewer</h4>}
          visible={3}
          interval={4500}
          className="rail--plain rail--names"
        >
          {journals.map((journal, index) => (
            <li key={index} className="card">{journal}</li>
          ))}
        </Rail>
        <Rail
          label="Conference reviewer"
          heading={<h4 className="label">Conference Reviewer</h4>}
          visible={1}
          interval={5000}
          className="rail--plain rail--names"
        >
          {conferences.map((conference, index) => (
            <li key={index} className="card">{conference}</li>
          ))}
        </Rail>
      </div>
    </div>
  );
}
