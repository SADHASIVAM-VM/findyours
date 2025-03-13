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
import useAccess from "../hook/useAccess";
import { useNavigate } from "react-router-dom";
import Carded from "../component/Carded";

// Sample Data

export default function AllItems() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const { data, loading } = useAccess("item");

  useEffect(() => {
    setItems(data);
  });

  // Filter items based on search and category
  const filtered = (e) => {
    if (
      e.itemName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (e.itemType == category || category == "all")
    ) {
      return e;
    }
  };
  const filteredItems = items?.filter((e) => filtered(e)) || [];

  return (
    <div className="p-6 w-[90vw]  mx-auto">
      {/* Search Bar & Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-[#111827] p-2 rounded-md text-white items-center my-10">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search items..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
            <SelectItem value="found">Found</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Options */}
        <Select onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="closest">Closest Location</SelectItem>
            <SelectItem value="relevant">Most Relevant</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Apply
        </Button>
      </div>

      {/* Search Results */}

      <h1 className="text-white text-2xl font-bold text-left my-5">
        Recommends
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 place-content-center w-full items-center">
        {filteredItems.length === 0 ? (
          <p className="col-span-6 flex justify-center items-center h-[300px]">
            <img src={"/noresult.png"} alt="" className="object-contain" />
          </p>
        ) : (
          filteredItems.map((e, index) => (
            <Carded key={index} prop={e} index={index} />
          ))
        )}
      </div>
    </div>
  );
}

// query based searching in db
// var query =new URLSearchParams();
// const handleChange =(e)=>{
// const {value, name} = e.target;
// setfilterd((prev)=>({...prev, [name]:value}))
// }

// const searchNow =async()=>{
//   if(filterd.searchTerm.length >0){
//     query.append('find',filterd.searchTerm)
//   }
//   if(filterd.location.length >0){
//     query.append('location',filterd.location)
//   }
//   if(filterd.type !=""){
//     query.append("type",type)
//   }
//   if (filterd.searchTerm && !filterd.location == "" && filterd.type == 'all') {
//     setItems(data);
// }

// // console.log("=======================================  ", import.meta.env.VITE_PUBLIC_URL+`search${query}`)
//    await fetch(import.meta.env.VITE_PUBLIC_URL+`item/search?${query}`)
//   .then((res)=>res.json()).then((res)=> setItems(res)).catch((err)=> console.log(err))

// }
