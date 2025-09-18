import React, { useEffect, useState } from "react";
import { useCon } from "../controller/ContextController";
import useAccess from "../hook/useaccess";
import { toast } from "react-toastify";
import Autocomplete from "react-google-autocomplete";
import { XCircle } from "lucide-react";

const ReportItem = () => {
  const [typee, setType] = useState("");
  const { currentUserId, currentUser, getEditReport } = useCon();
  const [imagesStore, setImageStore] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [Loader, setLoader] = useState(false);

  const selectedType = typee || getEditReport?.itemType;

  const [formData, setFormData] = useState({
    user_id: "",
    itemName: "",
    category: "",
    dateLostOrFound: "",
    reward: "",
    location: "",
    description: "",
    contactName: "",
    contactNumber: "",
    reportedBy: "",
  });

  useEffect(() => {
    currentUser();
    if (getEditReport) {
      setFormData(getEditReport);
    }
  }, []);

  useEffect(() => {
    if (currentUserId?.[0]) {
      setFormData((prev) => ({
        ...prev,
        user_id: currentUserId[0]._id,
        reportedBy: currentUserId[0]._id,
      }));
    }
  }, [currentUserId, typee]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 console.log(imagePreview)
  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files;
   
     
    if(selectedFile.length > 1){
      
      for(let i = 0; i<selectedFile.length; i++){
        setImageStore((e)=> [...e, selectedFile[i]])
         setImagePreview((e)=> [...e, URL.createObjectURL(selectedFile[i])])
      }
    }
    else{
      setImageStore(selectedFile[0])
       setImagePreview(URL.createObjectURL(selectedFile[0]));
    }

   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const FM = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      FM.append(key, value);
    });
    if (imagesStore) {
      imagesStore.forEach(imgg=> FM.append("images", imgg))
    }
    !getEditReport && FM.append("itemType", typee);

    try {
      const url = getEditReport
        ? `${import.meta.env.VITE_PUBLIC_URL}item/update/${getEditReport._id}`
        : `${import.meta.env.VITE_PUBLIC_URL}item`;

      const response = await fetch(url, {
        method: getEditReport ? "PUT" : "POST",
        body: FM,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Successfully ${getEditReport ? "updated" : "posted"}`);
        setImagePreview([])
      } else {
       
        toast.error(`Failed to ${getEditReport ? "update" : "post"}`);
      }
    } catch (error) {
      toast.error("An error occurred while submitting.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-black/40 shadow-xl rounded-lg p-8 mt-6 relative">
      <h2 className="text-2xl font-bold text-center text-[#e5ff75] mb-2">
        Report Lost or Found Item
      </h2>
      <p className="text-gray-400 text-sm text-center mb-6">
        Please provide details about the item to help us process your report.
      </p>

      <form onSubmit={handleSubmit} className="space-y-18 text-white">
        {/* Step 1 - Select Type */}
        <div>
          <h3 className="font-semibold mb-3"><span className="p-2 mr-2 px-4 text-xl  rounded-full bg-[#e5ff75] text-black">1</span> Select Report Type</h3>
          <div className="flex gap-6">
            <button
              type="button"
              className={`flex-1 py-3 rounded-md  border border-[#454545]-2 font-medium ${
                selectedType === "lost"
                  ? "bg-[#e5ff75] text-black  border border-[#454545]-yellow-500"
                  : " border border-[#454545]-gray-300"
              }`}
              onClick={() => setType("lost")}
            >
              Lost Item
            </button>
            <button
              type="button"
              className={`flex-1 py-3 rounded-md  border border-[#454545]-2 font-medium ${
                selectedType === "found"
                  ? "bg-[#e5ff75] text-black  border border-[#454545]-green-500"
                  : " border border-[#454545]-gray-300"
              }`}
              onClick={() => setType("found")}
            >
              Found Item
            </button>
          </div>
        </div>

        {/* Step 2 - Item Details */}
        <div>
          <h3 className="font-semibold mb-3"><span className="p-2 mr-2 px-4  text-xl  bg-[#e5ff75] text-black rounded-full ">2</span> Item Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Item Name *</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
                className="w-full p-3  border border-[#454545] rounded-md"
                placeholder="E.g. Wallet, Phone, Keys"
              />
            </div>
            <div>
              <label className="block mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3  border border-[#454545] rounded-md bg-black"
              >
                <option value="">Select category</option>
                <option value="electronics">Electronics</option>
                <option value="documents">Documents</option>
                <option value="jewelry">Jewelry</option>
                <option value="clothing">Clothing</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block mb-1">Date *</label>
              <input
                type="date"
                name="dateLostOrFound"
                value={formData.dateLostOrFound}
                onChange={handleChange}
                required
                className="w-full p-3  border border-[#454545] rounded-md"
              />
            </div>
            {typee === "lost" && (
              <div>
                <label className="block mb-1">Reward (Optional)</label>
                <input
                  type="text"
                  name="reward"
                  value={formData.reward}
                  onChange={handleChange}
                  className="w-full p-3  border border-[#454545] rounded-md"
                  placeholder="E.g. $20"
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <label className="block mb-1">Location *</label>
            <input 
            name="location"
              className="w-full p-3  border border-[#454545] rounded-md"
              placeholder="Search location where lost/found"
            onChange={handleChange}/>
          </div>

          <div className="mt-3">
            <label className="block mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full p-3  border border-[#454545] rounded-md"
              placeholder="Provide a detailed description..."
            />
          </div>

          <div className="mt-3">
            <label className="block mb-1">Upload Images</label>
            <div className="p-4  border border-[#454545]  py-8 rounded-md text-center">
              {imagePreview && (
                <div className="flex overflow-scroll relative justify-start gap-5 mb-3">
                 {imagePreview.length>1 ? imagePreview.map((e)=> (
                 <div className="">
                   <img src={e} alt="" className={`w-[200px] h-[100px] object-center object-cover rounded-2xl`} onClick={(e)=> e.target.src = " "}/>
                   <span className="bg-red-400 rounded-full p-2 absolute top-0" onClick={(e)=> console.log(e.target.Parent)}>
                  <XCircle size={12}/>
                 </span>
                 </div> 
                 )) : <img src="" alt="" className={`w-[200px] h-[100px] object-center object-cover rounded-2xl`} onClick={(e)=> e.target.src = " "}/>}
                

{/*  NOT WORKING THE SINGLE FILE HANDLER TO PREVIEW THE IMAGE IN FFORNTEND */}


                </div>
              )}
              <input type="file" multiple onChange={handleFileChange} />
            </div>
          </div>
        </div>

        {/* Step 3 - Contact Info */}
        <div>
          <h3 className="font-semibold mb-3"><span className="p-2 mr-2 px-4  text-xl  rounded-full bg-[#e5ff75] text-black ">3</span> Contact Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Contact Name *</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="w-full p-3  border border-[#454545] rounded-md"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block mb-1">Contact Phone *</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full p-3  border border-[#454545] rounded-md"
                placeholder="Your phone number"
              />
            </div>
          </div>
        </div>

        {/* Step 4 - Submit */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-red-400 px-5 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#E6FF75] text-black px-5 py-2 rounded-md hover:bg-[#e6ff75]/80 transition"
          >
            {Loader ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </form>

      {Loader && (
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center">
          <div className="loader  border-t-4 border-blue-600 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ReportItem;
