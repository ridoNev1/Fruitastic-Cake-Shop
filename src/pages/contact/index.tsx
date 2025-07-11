import { useState } from "react";
import type { ChangeEvent } from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  interface SubmitEvent {
    preventDefault: () => void;
  }

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log("Data Formulir:", formData);
    alert("Terima kasih! Pesan Anda telah kami terima.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen antialiased">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-[#3d4b2f] p-8 md:p-12 text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Hubungi Kami
              </h2>
              <p className="mb-8 text-gray-300">
                Punya pertanyaan atau ingin bekerja sama? Jangan ragu untuk
                menghubungi kami.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <HiOutlineLocationMarker className="h-6 w-6 mt-1 text-white flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Alamat Kantor</h3>
                    <p className="text-gray-300">
                      Jl. Jend. Sudirman No. 52-53, Jakarta
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <HiOutlinePhone className="h-6 w-6 mt-1 text-white flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Telepon</h3>
                    <p className="text-gray-300">+62 813-8334-4477</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <HiOutlineMail className="h-6 w-6 mt-1 text-white flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-300">hello@fruitastic.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-semibold mb-4">Temukan kami di Peta</h3>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.242962254336!2d106.80434431535694!3d-6.231572995489112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f138a5313a35%3A0x4a535b0b93405f6d!2sGelora%20Bung%20Karno%20Main%20Stadium!5e0!3m2!1sen!2sid!4v1673854817163!5m2!1sen!2sid"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
                Kirim Pesan
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="johndoe@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Contoh: Penawaran Kerja Sama"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Pesan Anda
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Tuliskan pesan Anda di sini..."
                  ></textarea>
                </div>
                <div>
                  <button
                    className="px-8 py-4 bg-[#3d4b2f] text-white rounded-md text-base font-semibold cursor-pointer transition-all duration-300"
                    type="submit"
                  >
                    Kirim Pesan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h3 className="text-gray-600 font-semibold mb-4">Ikuti Kami</h3>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-700 transition"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-400 transition"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-pink-600 transition"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
