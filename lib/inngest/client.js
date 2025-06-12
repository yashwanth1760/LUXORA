import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ 
    id: "Luxora",
    name:"Luxora",
    retryFunction: async (attempt)=>({
        delay:Math.pow(2,attempt)*1000,
        maxAttempt:2,

    }),

    


});
