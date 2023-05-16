import { useState } from "react";
import axios from "axios";
import FormData from "form-data";

const Register = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("https://i.pravatar.cc/300");
  const [name, setName] = useState("");

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleClickEvent = (event) => {
    document.getElementById("fileInput").click();
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", selectedFile);
    formData.append("name", name);

    try {
      const response = await axios.post(
        `https://f2d3-2401-4900-1c16-7dd9-f54c-cfa9-17d1-9957.ngrok-free.app/register`,
        formData,
        {
          maxBodyLength: Infinity,
        }
      );
      console.log(response.data);
      if (response.data == "Encodings saved successfully.") {
        alert("Registeration Successfull !");
        window.location.href = "/login";
      } else {
        alert("Registeration Failed");
      }
    } catch (error) {
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
                Register
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
