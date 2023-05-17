import { useState } from "react";
import axios from "axios";
import FormData from "form-data";

const Dash = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [thankyou, setThankyou] = useState("");

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handlerSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        `https://5298-2401-4900-1c16-7dd9-a59e-7b0f-cdfe-d074.ngrok-free.app/identify`,
        formData,
        {
          maxBodyLength: Infinity,
        }
      );
      console.log(response.data);
      if (response.data !== "No faces identified") {
        setTimeout(() => {
          setName(response.data);
          setLoading(false);
        }, 3000);
      } else {
        alert("Not Recognised");
        setLoading(false);
      }
    } catch (error) {
      alert("Technical Errors");
      setLoading(false);
      console.log(error);
    }
  };

  const thanks = () => {
    //alert("Thanks for confirming");
    setThankyou("Thanks for confirmation !");
  };

  return (
    <div className="flex-column justify-center mt-8">
      <div
        className="m20 flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">
            To ensure the best accuracy and results, we kindly request you to
            upload or click a clear photo with good lighting.
          </span>
        </div>
      </div>
      <div className="max-w-2xl rounded-lg">
        <div className="m20">
          <label className="inline-block mb-2 text-gray-500">
            Mark Attendence
          </label>
          <div className="flex items-center justify-center w-full"></div>
          <div className="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {previewImage == "" ? (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click photo</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img className="obfit" src={previewImage} />
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                capture="camera"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center m20">
          <button
            className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
            onClick={handlerSubmit}
            disabled={selectedFile == null ? true : false}
          >
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
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
                Loading...
              </>
            ) : (
              "Identify"
            )}
          </button>
        </div>
      </div>

      {name ? (
        <div className="w-full max-w-sm bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="m20 mt40 flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg obfit"
              src={previewImage}
              alt="logo"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {name}
            </h5>
            {thankyou == "" ? (
              <div className="flex mt-4 space-x-3 md:mt-6">
                <a
                  onClick={thanks}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Yes it's me
                </a>
                <a
                  onClick={() => {
                    window.location.href = "/register";
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                  Not you ?
                </a>
              </div>
            ) : (
              thankyou
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dash;
