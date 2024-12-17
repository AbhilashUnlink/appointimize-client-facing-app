/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { setDrawer } from "../../lib/slice/cartSlice";
import { Drawer_Type } from "../constants/drawer-constants";
import { FaRocket } from "react-icons/fa";
import useSound from "use-sound";
import popsound from "../../assets/sound/pop.mp3";

const CartComponent = () => {
    const { items, cartCount } = useSelector((store: any) => store.cart);
    const dispatch = useDispatch();
    const [playOn] = useSound(popsound, {
        volume: 0.25,
    });

    if (cartCount === 0) {
        return (
            <div className="p-10 flex flex-col items-center empty-message">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <button className="shop-now-button"
                    onClick={() => dispatch(setDrawer({ open: false }))}
                >Shop Now</button>
            </div>
        );
    } else {
        return (
            <div className="flex-col p-5">
                {/* Cart Items */}
                {items?.map((item: any, index: number) => (
                    <CartItem key={index} service={item} />
                ))}

                {/* Cart Total */}
                <div className="mt-4">
                    <p className="text-gray-700 font-bold text-lg text-right">
                        CART TOTAL : <span className="text-black">
                            ₹ {items?.reduce((a: any, b: any) => a + Number(b.price), 0)}
                        </span>
                    </p>
                </div>

                {/* Separator */}
                <hr className="my-4" />

                {/* Proceed Button */}
                <div className="pl-2">
                    <button
                        onClick={() => {
                            playOn();
                            dispatch(setDrawer({ open: true, type: Drawer_Type.Appointment }));
                        }}
                        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 active:scale-95 flex items-center justify-center gap-2"
                    >
                        <FaRocket className="text-lg transition-transform duration-200 ease-in-out transform hover:rotate-12" />
                        PROCEED
                    </button>
                </div>
            </div>

        );
    }
};
export default CartComponent;
