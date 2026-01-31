
interface ServiceOptions {
    cache? : RequestCache;
    revalidate? :number;
}

interface GetTutorsParams {
    subject? : string;
    experienceYears? : number;
    hourlyRate? : number
    setOrder? : string;
    page? : number;
    limit?: number;
    isFeatured? : string;
}

export const tutorServices = {
    getAllTutors : async (params : GetTutorsParams, option? : ServiceOptions) => {
        
    }
}