import { User } from "discord.js";
import prisma from "../db";

export async function addJakaliky(user: User, balanceMovement: number, reason: string) {
    try {
      return prisma.user.upsert({
        where: {
          discordId: user.id
        },
        update: {
          jakalikBalance: {
            increment: balanceMovement
          },
          jakalikHistory: {
            create: {
              reason,
              balanceMovement
            }
          }
        },
        create: {
          discordId: user.id,
          name: user.username,
          jakalikBalance: 0,
          jakalikHistory: {
            create: {
              reason,
              balanceMovement
            }
          }
        }

      });
    } catch (e) {
      console.error("dopice add balance failnulo lol")
    }
  }