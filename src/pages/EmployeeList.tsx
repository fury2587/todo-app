import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchEmployees } from '../store/employeeSlice';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, Phone, Building2, Globe } from 'lucide-react';

const EmployeeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: employees, status, error } = useSelector(
    (state: RootState) => state.employees
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Team</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="p-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-8">Our Team</h1>
        <div className="text-destructive">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Team</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <Card key={employee.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-semibold mb-4">{employee.name}</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span>{employee.company.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <span>{employee.website}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;