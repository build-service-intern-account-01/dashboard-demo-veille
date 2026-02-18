import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Modal from '../shared/Modal';
import Toast from '../shared/Toast';

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden relative z-10">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Outlet />
      </div>
      <Modal />
      <Toast />
    </div>
  );
}
