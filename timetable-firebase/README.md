# FrostyTimetable

A Smart Timetable Management Web Application built with Next.js, featuring AI-powered timetable generation and management.

## Features

- 🎯 **AI-Powered Timetable Generation** - Generate optimized timetables using Google's Gemini AI
- 📊 **Interactive Dashboard** - Visualize class schedules and utilization
- 🤖 **AI Assistant** - Get help with timetable-related queries
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **AI Integration**: Google Genkit, Gemini 2.5 Flash
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google AI API Key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd timetable-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
echo "GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here" > .env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:9002" >> .env.local
```

4. Get your Google AI API Key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Replace `your_google_ai_api_key_here` in `.env.local` with your actual API key

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:9002](http://localhost:9002) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Usage

1. **Login**: Use any email and password to access the application
2. **Dashboard**: View overview of classes and statistics
3. **Generate Timetables**: Select department and semester to generate AI-optimized timetables
4. **AI Assistant**: Ask questions about timetable management
5. **Manage Faculty & Classrooms**: View and manage faculty and classroom information

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard/        # Dashboard components
│   ├── timetable/        # Timetable components
│   └── assistant/        # AI Assistant components
├── ai/                   # AI integration (Genkit)
├── lib/                  # Utility functions and data
├── types/                # TypeScript type definitions
└── context/              # React context providers
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
