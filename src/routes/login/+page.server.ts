import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib';


export const load = (async () => {
    return {};
}) satisfies PageServerLoad;



export const actions: Actions = {
    login: async({request, cookies}) =>{
        let data = await request.formData();
        let userName = data.get("username")?.toString();
        let pasSWord = data.get("password")?.toString();

        if(userName && pasSWord){

            let user = await prisma.user.findUnique({where:{name:userName}})

            if(user){
                if(user.youdontknowwhatdisis === pasSWord){
                    cookies.set("username", userName, {secure : false})
                    throw redirect(307, "/");
                }
                else{
                    return fail(400, {pasSWord: "Wrong password"})
                }
                // användaren finns, jämför lösenord
                // om samma lösenord -> logga in (set cookie + redirect)
                // annars return fail password
            } else{

                // finns ej, skapa ny ?
                await prisma.user.create({
                    data: {
                        name: userName,
                        youdontknowwhatdisis: pasSWord
                    },
                })
                cookies.set("username", userName, {secure : false})
                throw redirect(307, "/");
            }
        }
        console.log({userName})
    },
    logout: async ({request, cookies})=>{
        let username = cookies.get("username");
        if(!username){
            return fail(400, {username: "no username found"})
        }
        cookies.delete("username")
        throw redirect(307, "/login")

    }
    
};
