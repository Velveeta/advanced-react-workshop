import React from 'react';

import UserAvatar from './user-avatar';
import UserProfileData from './user-profile-data';

import './user-profile.css';

const UserProfile = ({ address, email, name, phone }) => (
  <div className="d-flex justify-content-around user-profile">
    <div>
      <UserAvatar />
    </div>
    <div>
      <UserProfileData address={address} email={email} name={name} phone={phone} />
    </div>
  </div>
);

export default UserProfile;
