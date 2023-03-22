
//* register user

export const register = (
    async (res : any, req : any) => {
        try{
            req.send("register user")

        }catch(e: any){
            req.status(500).send({message: e.message})
        }
    }
    
); 


//* login user

export const login = (
    async (res : any, req: any) => {
        try{
            req.send("login user")

        }catch(e: any){
            req.status(500).send({message: e.message})
        }
    }
); 