import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const formatDate=(iso)=>new Date(iso).toLocaleString();

const PaymentHistory = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();

    const {isPending,data:payments=[]}=useQuery({
        queryKey:['payments',user.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        }
    })
    if(isPending){
        return '...Loading'

}


    return (
        <div>
            
        </div>
    );
};

export default PaymentHistory;