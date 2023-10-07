import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
export default function notify(type, message) {
  console.log('click');
  let windowWidth = window.innerWidth;
  if (type === 'success') {
    toast.success(message, {
      position: windowWidth >= 320 && windowWidth <= 480 ? 'bottom-right' : 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      icon: false,
    });
  } else if (type === 'warn') {
    toast.warn(message, {
      position: windowWidth >= 320 && windowWidth <= 480 ? 'bottom-right' : 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      icon: false,
    });
  } else if (type === 'error') {
    toast.error(message, {
      position: windowWidth >= 320 && windowWidth <= 480 ? 'bottom-right' : 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      icon: false,
    });
  }
}
