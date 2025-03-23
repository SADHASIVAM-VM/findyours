import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Trash2, CheckCircle, XCircle, User, PieChart, ShieldAlert, ArrowDownSquare } from "lucide-react";
import useAccess from "../hook/useaccess";
import Charrt from "../component/Charrt";


// const flaggedListings = listings.filter((item) => item.status === "Flagged");

export default function AdminDashboard() {

const [heightt, setHeight] = useState(false)

  const {data:listings} = useAccess('item')
  const {data:users} = useAccess('user')
  const monthh = (listings.map((e)=> new Date(e.updatedAt).toUTCString().split(',')[1].split(' ')[2]))
  


  
const formatDate = (postDate) => {
  const date = new Date(postDate);
  return new Intl.DateTimeFormat('en-GB', {
    day: "2-digit",
    month: "short"
  }).format(date);
};


  // Handle Status Change
  const handleStatusChange = (id, newStatus) => {
    setListingsData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <div className=" mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {/* Reports & Analytics */}
      <div className="col-span-1 grid grid-cols-1 max-h-[600px] lg:sticky top-2 gap-6 mb-6">
        <Card >
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold">Total Listings</h3>
              <p className="text-3xl font-bold">{listings.length}</p>
            </div>
            <PieChart className="text-blue-500 h-10 w-10" />
          </CardContent>
        </Card>
        <Card >
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold">Active Users</h3>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <User className="text-green-500 h-10 w-10" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold">Flagged Listings</h3>
              <p className="text-3xl font-bold">{ 0}</p>
            </div>
            <ShieldAlert className="text-red-500 h-10 w-10" />
          </CardContent>
        </Card>
      </div>

        <div className="col-span-3 ">
            
      {/* Manage Listings */}
      <Card className={`mb-6  transition-all duration-500 ease-in-out overflow-hidden ${heightt ? "h-[900px]" : "max-h-[500px]"}`}>
        <CardHeader >
            <div className="flex gap-2">
            <CardTitle>Manage Listings</CardTitle>
          <ArrowDownSquare size={'20px'} onClick={()=> setHeight(!heightt)} /> 
            </div>
          
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>{listing.itemName}</TableCell>
                  <TableCell>{listing.reportedBy.name}</TableCell>
                  <TableCell>{formatDate(listing.updatedAt)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      listing.status === "closed" ? "bg-yellow-200 text-yellow-700" :
                      listing.status === "open" ? "bg-green-200 text-green-700" :
                      "bg-red-200 text-red-700"
                    }>
                      {listing.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {listing.status === "open" && (
                      <Button size="sm" variant="outline" className="mr-2" onClick={() => handleStatusChange(listing.id, "Approved")}>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>Are you sure you want to delete this listing?</AlertDialogHeader>
                        <AlertDialogFooter>
                          <Button variant="secondary">Cancel</Button>
                          <Button variant="destructive" onClick={() => handleStatusChange(listing.id, "Deleted")}>
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="destructive">
                      <XCircle className="h-4 w-4" /> Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      

      <div className="bg-white w-full rounded-xl p-3">
      <Charrt userDataCount={users.length} reportDataCount={listings.length} />
      </div>
        </div>

    
    </div>
  );
}
