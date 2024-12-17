/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdDeleteOutline } from "react-icons/md";
import "./cart-item-styles.css";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../lib/slice/cartSlice";
import toast from "react-hot-toast";
import useSound from "use-sound";
import popsound from "../../assets/sound/pop.mp3";

const CartItem = ({ service }: any) => {
    const { id, title, price
    } = service;
    const dispatch = useDispatch();

    const [playOn] = useSound(popsound, {
        volume: 0.25,
    });


    return (
        <div className="service-card p-4 border rounded-lg shadow-md">
            <div className="service-card-header flex justify-between items-center">
                {/* Title and Price */}
                <div>
                    <h3 className="text-xl font-medium">{title}</h3>
                    <span className="text-lg text-gray-700">₹ {price}</span>
                </div>

                {/* Delete Icon */}
                <span
                    className="text-red-400 cursor-pointer hover:text-red-700 transition-colors duration-200"
                    onClick={() => {
                        toast.success('Deleted Successfully!');
                        dispatch(removeItemFromCart(id));
                        playOn()
                    }}
                >
                    <MdDeleteOutline size={24} />
                </span>
            </div>
        </div>

    );
};

export default CartItem;