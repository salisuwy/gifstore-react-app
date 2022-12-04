import ReactDOM from "react-dom";
import useHttp from "../hooks/use-http";
import { updateFullname, updatePassword } from "../services/http-service";
import constant from "../services/constant";
import { IconSocialHandle, IconUser } from "./icons";
import DismissButton from "./dismiss-button";
import FormInputButton from "./form-input-button";
import useData from "../hooks/use-data";

const UpdateDialog = ({ onClose }) => {
  const { status, error, execute } = useHttp();
  const { user } = useData();

  async function handleFullnameUpdate(e) {
    e.preventDefault();
    const userInput = e.target[0].value.trim();
    if (userInput.length >= 3) {
      await execute(updateFullname, [user.token, userInput], constant.SET_USER);
      e.target[0].value = "";
      e.target[0].classList.add("border-green-800");
    }
  }

  async function handlePasswordUpdate(e) {
    e.preventDefault();
    const userInput = e.target[0].value.trim();
    if (userInput.length >= 6) {
      await execute(updatePassword, [user.token, userInput]);
      e.target[0].value = "";
      e.target[0].classList.add("border-green-800");
    }
  }

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 z-50 w-full overflow-y-auto overflow-x-hidden">
      <div className="relative mx-auto mt-10 h-auto min-w-[375px] max-w-md rounded-lg bg-white shadow">
        <DismissButton onClick={onClose} />

        <div className="px-6 py-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Update your information
          </h3>

          <ul className="my-4 space-y-3">
            <li>
              <span className="flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-600 hover:bg-gray-100">
                <IconSocialHandle cssClasses="h-6 w-6" />
                <span className="ml-3 whitespace-nowrap">{user.email}</span>
              </span>
            </li>
            <li>
              <span className="flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-600 hover:bg-gray-100">
                <IconUser cssClasses="h-6 w-6" />
                <span className="ml-3 whitespace-nowrap">{user.fullname}</span>
              </span>
            </li>
          </ul>

          <div className="my-5">
            <FormInputButton
              type="text"
              placeholder="Update your fullname"
              onSubmit={handleFullnameUpdate}
            />
          </div>
          <div className="my-5">
            <FormInputButton
              type="password"
              placeholder="Update your password"
              onSubmit={handlePasswordUpdate}
            />
          </div>

          <button
            onClick={onClose}
            className="w-full rounded-lg bg-gray-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default UpdateDialog;
