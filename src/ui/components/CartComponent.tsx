/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { setDrawer } from "../../lib/slice/cartSlice";
import { Drawer_Type } from "../constants/drawer-constants";
// import { FaRocket } from "react-icons/fa";
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
            <div className="p-12 flex flex-col items-center justify-center">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
                    <p className="text-lg text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                </div>
                <button
                    className="bg-purple-600 text-white py-1.5 px-4 rounded-md text-md hover:bg-blue-700 transition-colors duration-300"
                    onClick={() => dispatch(setDrawer({ open: false }))}
                >
                    Shop Now
                </button>
            </div>

        );
    } else {
        return (
            <div className="flex-col p-5 cart-item-wrap">
                {/* Cart Items */}
                {items?.map((item: any, index: number) => (
                    <CartItem key={index} service={item} />
                ))}



                {/* Separator */}
                <hr className="my-4" />
                {/* Cart Total */}
                <div className="absolute bottom-16 left-4 right-4 flex justify-between items-center">
                    <p className="text-gray-700 font-normal text-lg">SUBTOTAL:</p>
                    <p className="text-black font-semibold text-lg">
                        ₹ {items?.reduce((a: any, b: any) => a + Number(b.price), 0)}
                    </p>
                </div>

                <div className="pl-2">
                    <button
                        onClick={() => {
                            playOn();
                            dispatch(setDrawer({ open: true, type: Drawer_Type.Appointment }));
                        }}
                        className="checkout-btn italic absolute bottom-3 left-2 border border-gray-800 py-2 px-6 bg-white text-black flex items-center justify-between group hover:bg-black hover:text-white transition duration-300"
                    >
                        PROCEED WITH BOOKING
                        <span className="inline-flex items-center ">
                            <span className="text-xl leading-none">→</span>
                        </span>


                    </button>

                </div>
            </div>

        );
    }
};
export default CartComponent;
