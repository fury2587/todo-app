import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Users } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-background border-b mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <CheckSquare className="w-5 h-5 mr-2" />
              <span>Todos</span>
            </Link>
            <Link
              to="/employees"
              className={`inline-flex items-center px-4 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                location.pathname === '/employees'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              <span>Employees</span>
            </Link>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;