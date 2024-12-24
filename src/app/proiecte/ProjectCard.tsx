// components/ProjectCard.tsx
import React from 'react';
import Image from 'next/image';

interface Project {
    id: string;
    title: string;
    category: string;
    status: string;
    date: string;
    image: string;
}

interface ProjectCardProps {
    project: Project;
    onClick: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    return (
        <div
            className="w-full sm:w-5/12 lg:w-1/2 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-xl"
            onClick={() => onClick(project.id)}
        >
            <Image src={project.image} alt={project.title} width={500} height={300}
                   className="w-full h-48 object-cover"/>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <div className="flex justify-center gap-2 mb-2 flex-wrap">
                    <span className="bg-custom-blue text-white px-3 py-1 rounded-full text-sm">{project.category}</span>
                    <span className="bg-custom-blue text-white px-3 py-1 rounded-full text-sm">{project.status}</span>
                </div>
                <span className="text-gray-600 text-sm">{project.date}</span>
            </div>
        </div>
    );
};

export default ProjectCard;
