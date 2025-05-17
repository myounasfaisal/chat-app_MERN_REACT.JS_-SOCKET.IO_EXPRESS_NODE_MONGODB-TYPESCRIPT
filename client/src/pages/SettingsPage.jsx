import React from 'react'
import { useAuthStore } from '../store/Auth/useAuthStore';

const SettingsPage = () => {
  const{authUser,isCheckingAuth}=useAuthStore();
  if (!authUser && isCheckingAuth)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div>SettingsPage</div>
  )
}

export default SettingsPage