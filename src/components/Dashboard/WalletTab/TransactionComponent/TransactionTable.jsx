import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transactionEndpoints } from "../../../../api/api";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../../../slices/profileSlice";

const TransactionTable = () => {
    const [transactions,setTransactions] = useState([
        {
            id: 1,
            stockSymbol: "AAPL",
            stockName: "Apple Inc.",
            orderType: "Buy",
            quantity: 100,
            price: 150.25,
            tradeValue: 15025,
            orderDate: "2024-04-25",
        },
        {
            id: 2,
            stockSymbol: "GOOG",
            stockName: "Alphabet Inc.",
            orderType: "Sell",
            quantity: 50,
            price: 2750.75,
            tradeValue: 137537.5,
            orderDate: "2024-04-26",
        },
        {
            id: 3,
            stockSymbol: "MSFT",
            stockName: "Microsoft Corporation",
            orderType: "Buy",
            quantity: 75,
            price: 300.5,
            tradeValue: 22537.5,
            orderDate: "2024-04-27",
        },
        {
            id: 4,
            stockSymbol: "TSLA",
            stockName: "Tesla, Inc.",
            orderType: "Sell",
            quantity: 25,
            price: 850.75,
            tradeValue: 21268.75,
            orderDate: "2024-04-28",
        },
        {
            id: 5,
            stockSymbol: "AMZN",
            stockName: "Amazon.com, Inc.",
            orderType: "Buy",
            quantity: 150,
            price: 3300.25,
            tradeValue: 495037.5,
            orderDate: "2024-04-29",
        },
        // Add more entries as needed
    ]);

    const {DELETE_TRANSACTION_API}=transactionEndpoints;

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
                    {transactions.map((transaction) => {
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
                                <td className="px-6 py-4 whitespace-nowrap">{transaction.orderDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-red-600 hover:text-red-900 cursor-pointer" onClick={()=>deleteTransaction(transaction._id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
