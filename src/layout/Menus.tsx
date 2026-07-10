import { Link, useLocation } from "react-router-dom";
import { useCallback } from "react";

// SVG Icon Components
// const HomeIcon = ({ className }: { className?: string }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//   </svg>
// );
const HomeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {/* Bulb Outline */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="
        M12 2
        c-3.5 0-6 2.8-6 6
        0 2.3 1.2 4.4 3 5.6
        1.1 0.8 1.7 1.8 1.7 2.9v1
        h3.6v-1c0-1.1.6-2.1 1.7-2.9
        1.8-1.2 3-3.3 3-5.6
        0-3.2-2.5-6-6-6z
      "
    />

    {/* Bulb Base */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 18h6M10 21h4"
    />

    {/* Inside Star (bigger & cleaner) */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="
        M12 7
        l1 2 2 1 -2 1 -1 2
        -1 -2 -2 -1 2 -1 1 -2
      "
    />

    {/* Outer Sparkle (bigger & cleaner) */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="
        M18.5 4
        l.6 1.2 1.2.6 -1.2.6 -.6 1.2
        -.6 -1.2 -1.2 -.6 1.2 -.6 .6 -1.2
      "
    />
  </svg>
);



const ChatIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const AgentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);


const HistoryIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const navItems = [
  { icon: <HomeIcon />, name: "Insights", path: "/insights" },
  { icon: <ChatIcon />, name: "Chat", path: "/newchat", matchPath: "/chat" },
  { icon: <AgentIcon />, name: "Agent", path: "/agents" },
  { icon: <HistoryIcon />, name: "History", path: "/history" },
];

export const Menus: React.FC = () => {
  const location = useLocation();
  const isActive = useCallback(
    (path: string, matchPath?: string) =>
      location.pathname === path || (matchPath ? location.pathname.startsWith(matchPath) : location.pathname.startsWith(path)),
    [location.pathname]
  );

  return (
    <nav className="mb-6">
      <ul className="flex flex-col gap-2">
        {navItems.map(nav => {
          const active = isActive(nav.path!, nav.matchPath);

          return (
            <li key={nav.name} className="relative group">
              <Link
                to={nav.path!}
                className={`
                  flex flex-col items-center py-3 px-1 rounded-xl
                  transition-all duration-200 ease-in-out
                  ${active 
                    ? "bg-grey-200 shadow-sm" 
                    : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                {/* Icon */}
                <div className={`
                  w-6 h-6 transition-all duration-200 mb-1
                  ${active ? "text-blue-600" : "text-gray-500 hover:text-gray-700"}
                `}>
                  {nav.icon}
                </div>
                
                {/* Menu Name - Always Visible */}
                <span className={`
                  text-xs font-medium transition-all duration-200
                  ${active ? "text-blue-600" : "text-gray-500"}
                `}>
                  {nav.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};