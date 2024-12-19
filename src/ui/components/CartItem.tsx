import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../lib/slice/cartSlice";
import toast from "react-hot-toast";
import useSound from "use-sound";
import popsound from "../../assets/sound/pop.mp3";

interface CartItemProps {
    service: {
        id: string;
        title: string;
        price: number;
    };
}

const CartItem = ({ service }: CartItemProps) => {
    const { id, title, price } = service;
    const dispatch = useDispatch();
    const [playOn] = useSound(popsound, { volume: 0.25 });

    const handleDelete = () => {
        toast.success("Item removed!");
        dispatch(removeItemFromCart(id));
        playOn();
    };

    return (
        <div className="cart-item flex justify-between items-center mb-2 gap-y-6 p-4 bg-white rounded-2xl">
            {/* Service Information */}
            <div className="flex  gap-3">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-500 uppercase leading-none">
                        {title.charAt(0)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <h4 className="text-xl font-200 text-gray-800">{title}</h4>
                    <p className="text-xl text-gray-600 mt-1 relative"><span className="text-sm text-gray-500 absolute top-1">₹</span>
                    <span className="absolute left-3">
                    {price.toLocaleString()}
                                </span> 
</p>
                </div>
            </div>
            <button
                aria-label="Remove item"
                onClick={handleDelete}
                className="text-gray-800 mb-5 hover:text-gray-600 transition-colors duration-200"
            >
                <RxCross2 size={20} />
            </button>
        </div>
    );
};

export default CartItem;
