import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";

export async function GET (request: NextRequest){

  try {

    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const formData = new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code",
        code: code.toString(),
        redirect_uri: process.env.DISCORD_REDIRECT_URI!
    })

    const tokenResponse = await fetch(`https://discord.com/api/oauth2/token`, {
        method: "POST",
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    if (tokenResponse.status !== 200) {
        return NextResponse.json({ error: "Failed to get discord token" }, { status: 400 });
    }

    const { access_token, token_type, refresh_token, expires_in, scope } = await tokenResponse.json();

    const userResponse = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

    const userData = await userResponse.json();

    const { username, global_name, avatar, email, id } = userData;

    const guildRole = await fetch(`https://discord.com/api/v10/guilds/${process.env.RIFTLEND_GUILD_ID}/members/${id}`, {
        headers: {
            'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
    });

    const guildRoleData = await guildRole.json();

    if(!guildRoleData || guildRoleData.message === "Unknown User"){
        return NextResponse.redirect(new URL("/lorekeeper?error=guild_not_found", request.url));
    }

    const { roles: rolesIds } = guildRoleData;

    const rolesResponse = await fetch(`https://discord.com/api/v10/guilds/${process.env.RIFTLEND_GUILD_ID}/roles`, {
        headers: {
            'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
    });

    const rolesData = await rolesResponse.json();

    const roles = rolesIds.map((roleId: string) => {
        return rolesData.find((role: any) => role.id === roleId).name;
    });

    const user = await prisma.user.upsert({
        where: {
            discordId: username
        },
        update: {
            email: email,
            name: global_name,
            avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
            roles: roles 
        },
        create: {
            discordId: username,
            email: email,
            name: global_name,
            avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
            roles: roles 
        }
    });

    if(!user){
        return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // const userGuilds = await fetch(`https://discord.com/api/users/@me/guilds`, {
    //     headers: {
    //         'Authorization': `Bearer ${access_token}`
    //     }
    // });

    // const userGuildsData = await userGuilds.json();

    // const riflendGuild = userGuildsData.find((guild: any) => guild.id === process.env.RIFTLEND_GUILD_ID);

    // if(!riflendGuild){
    //     return NextResponse.redirect(new URL("/lorekeeper?error=guild_not_found", request.url));
    // }
    

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET environment variable is not set");
    }

    const jwtToken = jwt.sign({
        userId: user.id,
        discordId: username
    }, jwtSecret);

    
    // const response = NextResponse.json({ guildRoleData , userGuildsData }, { status: 200 });
    const response = NextResponse.redirect(new URL("/lorekeeper", request.url));

    response.cookies.set("jwt-token", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: expires_in
    });

    return response;
  }
  catch (error) {
    console.error(error , "Error while getting discord token");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

}