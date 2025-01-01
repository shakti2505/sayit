import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store"; // Import AppDispatch type
import { deleteGroup, getGroups } from "./groupChatServices";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const GroupChatCard: React.FC = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch(); // Typed dispatch
  const { data } = useSelector(
    (getChatGroup: RootState) => getChatGroup.getChatGroup
  );

  const handleDelete = async (id: string): Promise<void> => {
    const data = await deleteGroup(id);
    if (data.message === "Group Deleted successfully") {
      toast.success(data?.message);
      dispatch(getGroups());
    }
  };

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  return (
    <div className="flex flex-col  items-center justify-center gap-2">
      {data ? (
        data.map((item) => {
          return (
            <React.Fragment key={item.group_id}>
              <div className="flex-1 card font-sans bg-white rounded-lg overflow-hidden w-96 transform transition duration-500 hover:shadow-2xl">
                <div className="p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-montserrat font-bold">
                      {item.name}
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        onClick={() => handleDelete(item._id)}
                        variant="destructive"
                        className="hover:text-gray-200 hover:scale-75 transition-transform duration-300 ease-in-out hover"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="white"
                            d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                          />
                        </svg>
                      </Button>
                      <Button
                        variant="default"
                        className="hover:text-gray-200 hover:scale-75 transition-transform duration-300 ease-in-out hover"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="white"
                            d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6 font-montserrat">
                  <div className="text-black text-xl font-bold mb-2">
                    Advanced 3D Card
                  </div>
                  <div className="text-gray-700 mb-4">
                    This card showcases complex animations and 3D effects using
                    Tailwind CSS. Hover to see the interaction!
                  </div>
                  <a
                    href="#"
                    className="inline-block font-mono text-sm font-bold bg-slate-500 text-white py-2 px-4 rounded-full transition duration-100 transform hover:opacity-75"
                  >
                    Learn More
                  </a>
                </div>
                <div className="p-4 bg-gray-100 text-center">
                  <div className="text-gray-600 font-mono text-sm">
                    © 2024 Your Company
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default GroupChatCard;
