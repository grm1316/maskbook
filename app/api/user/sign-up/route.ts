    import prisma from "@/lib/server/prisma";
    import { generateSalteHash } from "@/lib/server/utils";
    import { NextRequest, NextResponse } from "next/server";

    export async function POST(     
        req: NextRequest,
        ctx: any
    ){  
        const {email, password} = await req.json();
        const passwordHash = generateSalteHash(password);

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash: passwordHash
            }
        })

        if(user){
            return NextResponse.json({
                ok:true,
            })
        }

        return NextResponse.json({
            ok:false
        })
    }

