import { createResponse } from "../configs/response.config.js";

import { ZodError } from "zod"; 

const validBodyReq = (schema) => {
    return (req, res, next) => {
        try {
            const data = schema.parse(req.body);
            req.body = data;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const allMessages = error.issues
                    .map((issue) => {
                        const path = issue.path.join('.'); 
                        return `${path}: ${issue.message}`;
                    })
                    .join("; "); 

                return createResponse(res, 400, allMessages); 
            }
<<<<<<< HEAD
            
            console.log(error);
=======
            console.log(error); 
>>>>>>> ce61a98be66af0add3a9a4ac3d77e0940b2b8a36
            return createResponse(res, 500, "Internal Server Error");
        }
    }
}

export default validBodyReq;
