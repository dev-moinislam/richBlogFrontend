import {FaFacebook,FaInstagram,FaLinkedin,FaTwitterSquare} from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 font-text fixed bottom-0 right-0 left-0">
     { /* ------------------------------ About section ----------------------------- */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-[50%] px-5 md:w-1/4 mb-8 md:mb-0 font-text2">
            <h2 className="text-xl font-bold mb-4 font-logo md:text-2xl">Rich Blog</h2>
            <p className="text-sm">This is a multi author blog website.Where all user can post</p>
          </div>
     { /* ------------------------------ Category section ----------------------------- */}
          <div className="w-[50%] px-5 md:w-1/4 mb-8 md:mb-0 font-text2">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="text-sm">
              <li className='cursor-pointer'>React js</li>
              <li className='cursor-pointer'>Node js</li>
              <li className='cursor-pointer'>Python</li>
            </ul>
          </div>
     { /* ------------------------------ catygory section ----------------------------- */}
          <div className="w-[50%] px-5 md:w-1/4 mb-8 md:mb-0 font-text2">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm">Email: moinislam667@.com</p>
            <p className="text-sm">Phone: +88 016 40-383324</p>
          </div>
     { /* ------------------------------ Social link section ----------------------------- */}
          <div className="w-[50%] px-5 md:w-1/4 mb-8 md:mb-0 font-text2">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex">
              <a href="#" className="mr-4 hover:text-blue-500"><FaFacebook/></a>
              <a href="#" className="mr-4 hover:text-pink-700"><FaInstagram/></a>
              <a href="#" className="mr-4 hover:text-blue-600"><FaLinkedin/></a>
              <a href="#" className="mr-4 hover:text-blue-300"><FaTwitterSquare/></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
