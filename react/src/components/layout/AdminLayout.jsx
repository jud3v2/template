import React from 'react';
import Header from '../admin/Header.jsx';
import Footer from '../admin/Footer';
import SideBar from '../admin/SideBar';

export default function ClientLayout({ Component, props }) {
    return (
        <div className='grid grid-cols-2 gap-3'>
            <div>
                <SideBar />
            </div>
            <div>
                <Header />
                <Component {...props} />
                <Footer />
            </div>
        </div>
    );
};