import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { FormEvent, useState } from 'react';
import { signInUser } from '../../lib/firebase';
import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes } from 'firebase/auth';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { AlertCircle } from 'lucide-react';


export const Route = createFileRoute('/_public-layout/login')({
  component: () => <LoginPage />
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Send the email and password to firebase
      const userCredential = await signInUser(username, password);

      if (userCredential) {
        setUsername('');
        setPassword('');
        navigate({ to: '/attendances' });
      }
    } catch(error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
        case AuthErrorCodes.INVALID_EMAIL:
          setError("Invalid email address");
          break;
        case AuthErrorCodes.INVALID_PASSWORD:
          setError("Incorrect password");
          break;
        default:
          console.log(error);
          setError("An error occurred during login");
        }
      }
    }
  };

  return (
    <div className='place-content-center grid bg-background w-full h-screen'>
      <Card className="mx-auto max-w-sm font-body">
        <CardHeader className="space-y-1">
          <CardTitle className="font-bold text-2xl">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                id="email"
                type="email" 
                placeholder="m@example.com" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required 
              />
            </div>
            <div className={error !== '' ? 'display' : 'hidden'} >
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            </div>
            <Button type="submit" className="w-full">
            Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}