import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib';



export const load = (async () => {
    let sessions = await prisma.session.findMany({
        include: {messages: {select: {id:true}}}
    })
    return {sessions};
}) satisfies PageServerLoad;

export const actions: Actions = {
    create : async({request})=>{
        let data = await request.formData();
        let session = data.get("sessionname")?.toString();
        if(session){
            await prisma.session.create({
                data: {
                    sessionName : session
                },
            })
        }
    }
};
