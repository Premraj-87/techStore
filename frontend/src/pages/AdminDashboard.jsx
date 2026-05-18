
import { useDispatch, useSelector } from 'react-redux';

import { BarChart3, Users, Package, ShoppingCart, LogOut } from 'lucide-react';
import Dashboard from './admin/Dashboard';
import UserManagement from './admin/UserManagement';
import OrderManagement from './admin/OrderManagement';
import { showSuccessToast } from '../utils/toastNotifications';

const AdminDashboard = () => {
  // eslint-disable-next-line no-undef
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  if (!auth.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have admin privileges</p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showSuccessToast('Logged out successfully');
    navigate('/login');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-purple-900 text-white p-6 fixed h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        <nav className="space-y-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-100 hover:bg-purple-800'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-2 mt-auto"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'orders' && <OrderManagement />}
          {activeTab === 'products' && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Product management coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
