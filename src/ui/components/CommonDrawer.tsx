/* eslint-disable @typescript-eslint/no-explicit-any */
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { BsCart2 } from "react-icons/bs";
import { setDrawer } from '../../lib/slice/cartSlice';
import { Drawer_Type } from '../constants/drawer-constants';
import AppointmentComponent from './AppointmentComponent';
import CartComponent from './CartComponent';
import "../../ui/components/cart-item-styles.css";

export default function CommonDrawer() {
    const dispatch = useDispatch();
    const { drawer } = useSelector((store: any) => store.cart);
    const title: any = {
        Cart: (
            <div className='flex gap-3 items-center text-lg font-semibold text-gray-800'>
                <BsCart2 size={25} className="text-black-800" />
                <span className="text-xl text-gray-900">CART</span>
            </div>
        ),
        Appointment: "APPOINTMENT"
    }

    const drawerWidth = "30%";

    const handleClose = () => {
        dispatch(setDrawer({
            open: false,
            type: ""
        }))
    }

  



    return (
        <div>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                    '@media (max-width: 768px)': {
                        '& .MuiDrawer-paper': {
                            width: '100%', // For mobile devices
                        },
                    }
                }}
                anchor={"right"}
                open={drawer.open || false}
                onClose={handleClose}
            >

                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", height: "8vh", paddingLeft: "10px", paddingRight: "10px" }}>
                    <span style={{ fontWeight: "600", fontSize: "1.2rem" }}>
                        {title[drawer.type]}
                    </span>

                    <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />

                </div>
                <hr />
                <div>
                    {
                        drawer.type === Drawer_Type.Cart &&
                        <CartComponent />
                    }
                    {
                        drawer.type === Drawer_Type.Appointment &&
                        <AppointmentComponent
                        />
                    }
                </div>
            </Drawer>
        </div >
    );
}