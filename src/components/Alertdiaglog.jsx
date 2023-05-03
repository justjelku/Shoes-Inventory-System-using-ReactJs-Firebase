import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

function AlertDialog({ isOpen, title, message, onClose }) {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="fixed bottom-0 left-0 right-0 inline-block align-middle p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-t-2xl">
            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{message}</p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                onClick={onClose}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </Dialog>

    </Transition>
  );
}

export default AlertDialog;
