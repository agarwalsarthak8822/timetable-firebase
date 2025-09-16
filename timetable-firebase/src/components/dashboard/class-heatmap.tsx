
"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Scatter, ScatterChart } from "recharts"
import { Skeleton } from "../ui/skeleton"

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const dayLabels = days.map(d => d.charAt(0).toUpperCase() + d.slice(1));

const chartConfig = {
  density: {
    label: "Density",
    color: "hsl(var(--primary))",
  },
} satisfies import("@/components/ui/chart").ChartConfig;

// Pre-compute static data outside component
const generateHeatmapData = (() => {
  const chartData = Array.from({ length: 6 }, (_, i) => ({
    hour: `${9 + i}:00`,
    monday: Math.floor(Math.random() * 100),
    tuesday: Math.floor(Math.random() * 100),
    wednesday: Math.floor(Math.random() * 100),
    thursday: Math.floor(Math.random() * 100),
    friday: Math.floor(Math.random() * 100),
  }));

  return days.flatMap((day, dayIndex) => 
    chartData.map((entry) => ({
      day: dayLabels[dayIndex],
      hour: entry.hour,
      value: entry[day as keyof typeof entry],
      z: entry[day as keyof typeof entry]
    }))
  );
})();

export const ClassHeatmap = React.memo(function ClassHeatmap() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="gradient-card card-hover animate-fade-in col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-primary/10">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Hourly Class Density
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Heatmap of class activity throughout the week.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full p-0">
        {!isLoaded ? (
          <div className="flex h-full items-center justify-center">
            <Skeleton className="h-[250px] w-[95%]" />
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.2)" />
                      <XAxis dataKey="hour" type="category" name="Hour" tick={{fontSize: 12}} />
                      <YAxis dataKey="day" type="category" name="Day" domain={dayLabels} tick={{fontSize: 12}} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent indicator="line" />} />
                      <Scatter 
                        name="Density" 
                        data={generateHeatmapData} 
                        fill="url(#heatmapGradient)" 
                        shape="square"
                        className="hover:opacity-80 transition-opacity duration-200"
                      />
                      <defs>
                        <linearGradient id="heatmapGradient" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" />
                          <stop offset="50%" stopColor="hsl(var(--accent))" />
                          <stop offset="100%" stopColor="hsl(var(--primary))" />
                        </linearGradient>
                      </defs>
                  </ScatterChart>
              </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
});
