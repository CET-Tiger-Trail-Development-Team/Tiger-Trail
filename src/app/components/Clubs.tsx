import React from 'react';
import { Globe, Instagram, Facebook, Youtube, ExternalLink, ChevronRight, Users, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const CLUBS = [
  {
    id: 'asce',
    name: 'American Society of Civil Engineers',
    shortName: 'ASCE RIT',
    description: 'Prepares upcoming civil engineers for a career in engineering and construction through workshops, presentations, and hands on involvement in our two competitive teams - Steel Bridge or Concrete Canoe.',
    image: 'https://images.unsplash.com/photo-1529926691761-20fb82067c71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXZpbCUyMGVuZ2luZWVyaW5nJTIwYnJpZGdlJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc4MjIzMDEzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website', 'Instagram']
  },
  {
    id: 'agc',
    name: 'Associated General Contractors',
    shortName: 'AGC',
    description: 'Enhance your career prospects in construction by fostering connections with industry, cultivating leadership skills and building your knowledge on the industry’s future.',
    image: 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzgyMjMwMTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website', 'Facebook']
  },
  {
    id: 'baja',
    name: 'BAJA SAE',
    shortName: 'BAJA',
    description: 'Design, build, and race an all-terrain vehicle. Our mission is to develop the engineering skills of every student involved while encouraging the passion for the team which brings us all together.',
    image: 'https://images.unsplash.com/photo-1777354845976-b4113fb91512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmYtcm9hZCUyMHZlaGljbGUlMjBkaXJ0JTIwYnVnZ3l8ZW58MXx8fHwxNzgyMjMwMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website', 'Instagram']
  },
  {
    id: 'bim',
    name: 'Building Information Modeling Club',
    shortName: 'BIM Club',
    description: 'Provides resources and collaborative opportunities for students to enhance their skills in BIM software like Revit and STAAD, fostering a supportive environment for project work and feedback.',
    image: 'https://images.unsplash.com/photo-1546414701-81cc6963c67f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwM2QlMjBtb2RlbGluZyUyMGNvbXB1dGVyfGVufDF8fHx8MTc4MjIzMDE0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website']
  },
  {
    id: 'clean-snowmobile',
    name: 'Clean Snowmobile',
    shortName: 'Snowmobile',
    description: 'Join the active and enthusiastic team to improve the impact snowmobiles have on the environment while keeping them fun to ride! Compete in various events, from acceleration, cold start, endurance/fuel economy, and handling to overall design.',
    image: 'https://images.unsplash.com/photo-1549351245-ac6dda50eb92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm93bW9iaWxlJTIwc25vdyUyMHdpbnRlcnxlbnwxfHx8fDE3ODIyMzAxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website', 'Instagram']
  },
  {
    id: 'concrete-canoe',
    name: 'Concrete Canoe',
    shortName: 'Canoe',
    description: 'Under The American Society of Civil Engineers, Concrete Canoe is where you\'ll design and build a canoe out of concrete to be judged and raced against other schools.',
    image: 'https://images.unsplash.com/photo-1559014778-b081e50ce1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jcmV0ZSUyMGNhbm9lJTIwd2F0ZXJ8ZW58MXx8fHwxNzgyMjMwMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Instagram']
  },
  {
    id: 'cet-cares',
    name: 'Cultivating Access, Respect, Engagement and Success',
    shortName: 'CET CARES',
    description: 'CET CARES is committed to fostering a vibrant and welcoming community within the College of Engineering Technology. Through intentional initiatives and meaningful engagement, we aim to create opportunities that support student success.',
    image: 'https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZ3JvdXAlMjB1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBtZWV0aW5nfGVufDF8fHx8MTc4MjIzMDE1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website']
  },
  {
    id: 'iop',
    name: 'Institute of Packaging Professionals',
    shortName: 'IOPP',
    description: 'Advancing the expertise and involvement of packaging science students at RIT through opportunities to showcase designs, understand the workforce and networking.',
    image: 'https://images.unsplash.com/photo-1700165644892-3dd6b67b25bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkYm9hcmQlMjBib3hlcyUyMHBhY2thZ2luZyUyMGRlc2lnbnxlbnwxfHx8fDE3ODIyMzAxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: []
  },
  {
    id: 'evt',
    name: 'Electric Vehicle Team',
    shortName: 'EVT',
    description: 'Fast. Clean. Electric. We\'re dedicated to the design of custom electric race motorcycles, the continuous provision of industry-comparable experiences, and maintaining an environment that encourages interdisciplinary collaboration.',
    image: 'https://images.unsplash.com/photo-1543134471-52488faa85af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMG1vdG9yY3ljbGUlMjByYWNpbmd8ZW58MXx8fHwxNzgyMjMwMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website', 'Instagram']
  },
  {
    id: 'shpe',
    name: 'Society of Hispanic Professional Engineers',
    shortName: 'SHPE',
    description: 'SHPE-RIT is known to prize its heritage and strive to endorse its members with qualities of leadership and excellence. We focus on the betterment of students in STEM fields through a series of professional, academic and social events.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXNwYW5pYyUyMHByb2Zlc3Npb25hbHMlMjB0ZWNoJTIwY29udmVudGlvbnxlbnwxfHx8fDE3ODIyMzAxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Instagram']
  },
  {
    id: 'spe',
    name: 'Society of Plastics Engineers',
    shortName: 'SPE',
    description: 'RIT chapter of SPE. The Society of Plastics Engineers is a organization dedicated to the advancement and education of the plastics industry.',
    image: 'https://images.unsplash.com/photo-1611117775350-ac3950990985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFzdGljcyUyMGluamVjdGlvbiUyMG1vbGRpbmclMjBzY2llbmNlfGVufDF8fHx8MTc4MjIzMDE2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Instagram']
  },
  {
    id: 'spex',
    name: 'Space Exploration',
    shortName: 'SPEX',
    description: 'RIT SPEX is an astronautical engineering student-faculty research group. We introduce students of all backgrounds to the space industry and further their chances at pursuing a career in the industry by giving hands-on project experience.',
    image: 'https://images.unsplash.com/photo-1460186136353-977e9d6085a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNhdGVsbGl0ZSUyMGV4cGxvcmF0aW9uJTIwZW5naW5lZXJpbmd8ZW58MXx8fHwxNzgyMjMwMTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website', 'Instagram']
  },
  {
    id: 'seal',
    name: 'Student Environmental Action League',
    shortName: 'SEAL',
    description: 'Students for a green campus, green future, green community. Through our efforts and partnerships with organizations on campus and in the Rochester community, SEAL facilitates environmental education, awareness, and initiatives.',
    image: 'https://images.unsplash.com/photo-1597868165956-03a6827955b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwbmF0dXJlJTIwY2xlYW4lMjBoYW5kcyUyMHBsYW50fGVufDF8fHx8MTc4MjIzMDE3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website', 'Instagram']
  },
  {
    id: 'steel-bridge',
    name: 'Steel Bridge',
    shortName: 'Steel Bridge',
    description: 'Join one of RIT\'s premiere engineering competition teams! Design and fabricate a scaled model bridge over the course of a school year to compete in the annual regional Student Steel Bridge Competition (SSBC).',
    image: 'https://images.unsplash.com/photo-1415697676195-edc2ab6d40ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMGJyaWRnZSUyMG1vZGVsJTIwZW5naW5lZXJpbmd8ZW58MXx8fHwxNzgyMjMwMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website', 'Instagram']
  },
  {
    id: 'wit',
    name: 'Women In Technology',
    shortName: 'WIT',
    description: 'Dedicated and committed to creating platforms that energize, expand representation and strive to propel the success and advancement of CET students and beyond. Open to all students, regardless of gender.',
    image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVuZ2luZWVycyUyMHdvcmtpbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3ODIyMzAxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website', 'Instagram']
  },
  {
    id: 'vex',
    name: 'Vex Robotics',
    shortName: 'VEX',
    description: 'One of RIT\'s only performance robotics teams. We design, build and program a robot that competes across the nation in VEX\'s annual challenge. From new to senior members, we\'re hands-on with the goal to improve our skills.',
    image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGNvbXBldGl0aW9uJTIwcm9ib3QlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc4MjIzMDE3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    links: ['Website', 'Instagram', 'YouTube']
  }
];

