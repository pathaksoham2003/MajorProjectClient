import React from 'react'
import { GucciPerfume, IphoneImage, PSFive } from '../../images'

const PromoElec = () => {
  return (
    <div className="flex sm:flex-row flex-col mt-5">
          <div className="sm:w-1/2 md:w-2/3 object-contain mb-2 mx-2 h-[221px] sm:h-[450px] rounded-2xl overflow-hidden relative">
            <img
              className="sm:object-center object-right object-fit sm:object-cover w-full h-full"
              src={IphoneImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(220,154,255,0.33)] via-[#ffffff00] to-[#ffffff00]"></div>
            <div className="absolute top-6 sm:top-20 left-6 md:left-10">
              <h2 className="text-white font-bold md:text-5xl sm:text-4xl text-3xl md:my-4 my-2">
                iPhone 14 <br className="sm:hidden block"/>Series
              </h2>
              <h2 className="text-white text-wrap sm:text-2xl md:text-3xl sm:my-2">
                Upto 10% off
                <br /> on specific vouchers
              </h2>
              <h2 className="text-white text-wrap sm:text-2xl md:text-2xl underline underline-offset-4 md:mt-8 my-2">Shop now</h2>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 flex h-[450px] flex-col">
            <div className="relative object-contain mx-2 mb-1 h-1/2 rounded-2xl overflow-hidden">
              <img
                className="object-center object-fit sm:object-cover w-full h-full"
                src={PSFive}
              />
              <div className="absolute top-10 left-6">
                <h2 className="text-white font-bold text-3xl sm:flex my-2">
                  PlayStation 5
                </h2>
                <h2 className="text-white text-wrap sm:flex my-2">
                  Black and White version
                  <br /> of the PS5 coming out on sale.
                </h2>
              </div>
            </div>
            <div className="relative object-contain mx-2 mt-1 h-1/2 rounded-2xl overflow-hidden">
              <img
                className="object-center object-fit sm:object-cover w-full h-full"
                src={GucciPerfume}
              />
              <div className="absolute top-10 left-6">
                <h2 className="text-white font-bold text-3xl sm:flex my-2">
                  Perfumes
                </h2>
                <h2 className="text-white text-wrap sm:flex my-2">
                  Gucci intense oud edp <br />
                  an all time favorite for parties.
                </h2>
              </div>
            </div>
          </div>
        </div>
  )
}

export default PromoElec