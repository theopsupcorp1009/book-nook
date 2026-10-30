import React from 'react';

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <div className='bg-white'>
           <div className='container mx-auto text-center'>
            <p className=' text-gray-400 text-[12px] py-5'> © {year} BookNook Digital Library System. All rights reserved.</p>
           </div>
        </div>
    );
};

export default Footer;