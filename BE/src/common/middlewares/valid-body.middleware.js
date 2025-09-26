import { createResponse } from "../configs/response.config.js";

import { ZodError } from "zod"; // <-- Import ZodError

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
                        // Join nested paths with a dot, e.g., "user.address"
                        const path = issue.path.join('.'); 
                        return `${path}: ${issue.message}`;
                    })
                    .join("; "); // Join multiple errors with a semicolon and space

                return createResponse(res, 400, allMessages); // Use return to stop execution
            }
            
            // Handle other types of errors
            console.log(error); // Log unexpected errors for debugging
            return createResponse(res, 500, "Internal Server Error");
        }
    }
}

export default validBodyReq;