'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { askAssistant, type AssistantState } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Bot, Sparkles } from 'lucide-react';
import { Textarea } from '../ui/textarea';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Thinking...' : 'Ask AI'}
      <Sparkles className="ml-2 h-4 w-4" />
    </Button>
  );
}

export function Assistant() {
  const initialState: AssistantState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(askAssistant, initialState);

  return (
    <div className="space-y-6">
      <form action={dispatch}>
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Ask Assistant</CardTitle>
            <CardDescription>
              Enter your question or prompt below and the AI assistant will respond.
              <br />
              <span className="text-xs text-muted-foreground">
                Note: To use AI features, please configure your Google AI API key in the .env.local file.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="prompt">Your Prompt</Label>
                <Textarea 
                    id="prompt"
                    name="prompt"
                    placeholder="e.g., Explain how AI works in a few words"
                    className="min-h-[100px]"
                />
                {state.errors?.prompt && (
                  <p className="text-sm text-destructive mt-1">{state.errors.prompt[0]}</p>
                )}
              </div>
            {state.message && !state.result && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>

      {state.result && (
        <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bot className="h-6 w-6" />
                    AI Response
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/90 whitespace-pre-wrap">{state.result.response}</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
