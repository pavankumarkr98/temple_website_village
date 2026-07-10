import { Outlet } from "react-router";

const LayoutContent: React.FC = () => {
  return (
    <div className="flex scroll-smooth custom-scrollbar">
      {/* Main content area */}        
        {/* Main content - Starts below header */}
        <main className="flex-1 overflow-autO">
          <Outlet />
        </main>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return <LayoutContent />;
};

export default AppLayout;