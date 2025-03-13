import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Mail, Lock, Edit, Trash2 } from "lucide-react";
import useAccess from "../hook/useAccess";
import { useCon } from "../controller/ContextController";

export default function Dashboard() {
  const { currentUserId, currentUser } = useCon();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    currentUser();
  }, []);
  const currentUserData = currentUserId?.[0]; // Ensure no undefined access
  console.log("User Data:", currentUserData);
  const { data } = useAccess(`item/u/${currentUserData?._id}`);
  useEffect(()=>{
   

  },[currentUserData])
 


  // Fetch user-related data

  // Ensure data is loaded before filtering
  const Lcount = data?.filter((e) => e.itemType === "lost") || [];
  const Fcount = data?.filter((e) => e.itemType === "found") || [];

  useEffect(() => {
    if (data) {
      setLoading(false); // Set loading false when data is available
    }
  }, [data]);

  return (
    <div className="grid lg:grid-cols-3 p-3 gap-6 relative">
      {/* User Information */}
      <div className="col-span-1 space-y-5 md:sticky top-5">
        <Card className="w-[100vw] md:w-full">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={currentUserData?.avatar || ""} />
              <AvatarFallback>{currentUserData?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{currentUserData?.name || "Unknown User"}</h2>
              <p className="text-gray-500">{currentUserData?.email || "No email provided"}</p>
            </div>
            <Button className="ml-auto">
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-5 rounded-md">
            <h1 className="text-xl font-bold text-gray-400">Total Report</h1>
            <p className="font-bold">{data?.length || 0}</p>
          </div>
          <div className="bg-green-200 text-green-600 p-5 rounded-md">
            <h1 className="text-xl font-bold">Found</h1>
            <p className="font-bold">{Fcount.length}</p>
          </div>
          <div className="bg-red-200 text-red-600 p-5 rounded-md">
            <h1 className="text-xl font-bold">Lost</h1>
            <p className="font-bold">{Lcount.length}</p>
          </div>
        </div>
      </div>

      {/* My Reports */}
      <div className="col-span-2">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>My Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500">Loading reports...</p>
            ) : data?.length > 0 ? (
              <div className="grid gap-4">
                {data.map((report) => (
                  <div
                    key={report.id}
                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{report.itemName}</p>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        report.status === "Lost" ? "bg-red-200 text-red-600" : "bg-green-200 text-green-600"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reports yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <Input type="email" value={currentUserData?.email || ""} disabled className="w-full" />
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-gray-500" />
              <Input type="password" placeholder="Change Password" className="w-full" />
              <Button variant="outline">Update</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Enable Notifications</span>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <Button variant="destructive" className="w-full flex items-center">
              <Trash2 className="h-4 w-4 mr-2" /> Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
