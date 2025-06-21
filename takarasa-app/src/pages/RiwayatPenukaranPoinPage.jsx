import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePicture from "@/assets/img/profile_picture.jpg";
import Voucher from "@/assets/img/voucher/10.png";
import { CaretLeft, CoinVertical, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import api from "../api";
import { useParams, Link } from "react-router-dom";

export default function Dashboard() {
    const { id } = useParams();
    const [userData, setUserData] = useState("");
    const [inPointsRecord, setInPointsRecord] = useState([]);
    const [outPointsRecord, setOutPointsRecord] = useState([]);
    const [recordDate, setRecordDate] = useState(null);
    const [totalPoints, setTotalPoints] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getUser() {
            try {
                const res = await api.get("/user");
                setUserData(res.data);
            } catch (err) {
                console.error("Gagal ambil user:", err);
            }
        }
        getUser();
    }, []);
    useEffect(() => {
        async function getPoints() {
            try {
                const res = await api.get(`/${id}/poin`);
                setInPointsRecord(res.data.in_points_record);
                setOutPointsRecord(res.data.out_points_record);
                setTotalPoints(res.data.total_points);
                setRecordDate(res.data.points_record.date);
            } catch (err) {
                console.log("Gagal mengambil poin.")
            }
        }
        getPoints();
    }, [id]);
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return format(new Date(dateString), 'dd MMMM yyyy HH:mm', { locale: idLocale });
        } catch (err) {
            console.error("Error formatting date", err);
        }
    };

    const formattedDate = formatDateForDisplay(recordDate);

    return (
        <>
            <div className="relative max-w-md min-h-screen items-center mx-auto font-jakarta flex flex-col">
                <div className="relative w-full flex flex-col items-center mx-auto overflow-hidden px-6">
                    <header className="relative flex items-center justify-center p-4 w-full">
                        <Link to={`/${userData.id}/penukaran-poin`} className="left-0 absolute">
                            <CaretLeft size={24} />
                        </Link>

                        <h1 className="w-full text-center text-xl font-semibold">
                            Riwayat Penukaran Poin
                        </h1>
                    </header>

                    <div className="container w-full flex flex-col items-center mx-auto gap-4 py-4">
                        <div className="flex flex-col justify-center items-center gap-3 mb-6">
                            <div className="h-16 w-16 rounded-full">
                                <img
                                    src={ProfilePicture}
                                    alt="Profile Picture"
                                    className="w-16 h-16 object-cover rounded-full"
                                />
                            </div>
                            <h1 className="text-base font-bold text-grey-100">
                                {userData.name}
                            </h1>
                            <div className="flex justify-center py-2 px-3 items-center gap-1 w-28 h-8 bg-brand-accent rounded-full text-white">
                                <CoinVertical size={16} weight="fill" />
                                <p className="text-xs font-bold">{totalPoints} Poin</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-brand-primary w-full flex-grow overflow-y-auto rounded-t-2xl py-4 px-6">
                    <Tabs defaultValue="penggunaan" className="w-full j">
                        <TabsList>
                            <TabsTrigger value="penggunaan">
                                Penggunaan Poin
                            </TabsTrigger>
                            <TabsTrigger value="perolehan">
                                Perolehan Poin
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="penggunaan">
                            {outPointsRecord.length > 0 ? (
                                <div>
                                    {outPointsRecord.map(point => (
                                        <div
                                            className="w-full mb-3 bg-grey-10 flex p-4 gap-3 items-center rounded-2xl"
                                        >
                                            <div className="bg-brand-primary50 w-24 h-24  rounded-2xl flex justify-center items-center">
                                                <img src={Voucher} alt="" />
                                            </div>
                                            <div className="flex flex-col w-auto">
                                                <h1 className="text-base text-left text-grey-100 font-bold">
                                                    {point.value} Poin
                                                </h1>
                                                <p className="text-xs text-grey-100">
                                                    {point.description}
                                                </p>
                                                <p className="text-xs text-grey-100">
                                                    {formattedDate}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-l text-grey-10 text-center my-auto">Tidak ada poin keluar.</p>
                            )}

                        </TabsContent>
                        <TabsContent value="perolehan">
                            {inPointsRecord.length > 0 ? (
                                <div>
                                    {inPointsRecord.map(point => (
                                        <div
                                            className="w-full mb-3 bg-grey-10 flex p-4 gap-3 items-center rounded-2xl"
                                        >
                                            <div className="bg-brand-primary50 w-24 h-24  rounded-2xl flex justify-center items-center">
                                                <img src={Voucher} alt="" />
                                            </div>
                                            <div className="flex flex-col w-auto">
                                                <h1 className="text-base text-left text-grey-100 font-bold">
                                                    {point.value} Poin
                                                </h1>
                                                <p className="text-xs text-grey-100">
                                                    {point.description}
                                                </p>
                                                <p className="text-xs text-grey-100">
                                                    {formattedDate}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">Tidak ada poin masuk.</p>
                            )}

                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
