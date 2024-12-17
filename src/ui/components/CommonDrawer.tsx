/* eslint-disable @typescript-eslint/no-explicit-any */
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { setDrawer } from '../../lib/slice/cartSlice';
import { Drawer_Type } from '../constants/drawer-constants';
import AppointmentComponent from './AppointmentComponent';
import { useState } from 'react';
import CartComponent from './CartComponent';

export default function CommonDrawer() {
    const dispatch = useDispatch();
    const { drawer } = useSelector((store: any) => store.cart);
    const title: any = {
        Cart: <div className='flex gap-2 items-center'>
            <FaCartPlus />  CART
        </div>,
        Appointment: "APPOINTMENT"
    }

    const drawerWidth = "30%";

    const handleClose = () => {
        dispatch(setDrawer({
            open: false,
            type: ""
        }))
    }

    const [formData, setFormData] = useState({
        time: new Date(),
        date: new Date()
    })



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
                            formData={formData}
                            setFormData={setFormData}
                        />
                    }
                </div>
            </Drawer>
        </div >
    );
}