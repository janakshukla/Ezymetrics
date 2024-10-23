import React, { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Bell, LayoutDashboard, Users, BarChart2, FileText, Menu } from "lucide-react"

// Dummy data for charts
const performanceData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 280 },
  { name: "May", value: 590 },
]

const leadSourceData = [
  { name: "Website", value: 400 },
  { name: "Social Media", value: 300 },
  { name: "Referral", value: 300 },
  { name: "Direct", value: 200 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

// Dummy lead data
const leadsData = [
  { id: 1, name: "John Doe", email: "john@example.com", source: "Website", status: "New" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", source: "Social Media", status: "Contacted" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", source: "Referral", status: "Qualified" },
]

// Custom components to replace shadcn/ui components
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
)

const CardHeader = ({ children }) => <div className="p-4 border-b">{children}</div>
const CardContent = ({ children }) => <div className="p-4">{children}</div>
const CardTitle = ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>
const CardDescription = ({ children }) => <p className="text-sm text-gray-500">{children}</p>

const Button = ({ children, onClick, className, variant }) => {
  const baseClass = "px-4 py-2 rounded"
  const variantClass = variant === "ghost" ? "text-gray-600 hover:bg-gray-100" : "bg-blue-500 text-white hover:bg-blue-600"
  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </button>
  )
}

const Input = ({ id, value, className }) => (
  <input id={id} defaultValue={value} className={`border rounded px-2 py-1 ${className}`} />
)

const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
)

const Sheet = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {React.Children.map(children, child => 
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </>
  )
}

const SheetTrigger = ({ children, setIsOpen }) => {
  return React.cloneElement(children, {
    onClick: () => setIsOpen(true)
  })
}

const SheetContent = ({ children, isOpen, setIsOpen }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <div className="bg-white w-96 h-full p-6">
        <button onClick={() => setIsOpen(false)} className="float-right">×</button>
        {children}
      </div>
    </div>
  )
}

const SheetHeader = ({ children }) => <div className="mb-4">{children}</div>
const SheetTitle = ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>
const SheetDescription = ({ children }) => <p className="text-sm text-gray-500">{children}</p>
const SheetFooter = ({ children }) => <div className="mt-4">{children}</div>
const SheetClose = ({ children, setIsOpen }) => {
  return React.cloneElement(children, {
    onClick: () => setIsOpen(false)
  })
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold">EzyMetrics</h2>
            <Button variant="ghost" onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 space-y-2 p-2">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Leads
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BarChart2 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <Button variant="ghost">
              <Bell className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Performance Chart */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Lead Source Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {leadSourceData.map((entry, index) => (
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
          </div>

          {/* Lead Management Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>View and manage your leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Source</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadsData.map((lead) => (
                      <tr key={lead.id} className="border-b">
                        <td className="px-4 py-2">{lead.name}</td>
                        <td className="px-4 py-2">{lead.email}</td>
                        <td className="px-4 py-2">{lead.source}</td>
                        <td className="px-4 py-2">{lead.status}</td>
                        <td className="px-4 py-2">
                          <Sheet>
                            <SheetTrigger>
                              <Button variant="outline">View Details</Button>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>Lead Details</SheetTitle>
                                <SheetDescription>View and edit lead information</SheetDescription>
                              </SheetHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Name
                                  </Label>
                                  <Input id="name" value={lead.name} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="email" className="text-right">
                                    Email
                                  </Label>
                                  <Input id="email" value={lead.email} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="source" className="text-right">
                                    Source
                                  </Label>
                                  <Input id="source" value={lead.source} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="status" className="text-right">
                                    Status
                                  </Label>
                                  <Input id="status" value={lead.status} className="col-span-3" />
                                </div>
                              </div>
                              <SheetFooter>
                                <SheetClose>
                                  <Button type="submit">Save changes</Button>
                                </SheetClose>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Reporting Tool */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Reporting Tool</CardTitle>
              <CardDescription>Generate custom reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                  <Label htmlFor="report-type">Report Type</Label>
                  <select id="report-type" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>Lead Summary</option>
                    <option>Performance Analysis</option>
                    <option>Source Breakdown</option>
                  </select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="date-range">Date Range</Label>
                  <select id="date-range" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="format">Format</Label>
                  <select id="format" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>PDF</option>
                    <option>CSV</option>
                  </select>
                </div>
                <div className="w-full">
                  <Button className="mt-4">Generate Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}