import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Package,
  Truck,
  CheckCircle,
  MapPin,
  CreditCard,
  Download,
  ArrowLeft,
} from 'lucide-react';
import { ordersAPI, invoiceAPI } from '../services/api';
import { LoadingSpinner } from '../components/Loaders';
import { showErrorToast, showSuccessToast } from '../utils/toastNotifications';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const token = auth.token || auth.userInfo?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchOrder();
    }
  }, [token, id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getOrderById(id);
      setOrder(response.data);
    } catch (error) {
      showErrorToast('Error fetching order');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async () => {
    try {
      const response = await invoiceAPI.generateInvoice(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      showSuccessToast('Invoice downloading...');
    } catch (error) {
      showErrorToast('Error downloading invoice');
    }
  };

  if (loading || !order) return <LoadingSpinner />;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Order #{order._id?.slice(-8)}
              </h1>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <span
                className={`px-4 py-2 rounded-full font-semibold capitalize ${getStatusColor(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
              {order.isPaid && (
                <span className="px-4 py-2 rounded-full font-semibold bg-green-100 text-green-800">
                  Paid
                </span>
              )}
            </div>
          </div>

          {/* Tracking Info */}
          {order.trackingNumber && (
            <div className="bg-purple-50 border border-purple-200 rounded p-3 mb-6">
              <p className="text-sm text-gray-600">Tracking Number</p>
              <p className="font-mono font-bold text-lg">{order.trackingNumber}</p>
            </div>
          )}

          {/* Status Timeline */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Order Status Timeline</h3>
            <div className="space-y-4">
              {order.statusTimeline?.map((timeline, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0
                          ? 'bg-purple-600'
                          : index < order.statusTimeline.length - 1
                          ? 'bg-green-600'
                          : 'bg-blue-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < order.statusTimeline.length - 1 && (
                      <div className="w-1 h-12 bg-gray-300 my-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className="font-semibold text-gray-800 capitalize">
                      {timeline.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(timeline.date).toLocaleString()}
                    </p>
                    {timeline.description && (
                      <p className="text-sm text-gray-500 mt-1">{timeline.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-purple-600" />
              Shipping Address
            </h3>
            <p className="text-gray-600">
              {order.shippingAddress.address}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-purple-600" />
              Payment Method
            </h3>
            <p className="text-gray-600 capitalize">{order.paymentMethod}</p>
            {order.paymentResult?.status && (
              <p className="text-sm text-green-600 mt-2">
                Status: {order.paymentResult.status}
              </p>
            )}
          </div>

          {/* Invoice */}
          {order.isPaid && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Download size={20} className="text-purple-600" />
                Documents
              </h3>
              <button
                onClick={handleDownloadInvoice}
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download Invoice
              </button>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="font-bold text-lg">Order Items</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {order.orderItems?.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span className="font-medium text-gray-800 line-clamp-1">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      ₹{item.price.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{item.qty}</td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="px-6 py-6 border-t bg-gray-50">
            <div className="max-w-xs ml-auto space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">
                  ₹{order.itemsPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold">
                  ₹{order.shippingPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span className="font-semibold">
                  ₹{order.taxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-purple-600">
                  ₹{order.totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
