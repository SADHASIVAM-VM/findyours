import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import useAccess from "../hook/useaccess";
import { useNavigate } from "react-router-dom";
import Carded from "../component/Carded";
import { useDebounce } from "../lib/useDebounce";

export default function AllItems() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [location, setLocation] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const { data, loading } = useAccess("item");

  useEffect(() => {
    setItems(data);
  }, [data]);

  

  // Filtering logic
  const filteredItem = items?.filter((e) => {
    const matchesSearch = e.itemName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

      const matchesCategory = "all" == category || e.itemType == category

    const matchesLocation =
      !location ||
      e.location?.toLowerCase().includes(location.toLowerCase());

    const matchesDate =
      (!dateFrom || new Date(e.dateLostOrFound) >= new Date(dateFrom)) &&
      (!dateTo || new Date(e.dateLostOrFound) <= new Date(dateTo));

    return matchesSearch && matchesCategory && matchesLocation && matchesDate;
  });

  const filteredItems = useDebounce(filteredItem, 1500)
  const clearFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setSortBy("");
    setLocation("");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="p-2 w-full md:w-[90vw] mx-auto text-gray-200 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        {/* ===== LEFT FILTERS (Desktop sticky) ===== */}
        <div className="hidden md:block md:w-1/4">
          <div className="sticky top-20 bg-black p-5 rounded-lg shadow-md space-y-5">
            {/* Search */}
            <div>
              <h3 className="font-semibold text-white mb-2">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search items..."
                  className="pl-10 border-[#454545] text-white bg-[#151515]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="font-semibold text-white mb-2">Status</h3>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-[#454545] text-white bg-[#151515]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent className="bg-[#151515] text-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="found">Found</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div>
              <h3 className="font-semibold text-white mb-2">Location</h3>
              <Input
                type="text"
                placeholder="Filter by location"
                className="border-[#454545] text-white bg-[#151515]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Date Range */}
            <div>
              <h3 className="font-semibold text-white mb-2">Date Range</h3>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="border-[#454545] text-white bg-[#151515]"
                />
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="border-[#454545] text-white bg-[#151515]"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-semibold text-white mb-2">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-[#454545] text-white bg-[#151515]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="closest">Closest</SelectItem>
                  <SelectItem value="relevant">Relevant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear button */}
            <Button
              onClick={clearFilters}
              className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
            >
              <X className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
          </div>
        </div>

        {/* ===== MOBILE FILTERS (Top sticky bar) ===== */}
        <div className="md:hidden  z-20 bg-black p-3 shadow-md rounded-md mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Search size={20} className="absolute left-6 text-white" />
            <Input
              type="text"
              placeholder="Search items..."
              className="pl-10 border-[#454545] text-white bg-[#151515]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="border-[#454545] text-white bg-[#151515]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#151515] text-white">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="found">Found</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-[#454545] text-white bg-[#151515]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-[#151515] text-white">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="closest">Closest</SelectItem>
                <SelectItem value="relevant">Relevant</SelectItem>
              </SelectContent>
            </Select>
          </div>

        <p className="text-sm p-2">Date Range </p>
            <div className="grid grid-cols-2 gap-3 mb-3">
        
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border-[#454545] text-white bg-[#151515]"
            />
             <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border-[#454545] text-white bg-[#151515]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-2">
              <Input
              type="text"
              placeholder="Location"
              className="border-[#454545] text-white bg-[#151515]"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Button
              onClick={clearFilters}
              className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
            >
              <X className="mr-2 h-4 w-4" /> Clear
            </Button>
          </div>
        
        </div>

        {/* ===== RIGHT CONTENT (Items Grid) ===== */}
        <div className="flex-1">
          <h1 className="text-[#E6FF75] text-2xl font-bold mb-5">
            Lost & Found Items : {data?.length}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.length === 0 ? (
              <p className="col-span-3 flex justify-center items-center ">
                <img
                  src={"/noresult.svg"}
                  alt="No results found"
                  className="object-contain"
                />
              </p>
            ) : (
              filteredItems.map((e, index) => (
                <Carded key={index} prop={e} index={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
