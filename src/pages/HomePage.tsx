import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components";
import { BarChart3, Users, Zap, Shield } from "lucide-react";

export function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Dashboard",
      description: "View real-time metrics and KPIs in a beautiful dashboard",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "User Management",
      description:
        "Manage users with advanced filtering and search capabilities",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Performance",
      description: "Built with React and optimized for speed",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure",
      description: "Authentication and secure data handling",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-lg bg-primary/10">
            <span className="text-3xl font-bold text-primary">D</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Welcome to <span className="text-primary">Disprz</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern, responsive dashboard application built with React,
            TypeScript, and Tailwind CSS
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/users")}
            >
              View Users
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardHeader>
                <div className="text-primary mb-2">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech Stack */}
        <Card className="border-0 shadow-lg mb-16">
          <CardHeader>
            <CardTitle>Built With</CardTitle>
            <CardDescription>
              Modern technologies for a modern web
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Frontend</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>React 18</li>
                  <li>TypeScript</li>
                  <li>Vite</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Styling</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Tailwind CSS</li>
                  <li>Lucide Icons</li>
                  <li>Dark Mode Support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>React Router</li>
                  <li>Form Validation</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
