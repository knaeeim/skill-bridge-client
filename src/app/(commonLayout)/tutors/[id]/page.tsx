import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tutorServices } from "@/Services/tutor.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Star,
    MapPin,
    Clock,
    Award,
    Heart,
    Share2,
    ArrowLeft,
    MessageSquare,
    Calendar,
    Globe,
    Book,
    CheckCircle2,
} from "lucide-react";
import BookingSection from "./BookingModal";

// ১. আপনার JSON ডাটা অনুযায়ী ইন্টারফেস (Exact Match)
interface TutorResponse {
    id: string;
    userId: string;
    bio: string;
    experienceYears: number;
    hourlyRate: number;
    rating: number;
    totalReviews: number;
    isApproved: boolean;
    isFeatured: boolean;
    subjects: string[]; // ["MATH", "ENGLISH", "SCIENCE"]
    createdAt: string;
    updatedAt: string;
    // user অবজেক্টটি data এর ভেতরেই আছে
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string | null;
        role: string;
        phone: string | null;
        status: string;
    };
    // এই ফিল্ডগুলো আপনার JSON এ নেই, তাই Optional (?) রাখা হলো যাতে ক্র্যাশ না করে
    category?: { id: string; name: string }[];
    availabilities?: { dayOfWeek: string[]; startTime: string; endTime: string }[];
}

type Props = {
    params: Promise<{ id: string }>;
};

const formatSubject = (subject: any) => {
    return String(subject).replace(/_/g, " ");
};

