import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IconButton } from "./IconButton";
import { camera } from "@/utils";
import { GoTrash } from "react-icons/go";
import { IoSendOutline } from "react-icons/io5";
import { AlertDialog } from "./AlertDialog";

interface IImagePreview {
  isOpen: boolean;
  setIsOpen: (args: boolean) => void;
  photo: any;
  blob: any;
  width: string;
  height: string;
  setPhoto: (args: any) => void;
  setVideoDimensions: (args: any) => void;
  setIsLoading: (args: boolean) => void;
}

export const CustomDialog = ({
  isOpen,
  setIsOpen,
  photo,
  blob,
  width,
  height,
  setPhoto,
  setVideoDimensions,
  setIsLoading,
}: IImagePreview) => {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const discardPhoto = () => {
    camera.discardPhoto({
      setPhoto,
      setVideoDimensions,
    });
    toggleModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            camera.discardPhoto({ setPhoto, setVideoDimensions });
            toggleModal();
          }}>
          <AlertDialog
            isAlertOpen={isAlertOpen}
            setIsAlertOpen={setIsAlertOpen}
            discardPhoto={discardPhoto}
          />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    {photo && (
                      <img
                        src={photo}
                        alt="Captured"
                        className={`w-${width} h-${height} border-2 border-white rounded-md object-contain animate-pulse`}
                      />
                    )}
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <IconButton
                      icon={<GoTrash className="text-2xl text-white" />}
                      onClick={() => {
                        setIsAlertOpen(true);
                      }}
                      className="w-[50px] h-[50px] bg-red active:scale-110"
                    />
                    <IconButton
                      icon={<IoSendOutline className="text-2xl text-white" />}
                      onClick={() => {
                        toggleModal();
                        camera.downloadPhoto({
                          photo: blob,
                          setPhoto,
                          setIsLoading,
                        });
                      }}
                      className="w-[50px] h-[50px] bg-green/90 active:scale-110 flex justify-center items-center"
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
