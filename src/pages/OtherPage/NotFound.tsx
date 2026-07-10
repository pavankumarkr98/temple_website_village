import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import { Wrench, Construction, Coffee, Clock, Zap, Code } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="Page Under Construction | Learning Hub"
        description="This page is currently being developed. Check back soon!"
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />
        
        <div className="mx-auto w-full max-w-[500px] text-center">
          {/* Animated Icon/Emoji */}
          <div className="mb-6">
            <div className="relative inline-flex">
              <div className="text-6xl animate-bounce">🚧</div>
              <Construction className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500 animate-pulse" />
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white/90">
            Page Under Construction
          </h1>
          
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-lg font-medium text-yellow-800 dark:text-yellow-300">
                We're Building Something Awesome!
              </p>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Our team is working hard to bring you this feature. Please check back soon!
            </p>
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              While you wait, why not explore what we already have ready for you?
            </p>
            
            {/* What's available section */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Python Topics
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  17+ topics ready
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Learning Paths
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Beginner to Advanced
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-medium text-white shadow-theme-xs hover:bg-blue-700 transition-colors"
            >
              <Coffee className="w-4 h-4" />
              Back to Home Page
            </Link>
            
            <Link
              to="/python"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 transition-colors"
            >
              <Zap className="w-4 h-4" />
              Explore Python Topics
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Development Progress
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                65%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2.5 rounded-full animate-pulse" 
                style={{ width: '65%' }}
              ></div>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Estimated completion: 2 weeks
            </p>
          </div>
        </div>

        {/* Fun message at bottom */}
        <div className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <Wrench className="w-4 h-4 animate-spin-slow" />
            <span>Crafting with ❤️ by Pavan</span>
            <Coffee className="w-4 h-4" />
          </div>
          <p className="mt-1 text-xs">
            &copy; {new Date().getFullYear()} - Learning Hub
          </p>
        </div>
      </div>
    </>
  );
}