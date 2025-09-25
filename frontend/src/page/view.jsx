import { React, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Info,
  Calendar,
  CheckCircle,
  Gift,
  Grid2X2,
  MapPin,
  CircleX,
  PhoneCall,
  UserCheck2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Ban,
} from "lucide-react";
import useAccess from "../hook/useaccess";
import Carded from "../component/Carded";
import { motion } from "framer-motion";
import { useCon } from "../controller/ContextController";



const View = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const descriptionRef = useRef(null);
  const { currentUserId, currentUser, setCurrentMessageReciverId } = useCon();
  const { id } = useParams();
  const { data, loading } = useAccess("item/i/" + id);
  const { data: similar } = useAccess("item");

  let ctg;

  function formatDate(dateString) {
    const givenDate = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now - givenDate) / (1000 * 60 * 60 * 24)
    );

    return diffInDays === 0
      ? "Today"
      : diffInDays === 1
      ? "1 day ago"
      : `${diffInDays} days ago`;
  }

  useEffect(() => {
    currentUser();
    function handleClickOutside(event) {
      if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

console.log(data)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black md:py-10 md:px-6">
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {data.length !== 0 ? (
            data.map((e) => {
              ctg = e.category;

              return (
                <motion.div
                  key={e._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  {/* Main Card */}
                  <Card className="p-6 rounded-none lg:rounded-xl w-full bg-white shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Image Carousel */}
                      <div className="relative">
                        <div className="border border-gray-300  lg:rounded-lg bg-gray-50 flex justify-center items-center overflow-hidden h-72 md:h-96">
                          <img
                            src={e.images[activeImage]}
                            alt={e.itemName}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(ev) =>
                              (ev.target.src =
                                "https://www.udgamschool.com/wp-content/uploads/2023/05/dummy-image-grey-e1398449111870.jpg")
                            }
                          />
                        </div>
                        {/* Carousel Controls (future multiple images) */}
                        <button
                          className="absolute top-1/2 -left-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                          onClick={() => setActiveImage((prev) => (prev - 1 + e?.images?.length) % e?.images?.length)}
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          className="absolute top-1/2 -right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                          onClick={() => setActiveImage((prev) => (prev + 1)%e?.images?.length)}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      {/* Details Section */}
                      <div className="flex flex-col justify-between">
                        {/* Badges */}
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <Badge
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              e.itemType === "lost"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {e.itemType}
                          </Badge>

                          <Badge className="px-3 py-1 rounded-full text-xs font-semibold">
                            {formatDate(e.createdAt)}
                          </Badge>
                          <Badge
                            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center ${
                              e.status !== "Open"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" /> {e.status}
                          </Badge>

                          {e.isVerified && (
                            <Badge className="flex items-center bg-blue-100 text-blue-600">
                              <ShieldCheck size={14} className="mr-1" />
                              Verified
                            </Badge>
                          )}

                           <Badge className="px-3 py-1 rounded-full text-xs bg-red-600 font-semibold">
                            <Ban/>
                          </Badge>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-bold mt-3 text-gray-900">
                          {e.itemName}
                        </h2>
                        <p className="text-gray-500 text-xs md:text-sm mt-1">
                          Updated: {formatDate(e.updatedAt)}
                        </p>

                        {/* Info Grid */}
                        <div className="mt-4 space-y-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm flex gap-2 items-center">
                              <Grid2X2 size={16} /> Category:
                            </p>
                            <p className="text-gray-500">{e.category}</p>
                          </div>
                          <div>
                            <p className="font-medium text-sm flex gap-2 items-center">
                              <Gift size={16} /> Reward:
                            </p>
                            <p className="font-semibold">
                              {e.reward ? `💲${e.reward}` : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-sm flex gap-2 items-center">
                              <Calendar size={14} /> Date:
                            </p>
                            <p className="text-gray-500 text-sm">
                              {new Date(e.dateLostOrFound).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-sm flex gap-2 items-center">
                              <MapPin size={16} /> Location:
                            </p>
                            <p className="text-gray-500 text-sm">{e.location}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mt-4">
                          <p className="font-medium text-sm flex gap-2 items-center">
                            <Info size={16} /> Description
                          </p>
                          <p className="text-gray-700 text-sm mt-1">
                            {isOpen
                              ? e.description
                              : e.description.slice(0, 80) + "..."}
                          </p>
                          <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-blue-600 text-xs font-semibold mt-1"
                          >
                            {isOpen ? "Show less" : "Read more"}
                          </button>
                        </div>

                        {/* Reporter */}
                        <div className="flex items-center mt-6 justify-between bg-gray-50 py-3 px-4 rounded-lg shadow-sm">
                          <p className="text-sm text-gray-900 flex gap-2 items-center">
                            <UserCheck2
                              size={20}
                              className="bg-green-400 text-white rounded-full p-1"
                            />
                            {e.reportedBy?.name ?? "Anonymous"}
                          </p>
                        </div>

                        {/* Action Bar (Sticky on Desktop) */}
                        <div className="flex gap-2 items-center mt-4 md:sticky md:bottom-4">
                          <Button className="flex-1 bg-[#e5ff75] border text-black/70 hover:bg-gray-100 flex gap-2 items-center">
                            <PhoneCall className="text-red-400 " size={28} /> {e.contactNumber}
                          </Button>
                          {
                            e.reportedBy._id != currentUserId[0]._id && <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md"
                            onClick={() => {
                              setCurrentMessageReciverId(e.user_id);
                              navigate("/chat");
                            }}
                          >
                            Message
                          </Button>
                          }
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Similar Items */}
                  <div className="mt-10">
                    <h1 className="text-xl font-bold text-white my-3">
                      Similar Items
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
                      {similar
                        .filter((s) => s.category === ctg && s._id !== e._id)
                        .slice(0, 4)
                        .map((s, idx) => (
                          <Carded key={idx} prop={s} index={idx} />
                        ))}
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-xl font-bold text-gray-700 p-5">
              No Item Found <span className="text-sm">{useLocation().pathname}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default View;
