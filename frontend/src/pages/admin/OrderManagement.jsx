import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { showErrorToast, showSuccessToast } from '../../utils/toastNotifications';
import { Edit2, Trash2, Eye } from 'lucide-react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [page, filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getOrders(page, 10, filter);
      setOrders(response.data.orders);
      setPagination({
        total: response.data.total,
        pages: response.data.pages,
      });
    } catch (error) {
      showErrorToast('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newOrderStatus) => {
    try {
      await adminAPI.updateOrderStatus(orderId, {
        orderStatus: newOrderStatus,
        description: `Order status updated to ${newOrderStatus}`,
      });
      showSuccessToast('Order status updated');
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      showErrorToast('Error updating order');
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex gap-2">
        {['', 'pending', 'processing', 'shipped', 'delivered'].map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilter(status);
              setPage(1);
            }}
            className={`px-4 py-2 rounded capitalize transition ${
              filter === status
                ? 'bg-purple-600 text-white'
                : 'bg-white border border-gray-300 hover:border-purple-600'
            }`}
          >
            {status || 'All'}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm">{order._id?.slice(-8)}</td>
                  <td className="px-6 py-4">{order.user.name}</td>
                  <td className="px-6 py-4 font-semibold">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                        order.orderStatus === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.orderStatus === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for updating status */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Update Order Status</h3>
            <p className="text-gray-600 mb-4">
              Order #{selectedOrder._id?.slice(-8)}
            </p>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedOrder._id, newStatus)}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
