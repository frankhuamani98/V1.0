import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Button } from '@/Components/ui/button';
import { Progress } from '@/Components/ui/progress';
import { Badge } from '@/Components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import {
  Car,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';

const salesData = [
  { name: 'Jan', sales: 65, target: 50 },
  { name: 'Feb', sales: 59, target: 60 },
  { name: 'Mar', sales: 80, target: 70 },
  { name: 'Apr', sales: 81, target: 80 },
  { name: 'May', sales: 56, target: 90 },
  { name: 'Jun', sales: 55, target: 100 },
  { name: 'Jul', sales: 40, target: 110 },
];

const vehicleTypeData = [
  { name: 'SUV', value: 35 },
  { name: 'Sedan', value: 30 },
  { name: 'Truck', value: 15 },
  { name: 'Compact', value: 12 },
  { name: 'Luxury', value: 8 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const customerData = [
  { name: 'Jan', new: 40, returning: 24 },
  { name: 'Feb', new: 30, returning: 13 },
  { name: 'Mar', new: 20, returning: 38 },
  { name: 'Apr', new: 27, returning: 39 },
  { name: 'May', new: 18, returning: 48 },
  { name: 'Jun', new: 23, returning: 38 },
  { name: 'Jul', new: 34, returning: 43 },
];

const recentLeads = [
  { id: 1, name: "Maria García", vehicle: "BMW X5 2023", status: "New", date: "10 min ago" },
  { id: 2, name: "John Smith", vehicle: "Mercedes GLE 2022", status: "Contacted", date: "1 hour ago" },
  { id: 3, name: "Robert Johnson", vehicle: "Audi Q7 2023", status: "Interested", date: "3 hours ago" },
  { id: 4, name: "Sarah Williams", vehicle: "Lexus RX 2022", status: "Test Drive", date: "Yesterday" },
  { id: 5, name: "Michael Brown", vehicle: "Porsche Cayenne 2023", status: "Negotiation", date: "Yesterday" },
];

const upcomingAppointments = [
  { id: 1, customer: "David Miller", type: "Test Drive", vehicle: "BMW X5", time: "Today, 2:00 PM" },
  { id: 2, customer: "Jennifer Lee", type: "Service", vehicle: "Toyota Camry", time: "Today, 4:30 PM" },
  { id: 3, customer: "Thomas Wilson", type: "Consultation", vehicle: "Mercedes C-Class", time: "Tomorrow, 10:00 AM" },
  { id: 4, customer: "Emily Davis", type: "Delivery", vehicle: "Audi A4", time: "Tomorrow, 3:00 PM" },
];

const inventoryAlerts = [
  { id: 1, message: "Low stock: BMW X5 (Black)", priority: "high" },
  { id: 2, message: "Vehicle needs maintenance: Mercedes GLE", priority: "medium" },
  { id: 3, message: "Document expiring: Toyota Camry insurance", priority: "low" },
  { id: 4, message: "Price adjustment needed: Audi Q7", priority: "medium" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Calendar className="mr-2 h-4 w-4" />
            July 2025
          </Button>
          <Button size="sm" className="w-full sm:w-auto">
            <TrendingUp className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,248,560</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center text-green-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                12.5%
              </span>
              <span>from last month</span>
            </div>
            <Progress className="mt-3" value={75} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicles Sold</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center text-green-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                8.2%
              </span>
              <span>from last month</span>
            </div>
            <Progress className="mt-3" value={68} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center text-red-500">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                4.1%
              </span>
              <span>from last month</span>
            </div>
            <Progress className="mt-3" value={34} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Sale Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$86,452</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="flex items-center text-green-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                10.3%
              </span>
              <span>from last month</span>
            </div>
            <Progress className="mt-3" value={82} />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full sm:w-auto flex flex-wrap">
          <TabsTrigger value="overview" className="flex-1 sm:flex-none">Overview</TabsTrigger>
          <TabsTrigger value="sales" className="flex-1 sm:flex-none">Sales</TabsTrigger>
          <TabsTrigger value="inventory" className="flex-1 sm:flex-none">Inventory</TabsTrigger>
          <TabsTrigger value="customers" className="flex-1 sm:flex-none">Customers</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales performance vs target</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="hsl(var(--chart-1))" name="Sales" />
                      <Bar dataKey="target" fill="hsl(var(--chart-2))" name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Vehicle Types</CardTitle>
                <CardDescription>Distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vehicleTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {vehicleTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>Detailed monthly sales analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="hsl(var(--chart-1))" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="target" stroke="hsl(var(--chart-2))" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Current stock levels and distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vehicleTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value} units`}
                    >
                      {vehicleTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
              <CardDescription>New vs returning customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="new" fill="hsl(var(--chart-1))" name="New Customers" />
                    <Bar dataKey="returning" fill="hsl(var(--chart-3))" name="Returning Customers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Activity Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Leads */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest customer inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{lead.name}</p>
                      <Badge variant={
                        lead.status === "New" ? "default" :
                        lead.status === "Contacted" ? "secondary" :
                        lead.status === "Interested" ? "outline" :
                        lead.status === "Test Drive" ? "destructive" : "default"
                      } className="text-xs">
                        {lead.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{lead.vehicle}</p>
                    <p className="text-xs text-muted-foreground">{lead.date}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full mt-2">
                View all leads
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Scheduled for today and tomorrow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{appointment.customer}</p>
                      <Badge variant="outline" className="text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{appointment.vehicle}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {appointment.time}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full mt-2">
                View calendar
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Inventory Alerts</CardTitle>
            <CardDescription>Issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventoryAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    alert.priority === "high" ? "bg-destructive/10" :
                    alert.priority === "medium" ? "bg-orange-500/10" : "bg-blue-500/10"
                  }`}>
                    {alert.priority === "high" ? (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    ) : alert.priority === "medium" ? (
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <Badge variant={
                        alert.priority === "high" ? "destructive" :
                        alert.priority === "medium" ? "secondary" : "outline"
                      } className="text-xs">
                        {alert.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        Dismiss
                      </Button>
                      <Button variant="default" size="sm" className="h-7 px-2">
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full mt-2">
                View all alerts
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;