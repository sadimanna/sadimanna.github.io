import { journals } from "@/lib/data/journals";
import { conferences } from "@/lib/data/conferences";
import { BookOpen } from "lucide-react";

export function EditorialActivities() {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-8 border-b pb-2">
        <BookOpen className="w-6 h-6 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-800">1. Editorial Activities</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Journals Column */}
        <div className="bg-gray-50 border rounded-2xl p-6 h-full shadow-sm">
          <h4 className="text-lg font-semibold text-green-700 mb-5 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            Journal Reviewer
          </h4>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {journals.map((journal, index) => (
              <div
                key={index}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:shadow-md hover:border-green-300 hover:text-green-800 transition-all duration-200 cursor-default"
              >
                {journal}
              </div>
            ))}
          </div>
        </div>

        {/* Conferences Column */}
        <div className="bg-gray-50 border rounded-2xl p-6 h-full shadow-sm">
          <h4 className="text-lg font-semibold text-blue-700 mb-5 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            Conference Reviewer
          </h4>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {conferences.map((conference, index) => (
              <div
                key={index}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:shadow-md hover:border-blue-300 hover:text-blue-800 transition-all duration-200 cursor-default"
              >
                {conference}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
