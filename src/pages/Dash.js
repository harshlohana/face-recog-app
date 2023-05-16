import { useState } from "react";
import axios from "axios";
import FormData from "form-data";

const Dash = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("https://i.pravatar.cc/300");
  const [name, setName] = useState("");

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
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        `https://f2d3-2401-4900-1c16-7dd9-f54c-cfa9-17d1-9957.ngrok-free.app/identify`,
        formData,
        {
          maxBodyLength: Infinity,
        }
      );
      console.log(response.data);
      if (response.data !== "No faces identified") {
        setName(response.data);
      } else {
        alert("Not Recognised");
      }
    } catch (error) {
      alert("Technical Errors");
      console.log(error);
    }
  };

  const thanks = () => {
    alert("Thanks for confirming");
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
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  class="w-10 h-10 mb-3 text-gray-400"
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
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click photo</span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                capture="camera"
                class="hidden"
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
            Identify
          </button>
        </div>
      </div>

      {name ? (
        <div class="w-full max-w-sm bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div class="m20 mt40 flex flex-col items-center pb-10">
            <img
              class="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={previewImage}
              alt="logo"
            />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {name}
            </h5>
            <div class="flex mt-4 space-x-3 md:mt-6">
              <a
                onClick={thanks}
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Yes it's me
              </a>
              <a
                onClick={() => {
                  window.location.href = "/register";
                }}
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Not you ?
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dash;
