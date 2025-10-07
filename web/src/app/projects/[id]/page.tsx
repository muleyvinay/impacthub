import Link from "next/link";
import { notFound } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Project {
  id: string;
  title: string;
  mission: string;
  category: string;
  coverImage?: string;
  coverVideo?: string;
  goal: number;
  raised: number;
  createdAt: string;
  milestones: Array<{
    id: string;
    title: string;
    amount: number;
    dueDate?: string;
    released: boolean;
  }>;
  updates: Array<{
    id: string;
    content: string;
    mediaUrl?: string;
    mediaType?: string;
    createdAt: string;
  }>;
}

// Static project data for demo
const getProjectData = (id: string): Project | null => {
  const projects = {
    'cmg7190up0002sot0ssct21aj': {
      id: 'cmg7190up0002sot0ssct21aj',
      title: 'Mangrove Restoration',
      mission: 'Restore coastal mangroves for climate resilience.',
      category: 'Climate',
      goal: 30000,
      raised: 12000,
      createdAt: '2025-09-30T20:51:31.346Z',
      milestones: [
        { id: '1', title: 'Site Assessment', amount: 8000, dueDate: '2025-02-15', released: true },
        { id: '2', title: 'Seedling Procurement', amount: 12000, dueDate: '2025-03-30', released: false },
        { id: '3', title: 'Planting Phase', amount: 10000, dueDate: '2025-05-15', released: false }
      ],
      updates: [
        { id: '1', content: 'Initial site assessment completed successfully', createdAt: '2025-01-15' },
        { id: '2', content: 'Seedling procurement in progress', createdAt: '2025-01-10' }
      ]
    },
    'cmg7190up0001sot0caofthwc': {
      id: 'cmg7190up0001sot0caofthwc',
      title: 'After-school Learning',
      mission: 'Tutoring for underserved students.',
      category: 'Education',
      goal: 15000,
      raised: 8200,
      createdAt: '2025-09-30T20:51:31.342Z',
      milestones: [
        { id: '1', title: 'Curriculum Development', amount: 5000, dueDate: '2025-02-01', released: true },
        { id: '2', title: 'Volunteer Training', amount: 3000, dueDate: '2025-02-15', released: false },
        { id: '3', title: 'Program Launch', amount: 7000, dueDate: '2025-03-01', released: false }
      ],
      updates: [
        { id: '1', content: 'Curriculum development completed', createdAt: '2025-01-20' },
        { id: '2', content: 'Volunteer recruitment completed', createdAt: '2025-01-05' }
      ]
    },
    'cmg7190um0000sot01ipwupw7': {
      id: 'cmg7190um0000sot01ipwupw7',
      title: 'Clean Water Initiative',
      mission: 'Provide sustainable access to clean water.',
      category: 'Health',
      goal: 25000,
      raised: 18420,
      createdAt: '2025-09-30T20:51:31.342Z',
      milestones: [
        { id: '1', title: 'Water Source Analysis', amount: 5000, dueDate: '2025-01-31', released: true },
        { id: '2', title: 'Infrastructure Planning', amount: 8000, dueDate: '2025-02-28', released: false },
        { id: '3', title: 'Construction Phase', amount: 12000, dueDate: '2025-04-30', released: false }
      ],
      updates: [
        { id: '1', content: 'Water source analysis completed', createdAt: '2025-01-25' },
        { id: '2', content: 'Community training sessions scheduled', createdAt: '2025-01-10' }
      ]
    }
  };

  return projects[id as keyof typeof projects] || null;
};

// Generate static params for static export
export async function generateStaticParams() {
  return [
    { id: 'cmg7190up0002sot0ssct21aj' },
    { id: 'cmg7190up0001sot0caofthwc' },
    { id: 'cmg7190um0000sot01ipwupw7' }
  ];
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const project = getProjectData(params.id);

  if (!project) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/projects" 
              className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
            >
              ← Back to Projects
            </Link>
            <h1 className="text-4xl font-extrabold text-black mb-2">{project.title}</h1>
            <p className="text-xl text-gray-700">{project.mission}</p>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">💰</div>
                  <div>
                    <p className="text-sm text-gray-600">Total Raised</p>
                    <p className="text-2xl font-bold text-black">${project.raised.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">🎯</div>
                  <div>
                    <p className="text-sm text-gray-600">Goal</p>
                    <p className="text-2xl font-bold text-black">${project.goal.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">📈</div>
                  <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="text-2xl font-bold text-black">{Math.round((project.raised / project.goal) * 100)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Funding Progress */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-black mb-4">Funding Progress</h3>
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${Math.round((project.raised / project.goal) * 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>${project.raised.toLocaleString()}</span>
                <span>${project.goal.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                Donate Now 💝
              </button>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                Share Project 📤
              </button>
            </div>

            {/* Milestones */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-black mb-4">Project Milestones</h3>
              <div className="space-y-4">
                {project.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-black">{milestone.title}</h4>
                      <p className="text-sm text-gray-600">${milestone.amount.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        milestone.released ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {milestone.released ? 'Released' : 'Pending'}
                      </span>
                      {milestone.dueDate && (
                        <span className="text-sm text-gray-600">
                          Due: {new Date(milestone.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Updates */}
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Project Updates</h3>
              <div className="space-y-4">
                {project.updates.map((update) => (
                  <div key={update.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="text-gray-700">{update.content}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(update.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}