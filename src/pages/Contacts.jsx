import React, { useRef,useState} from 'react'
import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com'

const fadeUp = {
  hidden: { opacity: 0, y: 90 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};


const Contacts = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

      const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true); // start loading
      
        emailjs.sendForm('service_x5pt8im', 'template_gvlvdef', form.current, 'sZUimy8I6Qj_AY-Y4')
          .then((result) => {
            console.log(result.text);
            setLoading(false);
            setSuccess(true);
            form.current.reset();
          }, (error) => {
            console.log(error.text);
            setLoading(false);
          });
      };

    return (
        <div>
 <section
    className='min-h-screen flex flex-col justify-center items-center px-8 md:px-20 py-10 md:py-20 bg-[#333436] text-white'
    >
      <div className=" flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-6 md:gap-10">
        <motion.div
        className='flex-1'
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        >
        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
         Contact <span className='bg-clip-text text-white'>Us</span> 
        </h2>


        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
          <div className='flex-1 space-y-2'>
          <div className='flex items-center gap-4'>
          <div className='p-4 bg-gray-800 rounded-full text-white hover:scale-110 transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'>
          <FaEnvelope size={20}/>
          </div>
          <div>
            <p className='font-semibold'>Email</p>
            <p className='text-gray-400'>yourEmail@gmail.com</p>
          </div>
          </div>

                <div className="flex items-center gap-4">
            <div className="p-4 bg-gray-800 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-110 transition-all duration-200">
              <FaPhone size={20} />
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-400">XXXXXXXXXX</p>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='p-4 bg-gray-800 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-110 transition-all duration-200'>
              <FaMapMarkedAlt size={20}/>
            </div>
            <div>
            <p className='font-semibold'>Location</p>
            <p className='text-gray-400'>Your Location</p>
          </div>
          </div>
        </div>
        </div>
        </motion.div>

      <motion.form ref={form} 
      onSubmit={sendEmail} 
      className='flex-1 bg-[rgba(34,34,34,0.85)] p-6 md:p-8 rounded-xl space-y-4 md:space-y-6 shadow-md mt-6 md:mt-8'
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
     transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
                  >
        <div>          
          <label className='block font-semibold mb-1'>Name</label>
            <input
            type='text'
            name='user_name'
            placeholder='Your Name'
            required
            className='w-full px-4 py-2 bg-[rgba(34,34,34,0.85)] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500'
            />
            </div>


            <div>
          <label className='block font-semibold mb-1'>Email</label>
            <input
            type='email'
            name='user_email'
            placeholder='your.email@example.com'
            required
            className='w-full px-4 py-2 bg-[rgba(34,34,34,0.85)] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500'
            />
            </div>

            <div>
          <label className='block font-semibold mb-1'>Message</label>
       <textarea
        name='message'
        rows="4"
        placeholder='Tell me about your project...'
        required
        className='w-full px-4 py-2 bg-[rgba(34,34,34,0.85)]  border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
       />
            </div>
   <button
  type="submit"
  disabled={loading}
  className="w-full bg-gradient-to-r from-[#ff512f] to-[#dd2476] rounded-lg hover:from-[#dd2476] hover:to-[#ff512f] text-white py-3 font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? 'Sending...' : 'Send Message'}
</button>
{success && <p className='text-green-400 text-sm mt-2'>Message sent Successfully!</p>}

      </motion.form>
        </div>

  <motion.div className="flex justify-center mt-4 md:mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
  >
        <div className=' flex flex-row gap-4 md:gap-6 text-2xl md:text-3xl text-gray-300 '>
          <h3 className='py-2 md:py-4 flex text-lg md:text-2xl font-semibold '>Find me on</h3>
           <div className='p-3 md:p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white hover:scale-110 transition-all duration-200'>
          <a
          href='https://www.linkedin.com/in/rishi-verma-sde/'
          target='_blank'
          rel="noopener noreferrer"
          >
            <FaLinkedin/>
          </a>
          </div>
          <div className='p-3 md:p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white hover:scale-110 transition-all duration-200'>
          <a
          href='/'
          target='_blank'
          rel="noopener noreferrer"
          >
            <FaGithub/>
          </a>
          </div>
        </div>
        </motion.div>
    </section>
        </div>
    )
}



export default Contacts;