import { Button } from "@/components/ui/button";
import {  ArrowUpRight, ChevronDownIcon, CopyIcon, Diamond, DiamondPlus, Link as LinkIcon, LucideDiamond, Star  } from "lucide-react";
import { BadgeIcon, DiamondIcon, DiscordIcon, PointsIcon, RoleIcon } from "@/assets/Icons";
import Link from "next/link";
import { getUser } from "@/hooks/useAuth";

export default async function Lorekeeper() {
  const user = await getUser();

  const discordAuthUrl = 'https://discord.com/oauth2/authorize?client_id=1320079214606548992&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=email+identify+guilds+guilds.join+gdm.join+connections'

  function convertToDigits(number: number) {
    //convert to 4 digits
    return number.toString().padStart(4, '0');
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* set the background to a s3 url */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://s3-alpha-sig.figma.com/img/bdde/f58c/3a4bb88df9d4ed17c3ce6544b6f5c025?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d7hMFb-nDcfRbyKjtGZkoPictJ~rpKNxp7q8niD4FcP5MFjokYpr~vEcsnDCi3Zp8hVa~DIs5~rpgVcm9YBqS9U7r4AtPu28IuJE4Wmc41WL~g1q6rm0bAGTGLv4tp7lJVAtsRihUu33Rvm47tQGehn42yRQ~LrsKkAFVgHQPGJAmLuxnDl3ZGZd7uPWJeAl-MSaNKGH~dBduDGVWD-dkYbSHE82DZUUuAsVdo-8h0lLHD~lxAt~plderLPG8JdLKzF9PoApE1bCCSHFYCY0cZECI97jKn-ovIqoC0GikNbwD0~Z-mQ1oKJnhz4uxdzF4hgXhkcicoZCTa1KpT8Vtw__)` }}></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-screen max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-left justify-center gap-6">
            <div className="font-extrabold flex items-baseline ">
              <h1 className="text-7xl font-extrabold">{convertToDigits(user?.points || 0)}</h1>
              <h1>/2500</h1>
            </div>
            <div className="font-['Overused_Grotesk'] text-5xl font-normal">
              <h1>{user?.name}</h1>
            </div>

            {/* Badges, Points, Roles */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="bg-[#262626] rounded-full p-[2px] size-[43px]">
                  <BadgeIcon />
                </div>
                <div className="gap-0">
                  <h1 className="text-md font-bold">BADGES</h1>
                  <h1 className="text-sm">{`#${user?.badges?.length || 0}`}</h1>
                </div>
              </div>
              <div className="bg-[#D2D6DB42] border border-[#d2d6db26] h-[26px] w-[1px]"></div>
              <div className="flex items-center justify-between gap-2">
                <div className="bg-[#262626] rounded-full p-[2px] size-[43px]">
                  <PointsIcon />
                </div>
                <div className="gap-0">
                  <h1 className="text-md font-bold">POINTS</h1>
                  <h1 className="text-sm">{`${user?.badges?.length || 0}`}</h1>
                </div>
              </div>
              <div className="bg-[#D2D6DB42] border border-[#d2d6db26] h-[26px] w-[1px]"></div>
              <div className="flex items-center justify-between gap-2">
                <div className="bg-[#262626] rounded-full p-[2px] size-[43px]">
                  <RoleIcon />
                </div>
                <div className="gap-0">
                  <h1 className="text-md font-bold">ROLES</h1>
                  <h1 className="text-sm">{`#${user?.badges?.length || "B.0.0"}`}</h1>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 mt-2">
              <Button className="bg-[#F624211C] border-[3px] border-[#F624214D] rounded-full size-[43px] gap-2 w-fit text-white hover:bg-[#F6242133] max-w-[200px]">
                <DiscordIcon />
                <div className="text-sm font-bold truncate">{user?.discordId ? user?.discordId : "CONNECT"}</div>
                <ChevronDownIcon className="size-4" />
              </Button>
              <div className="flex flex-col items-center">
                <Button className="bg-white text-black border-[3px] border-[#F624215C] rounded-full size-[43px] gap-2 w-fit max-w-[200px]">
                  <CopyIcon className="size-4" />
                  <div className="text-sm font-bold truncate">Invite friends</div>
                  <ArrowUpRight className="size-4" />
                </Button>
                <div className="text-xs mt-1 flex items-center gap-1"><DiamondIcon />earn more points</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
