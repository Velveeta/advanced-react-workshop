import React from 'react';

const UserProfileData = ({ address, email, name, phone }) => (
  <React.Fragment>
    <div>Name: {name}</div>
    <div>Address: {address}</div>
    <div>Phone: {phone}</div>
    <div>Email: {email}</div>
  </React.Fragment>
);

export default UserProfileData;
