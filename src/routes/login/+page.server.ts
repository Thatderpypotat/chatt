import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib';
import * as crypto from "node:crypto";

function hashPassword(password : string) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
  }

  function validatePassword(inputPassword : string, storedSalt : string, storedHash: string) {
    const hash = crypto.pbkdf2Sync(inputPassword, storedSalt, 1000, 64, 'sha512').toString('hex');
    return storedHash === hash;
  }

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
                if(validatePassword(pasSWord, user.salt, user.youdontknowwhatdisis)){
                    cookies.set("username", userName, {secure : false})
                    throw redirect(307, "/");
                } else{
                return fail(400, {pasSWord: "Wrong password"})
                }
                // användaren finns, jämför lösenord
                // om samma lösenord -> logga in (set cookie + redirect)
                // annars return fail password
            } else{
                let passsWord = hashPassword(pasSWord);
                // finns ej, skapa ny ?
                await prisma.user.create({
                    data: {
                        name: userName,
                        youdontknowwhatdisis: passsWord.hash,
                        salt: passsWord.salt
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