const TutorDetailsPage = async (props: Props) => {
    // const { id } = useParams();

    // const [isLoading, setIsLoading] = useState(true);
    // const [tutorData, setTutorData] = useState<TutorResponse | null>(null);
    // const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    // useEffect(() => {
    //     const fetchTutor = async () => {
    //         try {
    //             const tutorId = Array.isArray(id) ? id[0] : id;
    //             if (!tutorId) return;
    //             const { data } = await getTutorDetails(tutorId);
    //             if (data) {
    //                 setTutorData(data.data);
    //             }
    //         } catch (error: unknown) {
    //             console.log("An Error Occured in TutorDetails Details");
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchTutor();
    // }, [id]);

    // if (isLoading) {
    //     return <Loading />;
    // }
    const params = await props.params;
    const { id } = params;

    let tutorData: TutorResponse | null = null;

    try {
        const { data, error } = await tutorServices.getTutorProfile(id);

        // ২. আপনার JSON স্ট্রাকচার: { success: true, data: { ... } }
        // তাই আমরা সরাসরি response.data নিচ্ছি
        if (data) {
            tutorData = data.data;
        }
    } catch (error) {
        console.error("Error fetching tutor:", error);
    }

    // ৩. যদি ডাটা না আসে তবে 404
    if (!tutorData) {
        return notFound();
    }

    // ৪. সেফলি ডাটা বের করা (Defensive Destructuring)
    const {
        bio,
        experienceYears,
        hourlyRate,
        rating,
        totalReviews,
        subjects,
        user, // user এখান থেকেই আসবে
        // নিচের গুলো না থাকলে ডিফল্ট ভ্যালু বা empty array
        category = [],
        availabilities = [],
    } = tutorData;

    // ৫. User অবজেক্ট চেক (Safety Check)
    if (!user) {
        return <div>Error: User information missing for this tutor profile.</div>;
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* --- HERO HEADER --- */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-linear-to-r from-violet-600 to-indigo-600 opacity-90" />
                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <Button
                        variant="ghost"
                        className="text-white hover:bg-white/20 hover:text-white"
                        asChild>
                        <Link href="/tutors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tutors
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* --- MAIN CONTENT --- */}
                    <div className="flex-1 space-y-8">
                        {/* Profile Header */}
                        <Card className="border-none shadow-lg">
                            <CardContent className="pt-6">
                                <div className="flex flex-col sm:flex-row gap-6 items-start">
                                    <div className="relative">
                                        <Avatar className="h-32 w-32 border-4 border-background shadow-md bg-white">
                                            <AvatarImage
                                                src={user.image || ""}
                                                alt={user.name}
                                            />
                                            <AvatarFallback className="text-4xl font-bold text-primary">
                                                {user.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Badge className="absolute bottom-1 right-1 bg-green-500 hover:bg-green-600 border-2 border-background">
                                            {user.status === "ACTIVE" ? "Available" : "Away"}
                                        </Badge>
                                    </div>

                                    <div className="flex-1 space-y-2 w-full">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h1 className="text-3xl font-bold">
                                                    {user.name}
                                                </h1>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {/* Category যদি থাকে দেখাবে, না থাকলে নাই */}
                                                    {category.map((cat: any) => (
                                                        <Badge
                                                            key={cat.id}
                                                            variant="outline"
                                                            className="text-primary border-primary/20">
                                                            {cat.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="rounded-full">
                                                    <Heart className="h-5 w-5" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="rounded-full">
                                                    <Share2 className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                                <span className="font-bold text-foreground">
                                                    {rating || 0}
                                                </span>
                                                <span>({totalReviews} reviews)</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                Online
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Globe className="h-4 w-4" />
                                                {user.emailVerified
                                                    ? "Verified"
                                                    : "Unverified"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tabs */}
                        <Tabs defaultValue="about" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 lg:w-100">
                                <TabsTrigger value="about">About</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                                <TabsTrigger value="schedule">Availability</TabsTrigger>
                            </TabsList>

                            {/* About Tab */}
                            <TabsContent value="about" className="space-y-6 mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl">About Me</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                            {bio || "No bio provided."}
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <Book className="h-5 w-5 text-primary" />
                                            Teaches
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {subjects && subjects.length > 0 ? (
                                                subjects.map((sub, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="secondary"
                                                        className="px-3 py-1 text-sm font-normal">
                                                        {formatSubject(sub)}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <p className="text-muted-foreground">
                                                    No subjects listed.
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <Award className="h-5 w-5 text-primary" />
                                            Experience
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/10 p-3 rounded-full">
                                                <Clock className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-lg">
                                                    {experienceYears}+ Years
                                                </h4>
                                                <p className="text-muted-foreground">
                                                    Total Teaching Experience
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Reviews Tab */}
                            <TabsContent value="reviews" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Reviews ({totalReviews})</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center py-10 text-muted-foreground">
                                        <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-20" />
                                        <p>No reviews yet.</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Schedule Tab */}
                            <TabsContent value="schedule" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-primary" />
                                            Availability
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {availabilities.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {availabilities.map((slot, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="border rounded-lg p-4 bg-muted/20">
                                                        <h4 className="font-semibold mb-2">
                                                            {Array.isArray(slot.dayOfWeek)
                                                                ? slot.dayOfWeek
                                                                      .map((d) =>
                                                                          d.slice(0, 3),
                                                                      )
                                                                      .join(", ")
                                                                : slot.dayOfWeek}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {slot.startTime} - {slot.endTime}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-muted-foreground">
                                                No specific availability slots listed.
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* --- RIGHT SIDEBAR --- */}
                    <div className="w-full md:w-87.5 space-y-6">
                        <div className="sticky top-24">
                            <Card className="shadow-lg border-t-4 border-t-primary">
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-muted-foreground font-medium">
                                            Hourly Rate
                                        </span>
                                        <span className="text-3xl font-bold text-primary">
                                            ৳ {hourlyRate}
                                        </span>
                                    </div>
                                    <Separator />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Clock className="h-4 w-4 text-primary" />
                                            <span>60 min session</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <span>1-on-1 Online Class</span>
                                        </div>
                                    </div>

                                    {/* <Button
                                        onClick={() => setIsBookingModalOpen(true)}
                                        className="w-full h-12 text-lg font-semibold shadow-md">
                                        Book a Session
                                    </Button> */}
                                    <BookingSection
                                        tutorId={tutorData.id}
                                        hourlyRate={hourlyRate}
                                        tutorName={user.name}
                                        availabilities={tutorData.availabilities || []}
                                    />

                                    <Button variant="outline" className="w-full">
                                        Send Message
                                    </Button>
                                </CardContent>
                                <CardFooter className="bg-muted/30 px-6 py-4">
                                    <div className="text-xs text-center w-full text-muted-foreground">
                                        Usually responds within 2 hours
                                    </div>
                                </CardFooter>
                            </Card>

                            <Card className="mt-6">
                                <CardContent className="pt-6 grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <h4 className="text-xl font-bold">{totalReviews}</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Reviews
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold">{rating || 0}</h4>
                                        <p className="text-xs text-muted-foreground">Rating</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold">
                                            {experienceYears}yr
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            Experience
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold">100%</h4>
                                        <p className="text-xs text-muted-foreground">
                                            Response
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDetailsPage;
