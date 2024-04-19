import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Button } from "./Button";
import { camera } from "@/utils";

interface IImagePreview {
  photo: any;
  width: string;
  height: string;
  setPhoto: (args: any) => void;
  setVideoDimensions: (args: any) => void;
}

export const CustomDialog = ({
  photo,
  width,
  height,
  setPhoto,
  setVideoDimensions,
}: IImagePreview) => {
  let [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    {photo && (
                      <img
                        src={photo}
                        alt="Captured"
                        className={`w-${width} h-${height} border-2 border-white rounded-lg object-contain`}
                      />
                    )}
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      onClick={() => {
                        camera.downloadPhoto({ photo });
                        toggleModal();
                      }}
                      disable={!photo}
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-md hover:bg-green/80 bg-green text-white active:scale-110"
                      text="Download Photo"
                    />
                    <Button
                      onClick={() => {
                        camera.discardPhoto({ setPhoto, setVideoDimensions });
                        toggleModal();
                      }}
                      disable={!photo}
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-md active:scale-110"
                      text="Discard"
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
