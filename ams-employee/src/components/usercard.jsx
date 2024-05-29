import React from 'react';

const UserInfoCard = ({ userInfo }) => {
  return (
    <div className="bg-white text-black p-4 mb-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">User Information</h3>
      <div>
        <p className="mb-1">
          <strong>Employee ID:</strong> {userInfo.employeeid}
        </p>
        <p className="mb-1">
          <strong>Name:</strong> {userInfo.name}
        </p>
        <p className="mb-1">
          <strong>Email:</strong> {userInfo.email}
        </p>
        <p className="mb-1">
          <strong>Type:</strong> {userInfo.type}
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;