export function ClubsView() {
  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* Hero Section */}
      <div className="bg-card-surface border-b border-desktop-bg pt-12 pb-16 px-6 sm:px-12 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-rit-orange/5" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rit-orange/10 text-rit-orange rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Users size={14} />
            Student Organizations
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-primary-text tracking-tight mb-6 leading-tight">
            Building more than <span className="text-rit-orange">bridges</span> and <span className="text-rit-orange">circuits</span>.
          </h2>
          <p className="text-base sm:text-lg text-secondary-text max-w-2xl font-medium leading-relaxed sm:mx-0 mx-auto">
            We're making connections that will last a lifetime. Explore our affiliated clubs below, join on Campus Groups and find your people!
          </p>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="flex-1 p-6 sm:p-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CLUBS.map((club) => (
            <div key={club.id} className="bg-card-surface rounded-2xl shadow-sm border border-desktop-bg overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden relative">
                <ImageWithFallback 
                  src={club.image} 
                  alt={club.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-3">
                  <div className="text-rit-orange text-xs font-extrabold uppercase tracking-widest mb-1">{club.shortName}</div>
                  <h3 className="text-primary-text font-bold text-lg leading-snug">{club.name}</h3>
                </div>
                <p className="text-sm text-secondary-text mb-6 flex-1">
                  {club.description}
                </p>
                
                {club.links.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-desktop-bg">
                    {club.links.map(link => {
                      let Icon = ExternalLink;
                      if (link === 'Instagram') Icon = Instagram;
                      if (link === 'Facebook') Icon = Facebook;
                      if (link === 'YouTube') Icon = Youtube;
                      if (link === 'Website') Icon = Globe;
                      
                      return (
                        <button key={link} className="flex items-center gap-1.5 px-3 py-1.5 bg-app-bg text-secondary-text hover:text-rit-orange hover:bg-rit-orange/10 rounded-lg text-xs font-bold transition-colors">
                          <Icon size={14} />
                          {link}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-auto pt-4 border-t border-desktop-bg">
                    <span className="text-xs text-muted-text font-bold flex items-center gap-1">
                      <Sparkles size={12} /> Search Campus Groups to join
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}