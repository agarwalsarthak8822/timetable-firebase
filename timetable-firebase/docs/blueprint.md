# **App Name**: FrostyTimetable

## Core Features:

- User Authentication: Enable role-based login for Students, Faculty, and Admin using Firebase Authentication (Email/Password + Google SSO).
- Dashboard Overview: Display weekly and hourly class records graphically using charts/heatmaps, along with quick stats on total classes, active live classes, and classroom utilization.
- AI Timetable Generation: Allow users to select a Department and Semester, then generate multiple optimized timetables using AI. This feature acts as a tool using constraints like classrooms, faculty load, subject weekly hours, leaves, and fixed slots.
- Timetable Management: Provide a calendar view for days (Mon-Sun) and slots (1-6 per day), allowing users to review and approve generated timetables, detect conflicts (highlight clashes), and export as PDF/CSV.
- Faculty Availability Updates: Display a faculty list with subject assignments, availability, and average monthly leaves, with an option for faculty to update their availability.
- Classroom Status Monitoring: Show all classrooms with student capacity and occupancy status.
- Live Class Recordings: Show ongoing classes + recordings, allow uploading & storing recordings in Firebase Storage, and provide an option to download recordings.

## Style Guidelines:

- Primary color: Calm, professional muted blue (#64B5F6) to convey trust and organization.
- Background color: Very light blue (#F0F7FA), close in hue to the primary but highly desaturated for a clean, unobtrusive frosted-glass effect.
- Accent color: Muted violet (#9575CD), approximately 30 degrees away from the primary hue, and set at a lower brightness, to suggest creativity in planning and education.
- Body and headline font: 'Inter', a grotesque-style sans-serif font with a modern and neutral look that is suitable for both headlines and body text.
- Use clean, minimalist icons to represent different features and actions, maintaining consistency with the overall frosty UI.
- Implement a glassmorphism/frosted look (bg-white/30 backdrop-blur-md rounded-2xl shadow-lg) with rounded corners (2xl) and iPhone-style spacing to create a modern and visually appealing interface.
- Incorporate subtle animations and transitions to enhance user experience, such as smooth calendar scrolling and loading indicators.