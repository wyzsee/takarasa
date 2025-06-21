import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Button } from "@/components/ui/button";
import { CaretLeft, Calendar } from "@phosphor-icons/react";
import FotoBambang from "@/assets/img/Bambang.jpg";

export default function InformationPage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);

    const informationData = [
        {
            id: 1,
            title: "Bambang Susanto S.Sos., M.Cs",
            description: "Ahli bahasa isyarat, inklusi disabilitas, dan teknologi aksesibel.",
            image: FotoBambang,
        },
    ];
}