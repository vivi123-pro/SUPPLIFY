// pages/Orders.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Badge from '../components/Badge';
import Button from '../components/Button';

const Orders = () => {
  // Fake data for now
  const orders = [
    {
      id: 'ORD-1001',
      item: 'Premium Plastic Scraps - PP',
      quantity: 200,
      unit: 'kg',
      price: 150,
      total: 30000,
      status: 'Pending',
      date: 'Sept 20, 2025',
      seller: 'Prime Manufacturing Ltd',
    },
    {
      id: 'ORD-1002',
      item: 'Aluminum Shavings',
      quantity: 120,
      unit: 'kg',
      price: 500,
      total: 60000,
      status: 'Completed',
      date: 'Sept 15, 2025',
      seller: 'MetalWorks Inc',
    },
    {
      id: 'ORD-1003',
      item: 'Paper Carton Waste',
      quantity: 50,
      unit: 'kg',
      price: 100,
      total: 5000,
      status: 'Cancelled',
      date: 'Sept 10, 2025',
      seller: 'EcoPaper Ltd',
    },
  ];

  // Helper for status badge
  const renderStatus = (status) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'Completed':
        return <Badge variant="success">Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="error">Cancelled</Badge>;
      default:
        return <Badge variant="info">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="My Orders"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Orders' },
          ]}
        />

        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Item</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Qty</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Seller</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Total</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.item}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.quantity} {order.unit}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.seller}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                  <td className="px-6 py-4 text-sm">{renderStatus(order.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold text-right">
                    ₦{order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/orders/${order.id}`}
                      className="inline-flex items-center text-blue-600 hover:underline"
                    >
                      View <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Call to action */}
        <div className="mt-8 flex justify-end">
          <Button variant="primary" asChild>
            <Link to="/waste-marketplace">Place New Order</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
