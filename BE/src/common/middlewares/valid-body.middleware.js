import { createResponse } from "../configs/response.config.js";

import { ZodError } from "zod"; 

const validBodyReq = (schema) => {
    return (req, res, next) => {
        try {
            const data = schema.parse(req.body);
            req.body = data;
            next();
        } catch (error) {
            // Check if the error is a ZodError
            if (error instanceof ZodError) {
                const allMessages = error.issues
                    .map((issue) => {
                        const path = issue.path.join('.'); 
                        return `${path}: ${issue.message}`;
                    })
                    .join("; "); 

                return createResponse(res, 400, allMessages); 
            }
            console.log(error); 
            return createResponse(res, 500, "Internal Server Error");
        }
    }
}

export default validBodyReq;
