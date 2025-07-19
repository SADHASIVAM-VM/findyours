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
import { Search, Filter } from "lucide-react";
import useAccess from "../hook/useaccess";
import { useNavigate } from "react-router-dom";
import Carded from "../component/Carded";

export default function AllItems() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const { data, loading } = useAccess("item");

  useEffect(() => {
    setItems(data);
  }, [data]);

  const filteredItems = items?.filter((e) =>
    e.itemName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (e.itemType === category || category === "all")
  );

  return (
    <div className="p-2 w-full md:w-[80vw] mx-auto  text-gray-200 min-h-screen">
      <div className="flex flex-col md:flex-row gap-4  p-4 rounded-lg shadow-md text-white items-center my-10">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 border-[#717171]" />
          <Input
            type="text"
            placeholder="Search items..."
            className="pl-10  border-[#717171] text-white focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-1/4 border-[#717171] text-white">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
            <SelectItem value="found">Found</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-1/4  border-[#717171] text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="closest">Closest Location</SelectItem>
            <SelectItem value="relevant">Most Relevant</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full md:w-auto bg-[#3b3b3b] hover:bg-[#323232] text-white">
          <Filter className="mr-2 h-4 w-4" /> Apply
        </Button>
      </div>

      <h1 className="text-white text-2xl font-bold text-left my-5">L&F ITEMS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-content-center w-full items-center">
        {filteredItems.length === 0 ? (
          <p className="col-span-3 flex justify-center items-center h-[300px]">
            <img src={"/noresult.png"} alt="No results found" className="object-contain" />
          </p>
        ) : (
          filteredItems.map((e, index) => <Carded key={index} prop={e} index={index} />)
        )}
      </div>
    </div>
  );
}
