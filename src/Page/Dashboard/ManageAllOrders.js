import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';

const ManageAllOrders = () => {
    const [items, setItems] = useState([])
    const { data: products, isLoading, refetch } = useQuery('users', () => fetch('https://protected-sierra-14862.herokuapp.com/orders',).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }

    const deleteItem = (props) => {
        // console.log(props)
      
            fetch(`https://protected-sierra-14862.herokuapp.com/orders/${props}`, {
                method: 'Delete',
            })
                .then(response => response.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaing = items.filter(itme => itme._id !== props)
                        setItems(remaing);
                        refetch();
                    }
                })
        
    }

    return (
        <div className='mt-14'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => <tr key={product._id}>



                                <th>{index + 1}</th>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>
                                    <label htmlFor="my-modal-3" className="btn modal-button btn-xs bg-red-500 border-0 px-5">Delete</label>

                                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                                    <div className="modal">
                                        <div className="modal-box relative">
                                            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">???</label>
                                            <h3 className="text-lg font-bold">Are sure You want to delete the order?</h3>
                                          <button onClick={() => deleteItem(product._id)} className="btn border-0 my-6 text-white bg-red-500 btn-xs"><span >Remove user</span> </button>
                                        </div>
                                    </div>

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAllOrders;