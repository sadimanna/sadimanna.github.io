import { GraduationCap } from "lucide-react";
import { students } from "@/lib/data/students";
import { Badge } from "@/components/ui/badge";

export function TeachingMentorshipSection() {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-8 border-b pb-2">
        <GraduationCap className="w-6 h-6 text-purple-600" />
        <h3 className="text-2xl font-bold text-gray-800">2. Teaching & Mentorship</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Teaching Assistant Column */}
        <div className="bg-gray-50 border rounded-2xl p-6 shadow-sm flex flex-col h-full">
          <h4 className="text-lg font-semibold text-purple-700 mb-5 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            Teaching Assistant
          </h4>
          <div className="space-y-6 flex-1 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h5 className="font-bold text-gray-900 mb-1">Artifical Intelligence and Machine Learning (M.Tech (CS))</h5>
              <div className="text-sm font-medium text-gray-600 mb-1">Indian Statistical Institute, Kolkata</div>
              <div className="text-xs text-gray-500 mb-3 bg-gray-100 inline-block px-2 py-0.5 rounded">2018-19</div>
              <ul className="text-sm text-gray-700 space-y-1.5 pl-4 list-disc marker:text-purple-400">
                <li>Object Detection</li>
                <li>Segmentation</li>
                <li>Machine Learning Concepts</li>
                <li>Project Evaluation on Deep Learning & CV</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h5 className="font-bold text-gray-900 mb-1">Introduction to Machine Learning (M.Tech (ETCE))</h5>
              <div className="text-sm font-medium text-gray-600 mb-1">Indian Institute of Engineering Science and Technology, Shibpur</div>
              <div className="text-xs text-gray-500 mb-3 bg-gray-100 inline-block px-2 py-0.5 rounded">2018-19</div>
              <ul className="text-sm text-gray-700 space-y-1.5 pl-4 list-disc marker:text-purple-400">
                <li>Machine Learning Algorithms</li>
                <li>Tutorial Sessions for First Semester Students</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mentorship Column */}
        <div className="bg-gray-50 border rounded-2xl p-6 shadow-sm flex flex-col h-full">
          <h4 className="text-lg font-semibold text-purple-700 mb-5 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            Mentorship
          </h4>
          <div className="space-y-4 flex-1 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {students.map((student) => (
              <div key={student.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h5 className="font-bold text-gray-900 leading-tight">{student.name}</h5>
                    <div className="text-sm text-gray-600">{student.institution}</div>
                  </div>
                  <Badge variant={student.status === "Completed" ? "default" : "secondary"} className={student.status === "Completed" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}>
                    {student.status}
                  </Badge>
                </div>
                <div className="text-sm font-medium text-gray-800 mt-1">{student.researchTopic}</div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {student.venues.map((venue, idx) => (
                    <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {venue}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
