import { signJwtAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { Chela_One } from "next/font/google";

interface RequestBody {
    username: string;
    password: string;
}
export async function POST(request: Request) {
    const body: RequestBody = await request.json();
    console.log(body);
    const user = await prisma.user.findFirst({
        where: {
            email: body.username,
        },
    });
    console.log('*************');
    console.log(body.password, user?.password);
    console.log(user);
    if (user && (await bcrypt.compare(body.password, user.password))) {
        const { password, ...userWithoutPass } = user;
        const accessToken = signJwtAccessToken(userWithoutPass);
        const result = {
            ...userWithoutPass,
            accessToken,
        };
        return new Response(JSON.stringify(result));
    } else return new Response(JSON.stringify(null));
}
