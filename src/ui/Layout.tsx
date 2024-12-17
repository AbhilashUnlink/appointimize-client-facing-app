/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {




  return (
    <>
      {children}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        toastOptions={{
          style: {
            backgroundColor: "black",
            color: "white",
          },
        }}
      />
    </>
  );
};

export default Layout;
