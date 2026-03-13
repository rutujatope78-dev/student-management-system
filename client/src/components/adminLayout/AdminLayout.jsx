import React from 'react';
import AdminHeader from './AdminHeader';
import { Outlet } from 'react-router-dom';
import AdminFooter from './AdminFooter';

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            {/* Header */}
            <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
                <AdminHeader />
            </div>

            {/* Page Content */}
            <div style={{ flex: 1, paddingTop: '75px', paddingBottom: '60px' }}>
                <Outlet />
            </div>

            {/* Footer */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 100,
                backgroundColor: 'black',
                color: 'white'
            }}>
                <AdminFooter />
            </div>

        </div>
    );
};

export default AdminLayout;