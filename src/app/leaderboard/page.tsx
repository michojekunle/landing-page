/* eslint-disable @next/next/no-img-element */
import { StarIcon } from "@/assets/Icons";
import React from "react";

function Leaderboard() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://s3-alpha-sig.figma.com/img/bdde/f58c/3a4bb88df9d4ed17c3ce6544b6f5c025?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d7hMFb-nDcfRbyKjtGZkoPictJ~rpKNxp7q8niD4FcP5MFjokYpr~vEcsnDCi3Zp8hVa~DIs5~rpgVcm9YBqS9U7r4AtPu28IuJE4Wmc41WL~g1q6rm0bAGTGLv4tp7lJVAtsRihUu33Rvm47tQGehn42yRQ~LrsKkAFVgHQPGJAmLuxnDl3ZGZd7uPWJeAl-MSaNKGH~dBduDGVWD-dkYbSHE82DZUUuAsVdo-8h0lLHD~lxAt~plderLPG8JdLKzF9PoApE1bCCSHFYCY0cZECI97jKn-ovIqoC0GikNbwD0~Z-mQ1oKJnhz4uxdzF4hgXhkcicoZCTa1KpT8Vtw__)`,
        }}
      ></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-screen max-w-6xl mx-auto px-4 text-white">
        <p className="mb-[1.5%] text-[40px] font-gourd">Leaderboard</p>
        <div className="bg-[#FFFFFF0D] h-[70%] w-[95%] p-[10px] lg:p-[20px]">
          <div className="flex items-center border-b-[2px] border-white justify-between p-[10px] mt-[20px] bg-[#FFFFFF0D]">
            <div className="flex items-center space-x-[10px]">
              <div className="h-[40px] lg:h-[60px] w-[40px] lg:w-[60px] rounded-full border border-white overflow-hidden">
                <img src="./warior.svg" alt="" />
              </div>
              <div>
                <p className="text-[14px] lg:text-[16px] uppercase">supercontractor.eth</p>
                <div className="flex items-center space-x-[3px]">
                    <StarIcon/>
                  <p className="text-[13px] lg:text-[16px]">250</p>
                </div>
              </div>
            </div>
            <p className="font-[900] text-[18px] lg:text-[36px] font">0008</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
