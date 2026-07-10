import { useState } from "react";
import { User, ChevronDown, Home } from "lucide-react";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import { Link } from "react-router";

const AppHeader: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = {
    name: "Pavan",
    email: "wearehereyouhelpyou@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pavan&backgroundColor=00897b&backgroundType=gradientLinear",
    role: "Tech Expert",
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 dark:bg-gray-900 dark:border-gray-800 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div className="w-full">
        <div className="flex items-center justify-between py-3 px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
           <div className="hidden sm:block">
              <Link to="/">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Home className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <div className="font-poppins font-bold text-lg bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 bg-clip-text text-transparent">
                    Learning Hub
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle */}
            <div className="w-10">
              <ThemeToggleButton />
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="User profile"
              >
                {/* Avatar */}
                <div className="group relative w-8 h-8 cursor-pointer">
                  {/* Gradient border - shows on hover */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1px]">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800"></div>
                  </div>
                  
                  {/* Default border */}
                  <div className="absolute inset-0 rounded-full border border-gray-300 dark:border-gray-600 group-hover:border-transparent transition-colors duration-300"></div>
                  
                  {/* Avatar content */}
                  <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <User className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    )}
                  </div>
                </div>
                
                {/* Name - visible on larger screens */}
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {user.role}
                  </div>
                </div>
                
                <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-70 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                    {/* User info */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-15 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                            {user.avatar ? (
                              <img 
                                src={user.avatar} 
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Footer */}
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        Python Learning Hub v1.0
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { AppHeader };