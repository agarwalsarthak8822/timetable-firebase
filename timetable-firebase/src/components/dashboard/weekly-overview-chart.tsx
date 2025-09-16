
"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "../ui/skeleton"

const chartConfig = {
  classes: {
    label: "Classes",
    color: "hsl(var(--primary))",
  },
}

// Pre-compute static data outside component
const generateChartData = [
  { day: "Mon", classes: Math.floor(Math.random() * 30) + 10 },
  { day: "Tue", classes: Math.floor(Math.random() * 30) + 10 },
  { day: "Wed", classes: Math.floor(Math.random() * 30) + 10 },
  { day: "Thu", classes: Math.floor(Math.random() * 30) + 10 },
  { day: "Fri", classes: Math.floor(Math.random() * 30) + 10 },
  { day: "Sat", classes: Math.floor(Math.random() * 10) + 5 },
];

export const WeeklyOverviewChart = React.memo(function WeeklyOverviewChart() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="gradient-card card-hover animate-fade-in col-span-1 md:col-span-2 lg:col-span-4">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-primary/10">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Weekly Class Overview
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Total classes scheduled for each day of the week.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isLoaded ? (
          <div className="flex h-[300px] w-full items-center justify-center">
            <Skeleton className="h-[250px] w-[95%]" />
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={generateChartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid vertical={false} stroke="hsl(var(--primary) / 0.2)" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="classes" 
                  fill="url(#colorGradient)" 
                  radius={8}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
});
