import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Mail,
  Lock,
  Edit,
  Trash2,
  PlusCircle,
  Bell,
  Info,
} from "lucide-react";
import useAccess from "../hook/useaccess";
import { useCon } from "../controller/ContextController";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUserId, currentUser, setEditReport } = useCon();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    currentUser();
  }, []);

  const currentUserData = currentUserId?.[0];
  const { data } = useAccess(`item/u/${currentUserData?._id}`);

  const Lcount = data?.filter((e) => e.itemType === "lost") || [];
  const Fcount = data?.filter((e) => e.itemType === "found") || [];

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  const handleEdit = (e) => {
    setEditReport(e);
    navigate("/report");
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-2 space-y-6">
          {/* User Card */}
          <Card className="shadow-md">
            <CardHeader className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentUserData?.avatar || ""} />
                <AvatarFallback>
                  {currentUserData?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">
                  {currentUserData?.name || "Unknown User"}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentUserData?.email || "No email provided"}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" /> Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
            <Card className="bg-gradient-to-r from-yellow-100 to-yellow-50 shadow-sm">
              <CardContent className="p-4">
                <h1 className="text-sm text-gray-600">Total Reports</h1>
                <p className="text-2xl font-bold">{data?.length || 0}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-100 to-green-50 shadow-sm">
              <CardContent className="p-4">
                <h1 className="text-sm text-gray-600">Found</h1>
                <p className="text-2xl font-bold text-green-700">
                  {Fcount.length}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-red-100 to-red-50 shadow-sm">
              <CardContent className="p-4">
                <h1 className="text-sm text-gray-600">Lost</h1>
                <p className="text-2xl font-bold text-red-700">
                  {Lcount.length}
                </p>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Reports Section */}
        <main className="lg:col-span-3 space-y-6">
          {/* My Reports */}
          <Card className="shadow-md border-0 min-h-[380px]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                My Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-gray-500">Loading reports...</p>
              ) : data?.length > 0 ? (
                <div className="grid gap-3">
                  {data.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                    >
                      <div>
                        <p className="font-medium">{report.itemName}</p>
                        <p className="text-sm text-gray-500">{report.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            report.status === "Lost"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {report.status}
                        </span>
                        <Button
                          size="sm"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => handleEdit(report)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">No reports yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <Input
                  type="email"
                  value={currentUserData?.email || ""}
                  disabled
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-gray-500" />
                <Input
                  type="password"
                  placeholder="Change Password"
                  className="w-full"
                />
                <Button variant="outline">Update</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Enable Notifications</span>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <Button
                variant="destructive"
                className="w-full lg:w-72 flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete Account
              </Button>
            </CardContent>
          </Card>
        </main>

        {/* Extra Features */}
        <section className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => navigate("/report?type=lost")}
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Report Lost Item
              </Button>
              <Button
                className="w-full bg-green-600 text-white hover:bg-green-700"
                onClick={() => navigate("/report?type=found")}
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Report Found Item
              </Button>
            </CardContent>
          </Card>

          {/* Notifications / Activity */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bell className="h-4 w-4" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <p className="text-gray-600">📦 You reported a lost phone</p>
              <p className="text-gray-600">✅ Your wallet was marked found</p>
              <p className="text-gray-600">🔔 Notifications enabled</p>
            </CardContent>
          </Card>

          {/* Announcements / Tips */}
          <Card className="shadow-md bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Info className="h-4 w-4" /> Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700">
              Always double-check your details before submitting a report.  
              Clear descriptions help others identify your item quickly!
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
