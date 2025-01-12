"use server"

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export type User = {
    id: string;
    discordId: string;
    name: string;
    email: string;
    avatar: string;
    points: number;
}

export async function getUser(): Promise<User | null> {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get('jwt-token');
  
      if (!token) {
        return null;
      }
  
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET environment variable is not set');
      }
  
      const decoded = jwt.verify(token.value, jwtSecret) as { userId: string; discordId: string };
  
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });
  
      if (!user) {
        return null;
      }
  
      return {
        id: user.id,
        discordId: user.discordId,
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || '',
        points: user.points || 0,
      };
    } catch (error) {
      console.error('Auth error:', error);
      return null;
    }
  }

  export async function logout() {
    'use server';
    
    const cookieStore = await cookies();
    cookieStore.delete('jwt-token');
    revalidatePath('/'); // Revalidate the current page
  }