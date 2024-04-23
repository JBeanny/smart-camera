import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "./Button";

interface IAlertDialog {
  isAlertOpen: boolean;
  setIsAlertOpen: (args: boolean) => void;
  discardPhoto: () => void;
}

export const AlertDialog = ({
  isAlertOpen,
  setIsAlertOpen,
  discardPhoto,
}: IAlertDialog) => {
  const closeModal = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      <Transition appear show={isAlertOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-[90%] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all shadow-zinc absolute border border-zinc">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    Are you sure to discard ?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Once you discard the photo, it can not be recovered.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2 justify-end">
                    <Button
                      text="Cancel"
                      className="inline-flex justify-center rounded-md border border-zinc px-4 py-2 text-sm font-medium bg-transparent text-zinc"
                      onClick={closeModal}
                    />
                    <Button
                      text="Yes, Sure !"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-red text-white"
                      onClick={() => {
                        discardPhoto();
                        closeModal();
                      }}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
