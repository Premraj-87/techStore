import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Download,
  Package,
  Truck,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { invoiceAPI, ordersAPI } from '../services/api';
import { setOrders } from '../slices/orderSlice';
import { LoadingSpinner, SkeletonList } from '../components/Loaders';
import { showErrorToast } from '../utils/toastNotifications';

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders.orders);
  const token = auth.token || auth.userInfo?.token;

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      navigate('/login');
    }
  }, [token, page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getMyOrders(page, 10);
      dispatch(setOrders(response.data.orders));
      setPagination({
        total: response.data.total,
        pages: response.data.pages,
        currentPage: response.data.currentPage,
      });
    } catch (error) {
      showErrorToast('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={24} />;
      case 'processing':
        return <Package className="text-blue-500" size={24} />;
      case 'shipped':
        return <Truck className="text-purple-500" size={24} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={24} />;
      default:
        return <Clock size={24} />;
    }
  };

  const handleDownloadInvoice = async (orderId) => {
    try {
      const response = await invoiceAPI.generateInvoice(orderId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      showErrorToast('Error downloading invoice');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {loading && <LoadingSpinner />}

        {!loading && orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <Package className="mx-auto mb-4 text-gray-300" size={64} />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No orders yet
            </h2>
            <p className="text-gray-500 mb-6">Start shopping to create your first order</p>
            <button
              onClick={() => navigate('/')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      Order #{order._id?.slice(-8)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.orderStatus)}
                    <div className="text-right">
                      <p className="font-semibold text-gray-800 capitalize">
                        {order.orderStatus}
                      </p>
                      {order.trackingNumber && (
                        <p className="text-xs text-gray-500">{order.trackingNumber}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Items</p>
                      <p className="font-semibold">{order.orderItems.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total</p>
                      <p className="font-semibold">
                        ₹{order.totalPrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Payment</p>
                      <p className="font-semibold text-green-600">
                        {order.isPaid ? 'Paid' : 'Pending'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Delivery</p>
                      <p className="font-semibold">
                        {order.isDelivered ? 'Delivered' : 'In Transit'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="flex-1 bg-purple-100 text-purple-600 py-2 rounded hover:bg-purple-200 transition flex items-center justify-center gap-2"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </button>
                  {order.isPaid && (
                    <button
                      onClick={() => handleDownloadInvoice(order._id)}
                      className="bg-blue-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-200 transition flex items-center gap-2"
                    >
                      <Download size={18} />
                      Invoice
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: pagination.pages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 rounded border transition ${
                      page === i + 1
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 hover:border-purple-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
