import { motion } from 'framer-motion'
import { asset } from '../../lib/assets'

export function ProfileImage() {
    return (
        <motion.div
            className="flex-shrink-0 flex justify-center items-center max-md:order-first"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4, duration: 1, ease: 'easeOut' }}
        >
            <img
                src={asset('img.JPG')}
                alt="Adrian Eddy"
                className="w-[280px] h-[350px] rounded-lg object-cover animate-profile-glow lg:w-[350px] lg:h-[440px] max-md:w-[200px] max-md:h-[250px] max-sm:w-[100px] max-sm:h-[100px] max-sm:rounded-full max-xs:w-[80px] max-xs:h-[80px]"
                style={{ animationDelay: '6s' }}
            />
        </motion.div>
    )
}
