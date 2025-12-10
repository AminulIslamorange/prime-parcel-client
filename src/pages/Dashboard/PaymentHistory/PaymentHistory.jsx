import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const formatDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // user available হলে query run হবে
  });

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Parcel Name</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Payment Status</th>
              <th className="border px-4 py-2">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="border px-4 py-2">{p.parcelName}</td>
                <td className="border px-4 py-2">${p.amount}</td>
                <td className="border px-4 py-2">{p.transactionId}</td>
                <td className="border px-4 py-2">{p.paymentStatus}</td>
                <td className="border px-4 py-2">{formatDate(p.paidAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
