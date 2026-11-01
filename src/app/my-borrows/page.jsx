import React from 'react';

const MyBorrowsPage = async() => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${borrows}`)

    return (
        <div>
            
        </div>
    );
};

export default MyBorrowsPage;