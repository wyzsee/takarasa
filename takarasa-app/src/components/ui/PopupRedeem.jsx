import React, { useState } from "react";
import { CoinVertical } from "@phosphor-icons/react";
import Background from "@/assets/img/popup-bg.svg";
import Coin from "@/assets/img/coin.svg";
import { Link } from "react-router-dom";

export default function PopupRedeem({ cost, name, my_points, onClose, onProceed, isRedeeming }) {
    const [loading, setLoading] = useState(false);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-jakarta">
            <div className="relative flex flex-col w-full bg-grey-10 rounded-2xl shadow-xl p-6 first-line:max-w-sm text-center overflow-hidden gap-4">
                <img
                    src={Background}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                    alt="" />
                <div className="flex relative flex-col justify-start items-center gap-2 z-99">
                    <div className="py-3 flex flex-col justify-start items-start gap-2.5">
                        <img src={Coin} alt="" />
                    </div>
                    <div className="flex flex-col justify-start items-center gap-1">
                        <div className="text-right justify-start text-Error text-3xl font-semibold font-jakarta text-error">{cost} Poin</div>
                        <div className="justify-start text-black text-base font-medium font-jakarta">{name}</div>
                        <div className="flex flex-grow-0 items-center px-3 py-2 gap-2 text-grey-10 bg-brand-accent rounded-full">
                            <CoinVertical size={16} />
                            <p className="text-xs">{my_points} Poin Dimiliki</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 relative">
                    <button
                        onClick={onProceed}
                        className="w-full h-14 bg-grey-100 text-white text-lg rounded-full font-semibold  hover:bg-brand-secondary"
                    >
                        <Link to="">
                            {loading
                                ? "Menyimpan..."
                                : "Tukar"}
                        </Link>
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full h-14 bg-grey-10 text-brand-primary text-lg rounded-full font-semibold outline outline-2 outline-brand-primary outline-offset-[-2px] hover:bg-brand-secondary"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
}