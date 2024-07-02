import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { symbolMapping } from "../../../data/Symbol";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { stockOperationsEndpoints } from "../../../api/api";
import { setUser } from "../../slices/profileSlice";

export default function BuyingModal({ stockData, setbuyingmodal }) {
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [tradeValue, setTradeValue] = useState(0);

    const company = symbolMapping.find(
        (stock) => stock.SYMBOL === stockData.symbol
    );
    const companyName = company ? company.COMPANY_NAME : "";

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const walletAmt = user.walletBalance;
    const maxQuantity = Math.floor(walletAmt / stockData.current_price);
    const dispatch=useDispatch();

    const quantity = watch("quantity");

    const { BUY_STOCK_API } = stockOperationsEndpoints;

    useEffect(() => {
        if (quantity) {
            setTradeValue(stockData.current_price * quantity);
        } else {
            setTradeValue(0);
        }
    }, [quantity, stockData.current_price]);

    const submitHandler = async(data) => {
        try {
            const formdata = new FormData();
            formdata.append("symbol", stockData.symbol);
            formdata.append("cprice", stockData.current_price);
            formdata.append("quantity", data.quantity);
            formdata.append("token", token);
            console.log([...formdata]);

            const response=await axios.post(BUY_STOCK_API,formdata);
            console.log(response);
            if(response.data.success){
                toast.success(response.data.toastMessage);
                console.log(response.data.data);
                dispatch(setUser(response.data.data))
                localStorage.setItem('StockVoyager_user', JSON.stringify(response.data.data));
                setbuyingmodal(null);
            }   
        }
        catch (error) {
			if (error.response && error.response.data && error.response.data.toastMessage) {
				toast.error(error.response.data.toastMessage);
			} else {
				toast.error("Stock Buying failed");
			}
		}
    };

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] rounded-lg border  p-6">
                <h1>BUY {companyName}</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div>
                        <label htmlFor="currentPrice">Current Price</label>
                        <input
                            type="number"
                            id="currentPrice"
                            name="currentPrice"
                            {...register("currentPrice")}
                            value={stockData.current_price}
                            disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min={1}
                            max={maxQuantity}
                            {...register("quantity", {
                                required: true,
                                min: 1,
                                max: maxQuantity,
                            })}
                        />
                        {errors.quantity && <span>Enter a valid quantity</span>}
                    </div>
                    <div>
                        <div>
                            Trade Amount : <span>{tradeValue}</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            Wallet : <span>{walletAmt}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setbuyingmodal(null);
                        }}
                    >
                        Cancel
                    </button>
                    <button type="submit">Confirm Order</button>
                </form>
            </div>
        </div>
    );
}
