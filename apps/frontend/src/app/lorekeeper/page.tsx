/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {  ArrowUpRight, ChevronDownIcon, CopyIcon, Diamond, DiamondPlus, Link as LinkIcon, LogOut, LucideDiamond, Star  } from "lucide-react";
import { BadgeIcon,  DiamondIcon, DiscordIcon, PointsIcon, RoleIcon } from "@/assets/Icons";
import { getUser, logout } from "@/hooks/useAuth";
import Link from "next/link";
import { Popover, PopoverTrigger , PopoverContent } from "@/components/ui/popover";
import { NavMenu } from "@/components/nav-menu";

export default async function Lorekeeper({ searchParams }: { searchParams: {error: string}}) {
  
  const error = searchParams?.error ?? null
  
  const user = await getUser();

  const discordAuthUrl = 'https://discord.com/oauth2/authorize?client_id=1320079214606548992&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+email'

  function convertToDigits(number: number) {
    //convert to 4 digits
    return number.toString().padStart(4, '0');
  }


  const badges = [
    {
      name: "Rifters@Nani",
      src: "./amblems/nani.svg",
    },
    {
      name: "Mod",
      src: "./amblems/mode.svg",
    },
    {
      name: "Lorekeeper B.0.0",
      src: "./amblems/lorekeeperB.svg",
    },
    // {
    //   name: "seeAll",
    //   src: "./amblems/seeAll.svg",
    // },
    {
      name: "LoreKeeper C.0.0",
      src: "./amblems/lorekeeperC.svg",
    },
    {
      name: "LoreKeeper D.0.0",
      src: "./amblems/lorekeeperD.svg",
    },
    {
      name: "OG Rifters",
      src: "./amblems/og.svg",
    },
  ];

  const disabledBadges = [
    {
      name: "Rifters@Nani",
      src: "./white-amblems/nani.svg",
    },
    {
      name: "Rifters@Polymer",
      src: "./white-amblems/polymers.svg",
    },
    {
      name: "socket",
      src: "./white-amblems/socket.svg",
    },
    {
      name: "LoreKeeper A.0.0",
      src: "./white-amblems/lorekeeperA.svg",
    },
    {
      name: "Lorekeeper B.0.0",
      src: "./white-amblems/lorekeeperB.svg",
    },
    {
      name: "Rifters@Moonplay",
      src: "./white-amblems/moonplay.svg",
    },
    {
      name: "LoreKeeper C.0.0",
      src: "./white-amblems/lorekeeperC.svg",
    },
    {
      name: "LoreKeeper D.0.0",
      src: "./white-amblems/lorekeeperD.svg",
    },
    {
      name: "Mod",
      src: "./white-amblems/mode.svg",
    },
    {
      name: "OG Rifters",
      src: "./white-amblems/og.svg",
    }
  ];

  return (
    <div className="text-white bg-black overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('./lorekeeper/lorekeeper_bg.png')`,
          backgroundAttachment: 'fixed',
          minHeight: '100vh'
        }}
      ></div>
      <header className="absolute fixed top-0 left-0 w-full z-50">
        <NavMenu />
      </header>
      <div className="relative">
       
        <div className="mx-auto z-10  w-full lg:w-[85%]  border-white">
        {error === "guild_not_found" && <div className="text-white font-bold p-4 mx-auto gap-2 text-center w-fit bg-red-500 rounded-lg">Join Riflend on Discord <Link href="https://guild.xyz/riftlend" target="_blank" className="text-white font-bold underline">here</Link> to continue</div>}
          <div className="pt-6 px-10 flex flex-col-reverse lg:flex-row items-center justify-between w-full">
            
            <div className=" flex z-10 flex-col items-left justify-center lg:gap-6 pl-4">
              { user && 
              <div className="font-extrabold flex items-baseline">
                <h1 className="text-[45px] lg:text-7xl font-extrabold">{convertToDigits(user?.points || 0)}</h1>
                <h1>/2500</h1>
              </div> }
              <div className="font-gourd text-5xl font-normal">
                {/* <h1>lorem</h1> */}
                {user ? <h1>{user?.name}</h1> : <h1>Be the lorekeeper of </h1>}
                { !user?.name &&  <h1>the riftown</h1>}
                { !user && <div className="w-[496px] mt-3 text-white text-base font-medium font-['OverusedGrotesk']">Step into Rifttown, where every challenge completed earns you points and honor. Rise through the ranks with your contributions, claim unique roles, and showcase your glory with collectible badges. Become the Lorekeeper and shape the story!</div> }
              </div>

              {/* Badges, Points, Roles */}
              <div className="flex flex-row items-start lg:items-center mt-[20px] lg:mt-0 gap-2">
                <div className="flex items-center justify-between gap-2">
                  <img src="./badge.svg" className="h-[43px] w-[43px]" alt="" />
                  <div className="gap-0">
                  { !user && <div className ="text-white text-base font-bold font-['Overused Grotesk'] leading-none">EARN <br/>BADGES</div> }
                  { user &&  <div className="text-white text-base font-bold font-['Overused Grotesk'] leading-none">BADGES <br/>{`#${user?.badges?.length || 0}`}</div>}
                  </div>
                </div>
                <div className="bg-[#D2D6DB42] border border-[#d2d6db26] h-[26px] w-[1px] hidden lg:flex"></div>
                <div className="flex items-center justify-between gap-2">
                  <img src="./point.svg" className="h-[43px] w-[43px]" alt="" />

                  <div className="gap-0">
                  { !user && <div className ="text-white text-base font-bold font-['Overused Grotesk'] leading-none">COLLECT <br/>POINTS</div> }
                  { user &&  <div className="text-white text-base font-bold font-['Overused Grotesk'] leading-none">POINTS <br/>{`${user?.points || 0}`}</div>}
                  </div>
                </div>
                <div className="hidden lg:flex bg-[#D2D6DB42] border border-[#d2d6db26] h-[26px] w-[1px]"></div>
                <div className="flex items-center justify-between gap-2">
                  <div className="bg-[#262626] rounded-full p-[2px] size-[43px]">
                    <RoleIcon />
                  </div>
                  <div className="gap-0">
                  { user && <div className="text-white text-base font-bold font-['Overused Grotesk'] leading-none">ROLES <br/>{`#${user?.roles?.length || "B.0.0"}`}</div> }
                  { !user && <div className="text-white text-base font-bold font-['Overused Grotesk'] leading-none">GET YOUR <br/>OWN PROFILE</div> }
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 mt-[40px] lg:mt-2">
               
                    <Popover>
                  <PopoverTrigger asChild>
                <Link  href={!user ? discordAuthUrl : "#"}>
                  <Button  className={ user ?  `bg-[#F624211C] border-[3px] border-[#F624214D] rounded-[12px] size-[43px] gap-2 w-fit text-white hover:bg-[#F6242133] max-w-[200px]`
                  :  `bg-[#5865F2] rounded-[18px] size-[43px] gap-2 w-fit text-white hover:bg-[#5865F280] max-w-[220px]`
                }> <DiscordIcon />
                <div className="text-base font-normal truncate">{user?.discordId ? user?.discordId : "Connect to Discord"}</div>
                { user && <ChevronDownIcon className="size-4" />}
              </Button></Link>
                  </PopoverTrigger>
                  {user && <PopoverContent align="end" className="w-fit  p-0">
                    <Button onClick={logout} className="w-fit ">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </PopoverContent>}
                </Popover>
                   
                <div className="flex flex-col items-center">
                  <Button className=" text-black bg-white border-[3px] hover:bg-white/80 border-[#F624215C] rounded-full size-[43px] gap-2 w-fit max-w-[200px]">
                    <CopyIcon className="size-4" />
                    <div className="text-base font-semibold truncate">Invite friends</div>
                    <ArrowUpRight className="size-4" />
                  </Button>
                  <div className="text-xs mt-1 flex items-center gap-1"><DiamondIcon />earn more points</div>
                </div>
              </div>

            </div>
            <div className="text-white flex  items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/30 to-purple-500/30 blur-lg rounded-full"></div>
                <img src="./lorekeeper/TemplateProfile.svg" className="h-[450px] relative" alt="" />
              </div>
                <h2 className="absolute right-0  text-base -translate-x-1/2 font-gourd bg-clip-text transform rotate-90">
                  {`Lorekeeper ${user?.roles?.length || ""} B.0.0`}
                </h2>
            </div>
          </div>
          <div className="flex z-11 flex-col md:flex-row lg:flex-row gap-9 items-center">
            
              <img src="./learn.svg" className="z-[100] h-[220px]" alt="" />
            
            <div className=" flex flex-col justify-center pl-[36px] gap-[10px]">
                <div className="flex items-center">
                  {badges.map((badge , index) => {
                    if( user && !user?.roles?.includes(badge.name))return null;
                    return (
                    <div key={index} className={`relative ${ (!user || badges.filter(b => user?.roles?.includes(b.name)).length > 1) && index !== 0 ? "ml-[-36px]" : ""}`}>
                      <img key={index} src={badge.src} className={`h-[120px] z-[${index+100}] rounded-full  drop-shadow-[-4px_0_3px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out hover:drop-shadow-[-5px_0_3px_rgba(0,0,0,1)] hover:scale-105 peer` } alt="" />
                      <div className="flex flex-col items-center justify-center invisible peer-hover:visible absolute z-50 bottom-[120px] left-1/2 -translate-x-1/2 p-4 bg-black/80 backdrop-blur-sm rounded-lg text-white w-[200px] border border-purple-500/30">
                        <h3 className="font-bold mb-1 capitalize self-center">{badge.name}</h3>
                        <p className="text-sm text-center text-[#969696]">Description for {badge.name} badge</p>
                      </div>
                    </div>
                  )})}
                </div> 
                <div className="flex items-center">
                  {disabledBadges.map((badge , index) => {
                    if(user?.roles?.includes(badge.name))return null;
                    return (
                    <div key={index} className={`relative ${index !== 0 ? "ml-[-36px]" : ""}`}>
                      <img key={index} 
                      src={badge.src} 
                      alt={badge.name}
                      className={`h-[120px] rounded-full drop-shadow-[-4px_0_3px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out hover:drop-shadow-[-5px_0_3px_rgba(0,0,0,1)] hover:scale-105 peer`} />
                      
                      <div className="flex flex-col items-center justify-center invisible peer-hover:visible absolute z-50 bottom-[120px] left-1/2 -translate-x-1/2 p-4 bg-black/80 backdrop-blur-sm rounded-lg text-white w-[200px] border border-purple-500/30">
                        <h3 className="font-bold mb-1 capitalize self-center">{badge.name}</h3>
                        <p className="text-sm text-center text-[#969696]">Description for {badge.name} badge</p>
                      </div>
                    </div>
                  )})}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
