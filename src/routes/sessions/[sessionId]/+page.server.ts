import { error, type Actions, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib';

export const load = (async ({params}) => {
    let sessionId = Number(params.sessionId);
    let messages = await prisma.message.findMany({where:{sessionsId: sessionId},include:{user:{select:{name:true}}}})

    if (!prisma.session.findFirst({where:{id:sessionId}})) {
        throw error(418, "session not found");
    }

    return {session: sessionId, messages};
}) satisfies PageServerLoad;

export const actions: Actions = {
    text :async ({request, params, cookies}) => {
        let session  = params.session;
        let user = cookies.get("username");
        let session2 = await prisma.session.findFirst({where: {sessionName: session}})
        let createdBy = await prisma.user.findFirst({where: {name: user}})


        if(!session){
            throw error(404, `Session "${session}" not found`);
        }
        if(!session2){
            throw error(404, `Session "${session}" not found`);
        }

        let data = await request.formData();
        let message = data.get('message')?.toString();

        if(!createdBy){
            throw redirect(307, "/login")
        }

        if(!message){
            return fail(400, {message: 'Message cannot be empty'});
        } else{
            await prisma.message.create({
                data: { message: message, sessionsId: session2.id, userId: createdBy.id },
              });
        }
        
    }
};
