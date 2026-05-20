import { asset } from '../../lib/assets'

// Editorial pass:
//   - Removed `animate-profile-glow`. The old version cycled through cyan,
//     yellow, green, and purple drop-shadows on a 3-second loop. That's the
//     opposite of editorial restraint — the photo announces itself constantly.
//   - Removed the framer-motion entry animation (scale 0.9 -> 1 with a 4s
//     delay). The photo is just there when the page loads. No pageant.
//   - `rounded-lg` -> `rounded-sm` for crisper, less cuddly corners.
//
// What's left: a photo. That's the goal.
export function ProfileImage() {
    return (
        <div className="flex-shrink-0 flex justify-center items-center max-md:order-first">
            <img
                src={asset('img.JPG')}
                alt="Adrian Eddy"
                className="w-[280px] h-[350px] rounded-sm object-cover lg:w-[350px] lg:h-[440px] max-md:w-[200px] max-md:h-[250px] max-sm:w-[100px] max-sm:h-[100px] max-sm:rounded-full max-xs:w-[80px] max-xs:h-[80px]"
            />
        </div>
    )
}
