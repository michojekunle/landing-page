/* eslint-disable @next/next/no-img-element */
import { StarIcon } from "@/assets/Icons";
import { NavMenu } from "@/components/nav-menu";
import prisma from "@/lib/db";


  const topUsers = await prisma.user.findMany({
    orderBy: {
      points: 'desc'
    },
    take: 10,
    select:{
      points: true,
      avatar: true,
      name: true,
      discordId: true,
      roles: true,
    }
  });

function Leaderboard() {
  
  return (
    <div>
      
      <div className="absolute inset-0 bg-cover bg-center bg-white">
      </div>

      <header className="absolute top-0 left-0 w-full z-50">
        <NavMenu />
      </header>


          
      <div className="relative  flex flex-col items-center justify-center max-w-6xl mx-auto px-6 lg:px-32  pt-4  text-black">
          
        <div className="w-full max-h-screen px-2 py-[7px] bg-white justify-center items-center gap-2.5 inline-flex overflow-y-auto">
            <div className=" w-full h-64 py-1 rounded-[36px] justify-center items-center gap-2.5 flex overflow-hidden bg-cover bg-center" style={{backgroundImage: `url('./leaderboard_bg.png')`}}>
                {/* <div className="grow shrink basis-0 text-center text-white text-[40px] font-normal font-gourd leading-10">leaderboard</div> */}
            </div>
        </div>

        <div className="flex flex-col w-full gap-2.5 p-6">
          {
            topUsers.map((user: any, index: number) => {
              return (
                <div key={index} className="flex items-center  justify-between">
                  <div className="flex items-center space-x-[10px]">
                    <div className="h-[40px] lg:h-[60px] w-[40px] lg:w-[60px] rounded-full border border-white overflow-hidden">
                      <img src={user.avatar} alt="" />
                    </div>
                    <div>
                    <div className="text-neutral-800 text-base text-[12px] lg:text-base font-normal font-gourd leading-none">{user.name || user.discordId}</div>
                      <div className="flex relative items-center space-x-[3px] text-black">
                          <StarIcon />
                          <div className="text-neutral-800 text-base font-semibold font-['Overused Grotesk'] leading-none">{user.points}</div>  
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-800 text-[22px] lg:text-[32px] ml-auto font-black">{user.points.toString().padStart(4, '0')}</p>
                </div>
              )
            })
          }
        </div>

        
      
      
      </div>
      

    </div>
  );
}

export default Leaderboard;
