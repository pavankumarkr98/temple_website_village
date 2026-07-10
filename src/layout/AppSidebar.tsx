import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import {Menus} from "./Menus";

const AppSidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-0 pb-4 h-screen w-[90px] flex flex-col bg-white dark:bg-gray-900 text-gray-900 border-r-2 border-gray-300 dark:border-gray-600 z-50">
      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* Add mt-4 or mt-16 to match header height */}
        <div className="flex-1 mt-16">
          <Menus />
        </div>
        
        {/* Bottom Controls */}
        <div className="flex-shrink-0 border-t border-gray-400 dark:border-gray-800 pt-4 pb-6">
          <div className="flex flex-col gap-4 justify-center items-center w-full">
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
