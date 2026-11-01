import { tutorials } from "@/lib/data/tutorials";

export function TutorialsSection() {
  return (
    <div className="service__block">
      <h3>3. Tutorials &amp; Invited Talks</h3>
      <ul className="index">
        {tutorials.map((tutorial) => (
          <li key={tutorial.id}>
            <p className="partners__inst">{tutorial.title}</p>
            <p className="label">
              <time>{tutorial.date}</time>, {tutorial.venue}
            </p>
            <p>{tutorial.description}</p>
            {tutorial.links && Object.keys(tutorial.links).length > 0 && (
              <div className="links">
                {tutorial.links.slides && (
                  <a href={tutorial.links.slides} target="_blank" rel="noopener noreferrer">Slides</a>
                )}
                {tutorial.links.poster && (
                  <a href={tutorial.links.poster} target="_blank" rel="noopener noreferrer">Poster</a>
                )}
                {tutorial.links.photos && (
                  <a href={tutorial.links.photos} target="_blank" rel="noopener noreferrer">Photos</a>
                )}
                {tutorial.links.video && (
                  <a href={tutorial.links.video} target="_blank" rel="noopener noreferrer">Video</a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
