import { useState } from "react";
import axios from "axios";
import FormData from "form-data";

const Register = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("https://i.pravatar.cc/300");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleClickEvent = (event) => {
    document.getElementById("fileInput").click();
  };

  const handlerSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(selectedFile);
    const formData = new FormData();
    formData.append("images", selectedFile);
    formData.append("name", name);

    try {
      const response = await axios.post(
        `https://5298-2401-4900-1c16-7dd9-a59e-7b0f-cdfe-d074.ngrok-free.app/register`,
        formData,
        {
          maxBodyLength: Infinity,
        }
      );
      console.log(response.data);
      if (response.data == "Encodings saved successfully.") {
        setTimeout(() => {
          alert("Registeration Successfull !");
          setLoading(false);
          window.location.href = "/login";
        }, 3000);
      } else {
        setLoading(false);
        alert("Registeration Failed");
      }
    } catch (error) {
      setLoading(false);
      alert("Technical Errors");
      console.log(error);
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900 flex flex-group wh">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/register"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Face Recog App
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white txt-c">
              Register your face
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div class="w-full max-w-sm bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <div class="flex flex-col items-center">
                  <img
                    class="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={previewImage}
                    alt="logo"
                    onClick={handleClickEvent}
                  />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    capture="camera"
                    Id={"fileInput"}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required=""
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <button
                class="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800"
                style={{ background: "#4055ff" }}
                onClick={handlerSubmit}
              >
                {loading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already Registered ?{" "}
                <a
                  href="/login"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login & Indentify here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
