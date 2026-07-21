import { Users, FileText, ImageIcon, Video, Presentation } from "lucide-react";
import { tutorials } from "@/lib/data/tutorials";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function TutorialsSection() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-8 border-b pb-2">
        <Users className="w-6 h-6 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-800">3. Tutorials & Invited Talks</h3>
      </div>

      <div className="flex flex-col gap-5 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {tutorials.map((tutorial) => (
          <Card key={tutorial.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start p-6 gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {tutorial.date}
                  </Badge>
                  <span className="text-sm font-medium text-gray-500">{tutorial.venue}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{tutorial.title}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{tutorial.description}</p>
              </div>

              {tutorial.links && Object.keys(tutorial.links).length > 0 && (
                <div className="flex flex-wrap gap-2 md:flex-col md:w-32 flex-shrink-0">
                  {tutorial.links.slides && (
                    <Button asChild variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                      <Link href={tutorial.links.slides} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-3.5 h-3.5 mr-2 text-blue-600" />
                        Slides
                      </Link>
                    </Button>
                  )}
                  {tutorial.links.poster && (
                    <Button asChild variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                      <Link href={tutorial.links.poster} target="_blank" rel="noopener noreferrer">
                        <Presentation className="w-3.5 h-3.5 mr-2 text-purple-600" />
                        Poster
                      </Link>
                    </Button>
                  )}
                  {tutorial.links.photos && (
                    <Button asChild variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                      <Link href={tutorial.links.photos} target="_blank" rel="noopener noreferrer">
                        <ImageIcon className="w-3.5 h-3.5 mr-2 text-emerald-600" />
                        Photos
                      </Link>
                    </Button>
                  )}
                  {tutorial.links.video && (
                    <Button asChild variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                      <Link href={tutorial.links.video} target="_blank" rel="noopener noreferrer">
                        <Video className="w-3.5 h-3.5 mr-2 text-red-600" />
                        Video
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
