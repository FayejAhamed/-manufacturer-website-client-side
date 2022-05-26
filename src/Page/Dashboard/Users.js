import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import MakeAdmin from './MakeAdmin';

const Users = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://protected-sierra-14862.herokuapp.com/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='mt-14'>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>email</th>
                            <th>Position</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <MakeAdmin
                                key={user._id}
                                user={user}
                                refetch={refetch}
                                index={index}
                            ></MakeAdmin>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;