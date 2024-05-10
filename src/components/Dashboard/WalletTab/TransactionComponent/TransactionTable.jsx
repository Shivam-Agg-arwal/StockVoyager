import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionEndpoints } from "../../../../api/api";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../../../slices/profileSlice";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { formatDateWithOffset } from "../../../../utils/dateFormatter";


const TransactionTable = () => {
    const [transactions,setTransactions] = useState([]);

    const {DELETE_TRANSACTION_API}=transactionEndpoints;
    const [page,setPage]=useState(1);
    const pageSize=7;

    const [totalPages,setTotalPages]=useState(0);

    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const deleteTransaction=async(id)=>{
        const loadingToast=toast.loading("Deleting Transaction...");
        try{
            const formData=new FormData();
            formData.append("token",token);
            formData.append("transactionID",id);
            const response=await axios.post(DELETE_TRANSACTION_API,formData);
            if(response.data.success){
                dispatch(setUser(response.data.data));
                localStorage.setItem("user",JSON.stringify(response.data.data));
                toast.success("Transaction Deleted Successfully");
            }
        }
        catch(error){
            console.log("Error occured while deleting the transaction  ",error)
            toast.error("Transaction deletion failed");
        }
        toast.dismiss(loadingToast);
    }

    useEffect(()=>{
        user.transactions.length>0?setTransactions(user.transactions):null;
        setTransactions(prevArray => [...prevArray].reverse());
        setTotalPages(Math.ceil(transactions.length/pageSize));
        console.log((Math.ceil(transactions.length/pageSize)));
    },[user])

    
      

    return (
        <div className="overflow-x-auto my-4">
            <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">

                    {transactions.length>0? transactions.slice((page-1)*pageSize, Math.min(page*pageSize, transactions.length)).map((transaction) => {
                        return (
                            <tr key={transaction.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{transaction.stockSymbol}</div>
                                    <div className="text-xs text-gray-500">{transaction.stockName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.orderType}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.tradeValue}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDateWithOffset(transaction.orderDate)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-red-600 hover:text-red-900 cursor-pointer" onClick={()=>deleteTransaction(transaction._id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    }) : <div> No Transactions made !</div>}
                </tbody>
            </table>
            <div className="flex flex-row gap-2 items-center">
                <MdKeyboardDoubleArrowLeft onClick={()=>setPage(1)}  className="cursor-pointer"/>
                { page!=1 && <MdKeyboardArrowLeft onClick={()=>setPage(page-1)} className="cursor-pointer"/>}
                <div>{page}</div>
                { page!=totalPages && <MdKeyboardArrowRight onClick={()=>setPage(page+1)} className="cursor-pointer"/>}
                <MdKeyboardDoubleArrowRight onClick={()=>setPage(totalPages)} className="cursor-pointer"/>
            </div>
        </div>
    );
};

export default TransactionTable;
